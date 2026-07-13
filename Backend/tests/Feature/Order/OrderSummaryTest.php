<?php

declare(strict_types=1);

namespace Tests\Feature\Order;

use App\Models\Color;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Size;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class OrderSummaryTest extends TestCase
{
    use RefreshDatabase;

    public function test_summary_is_computed_from_db_prices_and_ignores_client_amounts(): void
    {
        config(['shop.shipping_fee' => 10]);

        $variant = $this->makeVariant(price: 100.0, stock: 10);

        $data = $this->postJson('/api/orders/summary', [
            'orderItems' => [
                // Client cannot influence the price — only variantId + quantity are read.
                ['variantId' => $variant->id, 'quantity' => 2, 'total' => 0.01],
            ],
        ])->assertSuccessful()->json('data');

        // 100 * 2 = 200 items + 10 shipping = 210, no tax line.
        $this->assertEquals(200, $data['subtotal']);
        $this->assertEquals(10, $data['shipping']);
        $this->assertEquals(210, $data['grandTotal']);
        $this->assertArrayNotHasKey('tax', $data);
    }

    public function test_summary_sums_multiple_items_and_adds_shipping_once(): void
    {
        config(['shop.shipping_fee' => 15]);

        $cheap  = $this->makeVariant(price: 50.0, stock: 10);
        $pricey = $this->makeVariant(price: 120.0, stock: 10);

        $data = $this->postJson('/api/orders/summary', [
            'orderItems' => [
                ['variantId' => $cheap->id, 'quantity' => 3],   // 150
                ['variantId' => $pricey->id, 'quantity' => 1],  // 120
            ],
        ])->assertSuccessful()->json('data');

        $this->assertEquals(270, $data['subtotal']);
        $this->assertEquals(285, $data['grandTotal']);
    }

    public function test_summary_requires_at_least_one_item(): void
    {
        $this->postJson('/api/orders/summary', ['orderItems' => []])
            ->assertStatus(422);
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
