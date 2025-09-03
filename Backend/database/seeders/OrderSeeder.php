<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
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

        OrderItem::query()->insert([
            [
                'order_id' => 1,
                'product_id' => 1,
                'size_id' => 2,
                'color_id' => 1,
                'quantity' => 2,
                'total' => 1998.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 1,
                'product_id' => 2,
                'size_id' => 1,
                'color_id' => 3,
                'quantity' => 1,
                'total' => 1250.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 2,
                'product_id' => 3,
                'size_id' => 2,
                'color_id' => 2,
                'quantity' => 1,
                'total' => 999.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 3,
                'product_id' => 4,
                'size_id' => 1,
                'color_id' => 4,
                'quantity' => 3,
                'total' => 1680.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 3,
                'product_id' => 5,
                'size_id' => 1,
                'color_id' => 3,
                'quantity' => 2,
                'total' => 2000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 4,
                'product_id' => 5,
                'size_id' => 1,
                'color_id' => 3,
                'quantity' => 2,
                'total' => 2000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 5,
                'product_id' => 1,
                'size_id' => 1,
                'color_id' => 2,
                'quantity' => 2,
                'total' => 2000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
