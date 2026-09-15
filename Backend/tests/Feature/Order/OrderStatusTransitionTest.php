<?php

declare(strict_types=1);

namespace Tests\Feature\Order;

use App\Domains\Order\Enums\OrderStatus;
use App\Models\Admin;
use App\Models\Color;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Size;
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

    public function test_allowed_transition_succeeds(): void
    {
        $order = $this->makeOrder(OrderStatus::Received);

        $this->patchJson("/api/orders/{$order->id}/status", ['status' => 'shipped'])
            ->assertSuccessful();

        $this->assertSame(OrderStatus::Shipped, $order->refresh()->status);
    }

    public function test_disallowed_transition_is_rejected(): void
    {
        $order = $this->makeOrder(OrderStatus::Refunded);

        $this->patchJson("/api/orders/{$order->id}/status", ['status' => 'shipped'])
            ->assertStatus(422);

        $this->assertSame(OrderStatus::Refunded, $order->refresh()->status);
    }

    public function test_cancelling_restocks_variant_inventory(): void
    {
        [$order, $variant] = $this->makeOrderWithItem(OrderStatus::Received, quantity: 3, stock: 7);

        $this->patchJson("/api/orders/{$order->id}/status", ['status' => 'cancelled'])
            ->assertSuccessful();

        $this->assertSame(OrderStatus::Cancelled, $order->refresh()->status);
        $this->assertSame(10, $variant->refresh()->stock);
    }

    public function test_refunding_restocks_variant_inventory(): void
    {
        [$order, $variant] = $this->makeOrderWithItem(OrderStatus::Shipped, quantity: 2, stock: 5);

        $this->patchJson("/api/orders/{$order->id}/status", ['status' => 'refunded'])
            ->assertSuccessful();

        $this->assertSame(7, $variant->refresh()->stock);
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

    /**
     * @return array{0: Order, 1: ProductVariant}
     */
    private function makeOrderWithItem(OrderStatus $status, int $quantity, int $stock): array
    {
        $product = Product::create(['name' => 'Sneaker', 'description' => 'x', 'price' => 100, 'image' => 'a.jpg']);
        $size = Size::create(['size' => 42]);
        $color = Color::create(['name' => 'Black', 'code' => '#000']);
        $variant = ProductVariant::create([
            'product_id' => $product->id,
            'size_id'    => $size->id,
            'color_id'   => $color->id,
            'stock'      => $stock,
        ]);

        $order = $this->makeOrder($status);
        OrderItem::create([
            'order_id'      => $order->id,
            'variant_id'    => $variant->id,
            'product_name'  => $product->name,
            'product_image' => 'a.jpg',
            'size_value'    => '42',
            'color_name'    => 'Black',
            'unit_price'    => 100,
            'quantity'      => $quantity,
            'total'         => 100 * $quantity,
        ]);

        return [$order, $variant];
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
