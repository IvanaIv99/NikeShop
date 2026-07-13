<?php

declare(strict_types=1);

namespace Tests\Feature\Order;

use App\Domains\Order\Enums\OrderStatus;
use App\Models\Admin;
use App\Models\Order;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

final class OrderStatusTransitionTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Notification::fake();
        $this->actingAs($this->makeAdmin(), 'sanctum');
    }

    public function test_valid_transition_is_allowed(): void
    {
        $order = $this->makeOrder(OrderStatus::Received);

        $this->patchJson("/api/orders/{$order->id}/status", ['status' => 'shipped'])
            ->assertSuccessful();

        $this->assertSame(OrderStatus::Shipped, $order->refresh()->status);
    }

    public function test_invalid_transition_is_rejected(): void
    {
        $order = $this->makeOrder(OrderStatus::Refunded);

        $this->patchJson("/api/orders/{$order->id}/status", ['status' => 'shipped'])
            ->assertStatus(422);

        $this->assertSame(OrderStatus::Refunded, $order->refresh()->status);
    }

    private function makeOrder(OrderStatus $status): Order
    {
        $order = new Order();
        $order->forceFill([
            'first_name'     => 'Test',
            'last_name'      => 'Buyer',
            'email'          => 'buyer@example.com',
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
