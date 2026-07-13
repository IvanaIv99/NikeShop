<?php

declare(strict_types=1);

namespace Tests\Feature\Order;

use App\Domains\Order\Enums\OrderStatus;
use App\Models\Admin;
use App\Models\Order;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class OrderListTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->actingAs($this->makeAdmin(), 'sanctum');
    }

    public function test_orders_can_be_filtered_by_status(): void
    {
        $this->makeOrder(OrderStatus::Received, 'ann@example.com');
        $this->makeOrder(OrderStatus::Received, 'bob@example.com');
        $this->makeOrder(OrderStatus::Shipped, 'cat@example.com');

        $body = $this->getJson('/api/orders?status=shipped')->assertSuccessful()->json('data');

        $this->assertSame(1, $body['meta']['total']);
        $this->assertCount(1, $body['data']);
    }

    public function test_orders_can_be_searched_by_email(): void
    {
        $this->makeOrder(OrderStatus::Received, 'findme@example.com');
        $this->makeOrder(OrderStatus::Received, 'other@example.com');

        $body = $this->getJson('/api/orders?search=findme')->assertSuccessful()->json('data');

        $this->assertSame(1, $body['meta']['total']);
        $this->assertSame('findme@example.com', $body['data'][0]['email']);
    }

    public function test_orders_are_paginated(): void
    {
        foreach (range(1, 5) as $i) {
            $this->makeOrder(OrderStatus::Received, "buyer{$i}@example.com");
        }

        $body = $this->getJson('/api/orders?perPage=2&page=1')->assertSuccessful()->json('data');

        $this->assertCount(2, $body['data']);
        $this->assertSame(5, $body['meta']['total']);
        $this->assertSame(2, $body['meta']['perPage']);
        $this->assertSame(3, $body['meta']['lastPage']);
    }

    private function makeOrder(OrderStatus $status, string $email): Order
    {
        $order = new Order();
        $order->forceFill([
            'first_name'     => 'Test',
            'last_name'      => 'Buyer',
            'email'          => $email,
            'phone'          => '123',
            'country'        => 'Serbia',
            'city'           => 'Belgrade',
            'address'        => 'Somewhere 1',
            'payment_method' => 'cash_on_delivery',
            'subtotal'       => 100,
            'status'         => $status->value,
        ]);
        $order->save();

        return $order;
    }

    private function makeAdmin(): Admin
    {
        $admin = new Admin();
        $admin->forceFill([
            'first_name'     => 'Admin',
            'last_name'      => 'User',
            'email'          => 'admin@example.com',
            'password'       => bcrypt('secret'),
            'remember_token' => 'token',
        ]);
        $admin->save();

        return $admin;
    }
}
