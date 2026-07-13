<?php

declare(strict_types=1);

namespace Tests\Feature\Order;

use App\Models\Color;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Size;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

final class CreateOrderTotalsTest extends TestCase
{
    use RefreshDatabase;

    public function test_order_totals_are_computed_on_the_backend_and_client_amounts_are_ignored(): void
    {
        Notification::fake();
        config(['shop.shipping_fee' => 10]);

        $variant = $this->makeVariant(price: 100.0, stock: 10);

        $response = $this->postJson('/api/orders/create', [
            'firstName'     => 'John',
            'lastName'      => 'Doe',
            'email'         => 'john@example.com',
            'phone'         => '123456789',
            'country'       => 'Serbia',
            'city'          => 'Belgrade',
            'address'       => 'Main St 1',
            'additional'    => null,
            'paymentMethod' => 'cash_on_delivery',
            // Deliberately bogus client-supplied money — must be ignored:
            'subtotal'      => 0.01,
            'orderItems'    => [
                ['variantId' => $variant->id, 'quantity' => 2, 'total' => 0.01],
            ],
        ]);

        $response->assertSuccessful();

        $order = Order::query()->latest('id')->firstOrFail();

        // 100 * 2 = 200 items + 10 shipping = 210
        $this->assertSame('210.00', (string) $order->subtotal);

        $item = $order->orderItems()->firstOrFail();
        $this->assertSame('100.00', (string) $item->unit_price);
        $this->assertSame('200.00', (string) $item->total);
    }

    public function test_multiple_items_sum_line_totals_and_add_shipping_once(): void
    {
        Notification::fake();
        config(['shop.shipping_fee' => 15]);

        $cheap = $this->makeVariant(price: 50.0, stock: 10);
        $pricey = $this->makeVariant(price: 120.0, stock: 10);

        $response = $this->postJson('/api/orders/create', [
            'firstName'     => 'Jane',
            'lastName'      => 'Doe',
            'email'         => 'jane@example.com',
            'phone'         => '987654321',
            'country'       => 'Serbia',
            'city'          => 'Novi Sad',
            'address'       => 'Second St 2',
            'additional'    => null,
            'paymentMethod' => 'cash_on_delivery',
            'orderItems'    => [
                ['variantId' => $cheap->id, 'quantity' => 3],   // 150
                ['variantId' => $pricey->id, 'quantity' => 1],  // 120
            ],
        ]);

        $response->assertSuccessful();

        $order = Order::query()->latest('id')->firstOrFail();

        // (50*3) + (120*1) = 270 items + 15 shipping = 285
        $this->assertSame('285.00', (string) $order->subtotal);
        $this->assertSame(2, $order->orderItems()->count());
    }

    public function test_shipping_fee_endpoint_returns_configured_fee(): void
    {
        config(['shop.shipping_fee' => 12.5]);

        $this->getJson('/api/orders/shipping-fee')
            ->assertSuccessful()
            ->assertJsonPath('data.shipping_fee', 12.5);
    }

    public function test_unknown_payment_method_is_rejected(): void
    {
        Notification::fake();
        $variant = $this->makeVariant(price: 100.0, stock: 10);

        $this->postJson('/api/orders/create', [
            'firstName'     => 'John',
            'lastName'      => 'Doe',
            'email'         => 'john@example.com',
            'phone'         => '123456789',
            'country'       => 'Serbia',
            'city'          => 'Belgrade',
            'address'       => 'Main St 1',
            'additional'    => null,
            'paymentMethod' => 'bitcoin',
            'orderItems'    => [
                ['variantId' => $variant->id, 'quantity' => 1],
            ],
        ])->assertStatus(422);
    }

    private function makeVariant(float $price, int $stock): ProductVariant
    {
        $size  = Size::create(['size' => '42']);
        $color = Color::create(['name' => 'Red', 'code' => '#ff0000']);

        $product = Product::create([
            'name'        => 'Test Sneaker',
            'description' => 'A test product',
            'price'       => $price,
            'image'       => 'test.jpg',
        ]);

        return ProductVariant::create([
            'product_id' => $product->id,
            'size_id'    => $size->id,
            'color_id'   => $color->id,
            'stock'      => $stock,
            'sku'        => 'TEST-SKU-V',
            'is_active'  => true,
        ]);
    }
}
