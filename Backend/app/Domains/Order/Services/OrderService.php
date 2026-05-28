<?php

declare(strict_types=1);

namespace App\Domains\Order\Services;

use App\Domains\Order\Dto\ChangeOrderStatusDto;
use App\Domains\Order\Dto\CreateOrderDto;
use App\Domains\Order\Dto\SingleOrderItemDto;
use App\Domains\Order\Enums\OrderStatus;
use App\Exceptions\ApiException;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductVariant;
use Barryvdh\DomPDF\Facade\Pdf as PDFFacade;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

final readonly class OrderService
{
    public function list(): Collection
    {
        return Order::query()
            ->with('orderItems')
            ->orderByDesc('created_at')
            ->get();
    }

    public function find(Order $order): Order
    {
        return $order->load('orderItems');
    }

    public function create(CreateOrderDto $dto): Order
    {
        return DB::transaction(function () use ($dto): Order {
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
            $order->subtotal        = $dto->subtotal;
            $order->status          = OrderStatus::Received;
            $order->save();

            $now = now();
            $rows = [];

            foreach ($dto->orderItems as $item) {
                $variant = $this->reserveStock($item);

                $rows[] = [
                    'order_id'      => $order->id,
                    'variant_id'    => $variant->id,
                    'product_name'  => $variant->product->name,
                    'product_image' => $variant->product->getRawOriginal('image'),
                    'size_value'    => (string) $variant->size->size,
                    'color_name'    => $variant->color->name,
                    'unit_price'    => $variant->product->price,
                    'quantity'      => $item->quantity,
                    'total'         => $item->total,
                    'created_at'    => $now,
                    'updated_at'    => $now,
                ];
            }

            OrderItem::query()->insert($rows);

            return $order->load('orderItems.variant.product', 'orderItems.variant.size', 'orderItems.variant.color');
        });
    }

    public function changeStatus(Order $order, ChangeOrderStatusDto $dto): Order
    {
        $order->status = $dto->status;
        $order->save();

        return $order->fresh(['orderItems']);
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

    public function slipResponse(Order $order): Response
    {
        $order->load('orderItems.variant.product', 'orderItems.variant.size', 'orderItems.variant.color',);

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

        $variant->decrement('stock', $item->quantity);

        return $variant;
    }
}
