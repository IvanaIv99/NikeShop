<?php

declare(strict_types=1);

namespace App\Domains\Order\Services;

use App\Domains\Order\Dto\ChangeOrderStatusDto;
use App\Domains\Order\Dto\CreateOrderDto;
use App\Domains\Order\Dto\ListOrdersDto;
use App\Domains\Order\Dto\SingleOrderItemDto;
use App\Domains\Order\Dto\SummarizeOrderDto;
use App\Domains\Order\Enums\OrderStatus;
use App\Domains\Order\Enums\PaymentMethod;
use App\Domains\Order\Notifications\NewOrderReceived;
use App\Domains\Order\Notifications\OrderStatusChanged;
use App\Domains\Product\Notifications\LowStockAlert;
use App\Exceptions\ApiException;
use App\Models\Admin;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductVariant;
use Barryvdh\DomPDF\Facade\Pdf as PDFFacade;
use Carbon\CarbonImmutable;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Spatie\LaravelData\DataCollection;
use Illuminate\Support\Facades\Notification;
use Symfony\Component\HttpFoundation\Response;

final readonly class OrderService
{
    public function list(ListOrdersDto $filters): LengthAwarePaginator
    {
        $query = Order::query()
            ->with('orderItems')
            ->orderByDesc('created_at');

        if ($filters->status !== null && $filters->status !== '') {
            $query->where('status', $filters->status);
        }

        if ($filters->search !== null && $filters->search !== '') {
            $term = '%' . $filters->search . '%';
            $query->where(static function ($q) use ($term): void {
                $q->where('first_name', 'like', $term)
                    ->orWhere('last_name', 'like', $term)
                    ->orWhere('email', 'like', $term)
                    ->orWhere('id', 'like', $term);
            });
        }

        if ($filters->dateFrom !== null && $filters->dateFrom !== '') {
            $query->whereDate('created_at', '>=', $filters->dateFrom);
        }

        if ($filters->dateTo !== null && $filters->dateTo !== '') {
            $query->whereDate('created_at', '<=', $filters->dateTo);
        }

        return $query->paginate($filters->perPage, ['*'], 'page', $filters->page);
    }

    public function find(Order $order): Order
    {
        return $order->load('orderItems');
    }

    /**
     * Server-authoritative price preview for a set of cart items. Read-only:
     * prices come from the database, never from the client, and stock is not
     * reserved. Mirrors the money math applied in {@see self::create()}.
     *
     * @return array{subtotal: float, shipping: float, grandTotal: float}
     */
    public function summarize(SummarizeOrderDto $dto): array
    {
        $subtotal    = $this->itemsSubtotal($dto->orderItems);
        $shippingFee = (float) config('shop.shipping_fee');

        return [
            'subtotal'   => round($subtotal, 2),
            'shipping'   => round($shippingFee, 2),
            'grandTotal' => round($subtotal + $shippingFee, 2),
        ];
    }

    /**
     * Sum of (current DB unit price × quantity) across the given items.
     *
     * @param  DataCollection<int, SingleOrderItemDto>  $items
     */
    private function itemsSubtotal(DataCollection $items): float
    {
        $variantIds = collect($items->toCollection())
            ->map(static fn (SingleOrderItemDto $item): int => $item->variantId)
            ->unique()
            ->all();

        $variants = ProductVariant::query()
            ->with('product')
            ->findMany($variantIds)
            ->keyBy('id');

        $subtotal = 0.0;

        foreach ($items as $item) {
            $variant = $variants->get($item->variantId);

            if ($variant === null) {
                throw new ApiException(
                    'Selected variant does not exist.',
                    Response::HTTP_UNPROCESSABLE_ENTITY
                );
            }

            $subtotal += (float) $variant->product->price * $item->quantity;
        }

        return $subtotal;
    }

    public function create(CreateOrderDto $dto): Order
    {
        $shippingFee = (float) config('shop.shipping_fee');

        $order = DB::transaction(function () use ($dto, $shippingFee): Order {
            $order = new Order();
            $order->first_name      = $dto->firstName;
            $order->last_name       = $dto->lastName;
            $order->email           = $dto->email;
            $order->phone           = $dto->phone;
            $order->country         = $dto->country;
            $order->city            = $dto->city;
            $order->address         = $dto->address;
            $order->additional      = $dto->additional;
            $order->payment_method  = $dto->paymentMethod;
            $order->subtotal        = 0;
            $order->status          = OrderStatus::Received;
            $order->save();

            $now = now();
            $rows = [];
            $itemsTotal = 0.0;

            foreach ($dto->orderItems as $item) {
                $variant = $this->reserveStock($item);

                $unitPrice = (float) $variant->product->price;
                $lineTotal = $unitPrice * $item->quantity;
                $itemsTotal += $lineTotal;

                $rows[] = [
                    'order_id'      => $order->id,
                    'variant_id'    => $variant->id,
                    'product_name'  => $variant->product->name,
                    'product_image' => $variant->product->getRawOriginal('image'),
                    'size_value'    => (string) $variant->size->size,
                    'color_name'    => $variant->color->name,
                    'unit_price'    => $unitPrice,
                    'quantity'      => $item->quantity,
                    'total'         => $lineTotal,
                    'created_at'    => $now,
                    'updated_at'    => $now,
                ];
            }

            OrderItem::query()->insert($rows);

            $order->subtotal = $itemsTotal + $shippingFee;
            $order->save();

            return $order->load('orderItems.variant.product', 'orderItems.variant.size', 'orderItems.variant.color');
        });

        Notification::route('mail', $order->email)
            ->notify(new OrderStatusChanged($order));

        Notification::send(Admin::all(), new NewOrderReceived($order));

        return $order;
    }

    /**
     * Single source of truth for order/payment enum values shown in the UI,
     * so adding a status or payment method never requires a frontend redeploy.
     *
     * @return array{
     *     orderStatuses: list<array{value: string, label: string}>,
     *     paymentMethods: list<array{value: string, label: string}>
     * }
     */
    public function enums(): array
    {
        return [
            'orderStatuses' => array_map(
                static fn (OrderStatus $status): array => [
                    'value' => $status->value,
                    'label' => $status->label(),
                ],
                OrderStatus::cases()
            ),
            'paymentMethods' => array_map(
                static fn (PaymentMethod $method): array => [
                    'value' => $method->value,
                    'label' => $method->label(),
                ],
                PaymentMethod::cases()
            ),
        ];
    }

    public function changeStatus(Order $order, ChangeOrderStatusDto $dto): Order
    {
        if ($order->status === $dto->status) {
            return $order->refresh()->load('orderItems');
        }

        $this->assertValidTransition($order->status, $dto->status);

        $order->status = $dto->status;
        $order->save();

        Notification::route('mail', $order->email)
            ->notify(new OrderStatusChanged($order));

        return $order->refresh()->load('orderItems');
    }

    /**
     * Enforces the order lifecycle so invalid jumps (e.g. refunded → shipped)
     * are rejected server-side.
     *
     * @throws ApiException
     */
    private function assertValidTransition(OrderStatus $from, OrderStatus $to): void
    {
        $allowed = match ($from) {
            OrderStatus::Received  => [OrderStatus::Shipped, OrderStatus::Cancelled],
            OrderStatus::Shipped   => [OrderStatus::Done, OrderStatus::Refunded],
            OrderStatus::Done      => [OrderStatus::Refunded],
            OrderStatus::Cancelled => [],
            OrderStatus::Refunded  => [],
        };

        if (! in_array($to, $allowed, true)) {
            throw new ApiException(
                sprintf('Cannot change order status from %s to %s.', $from->value, $to->value),
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }
    }

    public function todayStats(): array
    {
        $base = Order::query()->whereDate('created_at', today());

        return [
            'orders_count' => (clone $base)->count(),
            'revenue'      => (float) (clone $base)->sum('subtotal'),
            'shipped'      => (clone $base)->where('status', OrderStatus::Shipped)->count(),
            'received'     => (clone $base)->where('status', OrderStatus::Received)->count(),
        ];
    }

    /**
     * @return array{ranges: array<string, list<array{label: string, revenue: float, orders: int}>>, activity: array<int, array<string, mixed>>}
     */
    public function chart(): array
    {
        $now = CarbonImmutable::now();

        $hourly  = $this->hourlyBuckets($now);
        $weekly  = $this->weeklyBuckets($now, 12);
        $monthly = $this->monthlyBucketsYtd($now);

        $earliest = min($hourly[0]['start'], $weekly[0]['start'], $monthly[0]['start']);

        $orders = Order::query()
            ->where('created_at', '>=', $earliest)
            ->get(['subtotal', 'created_at']);

        foreach ($orders as $order) {
            $placed  = CarbonImmutable::parse((string) $order->created_at);
            $revenue = (float) $order->subtotal;

            $this->assignToBucket($hourly, $placed, $revenue);
            $this->assignToBucket($weekly, $placed, $revenue);
            $this->assignToBucket($monthly, $placed, $revenue);
        }

        return [
            'ranges' => [
                '24h' => $this->stripBuckets($hourly),
                '12w' => $this->stripBuckets($weekly),
                'ytd' => $this->stripBuckets($monthly),
            ],
            'activity' => $this->recentActivity(6),
        ];
    }

    /**
     * @return list<array{label: string, start: CarbonImmutable, end: CarbonImmutable, revenue: float, orders: int}>
     */
    private function hourlyBuckets(CarbonImmutable $now): array
    {
        $currentHour = $now->startOfHour();
        $buckets = [];

        for ($i = 23; $i >= 0; $i--) {
            $start = $currentHour->subHours($i);
            $hour  = (int) $start->format('G');

            $buckets[] = $this->newBucket(
                $i === 0 ? 'now' : ($hour % 6 === 0 ? sprintf('%02dh', $hour) : ''),
                $start,
                $start->addHour(),
            );
        }

        return $buckets;
    }

    /**
     * @return list<array{label: string, start: CarbonImmutable, end: CarbonImmutable, revenue: float, orders: int}>
     */
    private function weeklyBuckets(CarbonImmutable $now, int $weeks): array
    {
        $startOfThisWeek = $now->startOfWeek();
        $buckets = [];

        for ($i = $weeks - 1; $i >= 0; $i--) {
            $start = $startOfThisWeek->subWeeks($i);

            $buckets[] = $this->newBucket(
                $i === 0 ? 'now' : 'w' . ($weeks - $i),
                $start,
                $start->addWeek(),
            );
        }

        return $buckets;
    }

    /**
     * @return list<array{label: string, start: CarbonImmutable, end: CarbonImmutable, revenue: float, orders: int}>
     */
    private function monthlyBucketsYtd(CarbonImmutable $now): array
    {
        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $currentMonth = (int) $now->format('n');
        $startOfYear = $now->startOfYear();
        $buckets = [];

        for ($m = 1; $m <= $currentMonth; $m++) {
            $start = $startOfYear->addMonths($m - 1);

            $buckets[] = $this->newBucket(
                $m === $currentMonth ? 'now' : $months[$m - 1],
                $start,
                $start->addMonth(),
            );
        }

        return $buckets;
    }

    /**
     * @return array{label: string, start: CarbonImmutable, end: CarbonImmutable, revenue: float, orders: int}
     */
    private function newBucket(string $label, CarbonImmutable $start, CarbonImmutable $end): array
    {
        return [
            'label'   => $label,
            'start'   => $start,
            'end'     => $end,
            'revenue' => 0.0,
            'orders'  => 0,
        ];
    }

    /**
     * @param  list<array{label: string, start: CarbonImmutable, end: CarbonImmutable, revenue: float, orders: int}>  $buckets
     */
    private function assignToBucket(array &$buckets, CarbonImmutable $placed, float $revenue): void
    {
        foreach ($buckets as &$bucket) {
            if ($placed >= $bucket['start'] && $placed < $bucket['end']) {
                $bucket['revenue'] += $revenue;
                $bucket['orders']  += 1;
                break;
            }
        }
    }

    /**
     * @param  list<array{label: string, start: CarbonImmutable, end: CarbonImmutable, revenue: float, orders: int}>  $buckets
     * @return list<array{label: string, revenue: float, orders: int}>
     */
    private function stripBuckets(array $buckets): array
    {
        return array_map(static fn (array $bucket): array => [
            'label'   => $bucket['label'],
            'revenue' => round($bucket['revenue'], 2),
            'orders'  => $bucket['orders'],
        ], $buckets);
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function recentActivity(int $limit): array
    {
        return Order::query()
            ->latest('created_at')
            ->limit($limit)
            ->get(['id', 'first_name', 'last_name', 'email', 'subtotal', 'status', 'created_at'])
            ->map(static fn (Order $order): array => [
                'id'        => $order->id,
                'firstName' => $order->first_name,
                'lastName'  => $order->last_name,
                'email'     => $order->email,
                'subtotal'  => (string) $order->subtotal,
                'status'    => $order->status->value,
                'createdAt' => $order->created_at?->toIso8601String() ?? '',
            ])
            ->values()
            ->all();
    }

    public function slipResponse(Order $order): Response
    {
        $order->load('orderItems.variant.product', 'orderItems.variant.size', 'orderItems.variant.color', );

        $pdf = PDFFacade::loadView('orders.slip', [
            'order'         => $order,
            'paymentMethod' => $order->payment_method ?? 'n/a',
        ])->setPaper('a4');

        $filename = sprintf('order-%d-slip.pdf', $order->id);

        return $pdf->download($filename);
    }

    private function reserveStock(SingleOrderItemDto $item): ProductVariant
    {
        $variant = ProductVariant::query()
            ->where('id', $item->variantId)
            ->lockForUpdate()
            ->with(['product', 'size', 'color'])
            ->first();

        if ($variant === null) {
            throw new ApiException(
                'Selected variant does not exist.',
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        if ($variant->stock < $item->quantity) {
            throw new ApiException(
                sprintf(
                    'Insufficient stock for variant %d: %d available, %d requested.',
                    $variant->id,
                    $variant->stock,
                    $item->quantity
                ),
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        $stockBefore = $variant->stock;
        $variant->decrement('stock', $item->quantity);
        $variant->stock = $stockBefore - $item->quantity;

        $threshold = (int) config('shop.low_stock_threshold');
        if ($stockBefore > $threshold && $variant->stock <= $threshold) {
            Notification::send(Admin::all(), new LowStockAlert($variant, $threshold));
        }

        return $variant;
    }
}
