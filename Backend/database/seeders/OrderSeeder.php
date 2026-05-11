<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        Order::query()->insert([
            [
                'first_name' => 'Ivana',
                'last_name' => 'Ivanovic',
                'email' => 'ivana@example.com',
                'phone' => '+381601234567',
                'country' => 'Serbia',
                'city' => 'Belgrade',
                'address' => 'Bulevar Kralja Aleksandra 1',
                'additional' => 'Leave at the door',
                'payment_method' => 'cash_on_delivery',
                'subtotal' => 2000.50,
                'status' => 'shipped',
                'created_at' => now()->subDays(2),
                'updated_at' => now()->subDays(2),
            ],
            [
                'first_name' => 'Marko',
                'last_name' => 'Markovic',
                'email' => 'marko@example.com',
                'phone' => '+381601112233',
                'country' => 'Serbia',
                'city' => 'Novi Sad',
                'address' => 'Zmaj Jovina 5',
                'additional' => null,
                'payment_method' => 'cash_on_delivery',
                'subtotal' => 3000.00,
                'status' => 'done',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'first_name' => 'Ana',
                'last_name' => 'Petrovic',
                'email' => 'ana@example.com',
                'phone' => '+381601998877',
                'country' => 'Serbia',
                'city' => 'Niš',
                'address' => 'Obilićev venac 12',
                'additional' => 'Call before delivery',
                'payment_method' => 'cash_on_delivery',
                'subtotal' => 4000.75,
                'status' => 'received',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'first_name' => 'Mira',
                'last_name' => 'Petrovic',
                'email' => 'ana@example.com',
                'phone' => '+381601998877',
                'country' => 'Serbia',
                'city' => 'Niš',
                'address' => 'Obilićev venac 12',
                'additional' => 'Call before delivery',
                'payment_method' => 'cash_on_delivery',
                'subtotal' => 1560.75,
                'status' => 'received',
                'created_at' => now()->subDays(),
                'updated_at' => now()->subDays(),
            ],
            [
                'first_name' => 'Pera',
                'last_name' => 'Peric',
                'email' => 'pera@example.com',
                'phone' => '+381601998877',
                'country' => 'Serbia',
                'city' => 'Niš',
                'address' => 'Obilićev venac 12',
                'additional' => 'Call before delivery',
                'payment_method' => 'cash_on_delivery',
                'subtotal' => 1560.75,
                'status' => 'received',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        $rows = [
            ['order_id' => 1, 'product_id' => 1, 'quantity' => 2],
            ['order_id' => 1, 'product_id' => 2, 'quantity' => 1],
            ['order_id' => 2, 'product_id' => 3, 'quantity' => 1],
            ['order_id' => 3, 'product_id' => 4, 'quantity' => 3],
            ['order_id' => 3, 'product_id' => 5, 'quantity' => 2],
            ['order_id' => 4, 'product_id' => 5, 'quantity' => 2],
            ['order_id' => 5, 'product_id' => 1, 'quantity' => 2],
        ];

        $orderItems = [];

        foreach ($rows as $row) {
            $variant = ProductVariant::query()
                ->where('product_id', $row['product_id'])
                ->with(['product', 'size', 'color'])
                ->first();

            if ($variant === null) {
                continue;
            }

            $product = $variant->product;
            $unitPrice = $product->price;

            $orderItems[] = [
                'order_id' => $row['order_id'],
                'variant_id' => $variant->id,
                'product_name' => $product->name,
                'product_image' => $product->getRawOriginal('image'),
                'size_value' => (string) $variant->size->size,
                'color_name' => $variant->color->name,
                'unit_price' => $unitPrice,
                'quantity' => $row['quantity'],
                'total' => $unitPrice * $row['quantity'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        OrderItem::query()->insert($orderItems);
    }
}
