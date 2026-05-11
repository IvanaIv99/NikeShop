<?php

declare(strict_types=1);

namespace App\Domains\Order\Services;

use App\Domains\Order\Dto\CreateOrderDto;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;

final readonly class OrderService
{
    public function create(CreateOrderDto $dto): Order
    {
        return DB::transaction(function () use ($dto): Order {
            $orderItems = [];

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
            $order->status = 'received'; //to Enum
            $order->created_at = now();
            $order->updated_at = now();
            $order->save();

            foreach ($dto->orderItems as $item) {
                $orderItems[] = [
                    'order_id' => $order->id,
                    'product_id' => $item->orderId,
                    'size_id' => $item->sizeId,
                    'color_id' => $item->colorId,
                    'quantity' => $item->quantity,
                    'total' => $item->total
                ];
            }

            OrderItem::query()->insert($orderItems);

            return $order->load('orderItems.product');
        });
    }
}
