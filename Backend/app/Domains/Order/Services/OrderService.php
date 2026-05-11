<?php

declare(strict_types=1);

namespace App\Domains\Order\Services;

use App\Domains\Order\Dto\CreateOrderDto;
use App\Domains\Order\Dto\SingleOrderItemDto;
use App\Exceptions\ApiException;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductVariant;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

final readonly class OrderService
{
    public function create(CreateOrderDto $dto): Order
    {
        return DB::transaction(function () use ($dto): Order {
            $order = new Order();
            $order->first_name = $dto->firstName;
            $order->last_name = $dto->lastName;
            $order->email = $dto->email;
            $order->phone = $dto->phone;
            $order->country = $dto->country;
            $order->city = $dto->city;
            $order->address = $dto->address;
            $order->additional = $dto->additional;
            $order->payment_method = $dto->paymentMethod;
            $order->subtotal = $dto->subtotal;
            $order->status = 'received';
            $order->created_at = now();
            $order->updated_at = now();
            $order->save();

            $orderItems = [];

            foreach ($dto->orderItems as $item) {
                $variant = $this->reserveStock($item);

                $orderItems[] = [
                    'order_id' => $order->id,
                    'variant_id' => $variant->id,
                    'product_name' => $variant->product->name,
                    'product_image' => $variant->product->getRawOriginal('image'),
                    'size_value' => (string) $variant->size->size,
                    'color_name' => $variant->color->name,
                    'unit_price' => $variant->product->price,
                    'quantity' => $item->quantity,
                    'total' => $item->total,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            OrderItem::query()->insert($orderItems);

            return $order->load('orderItems.variant.product', 'orderItems.variant.size', 'orderItems.variant.color');
        });
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
