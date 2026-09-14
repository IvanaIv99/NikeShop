<?php

declare(strict_types=1);

namespace Tests\Feature\Product;

use App\Models\Category;
use App\Models\Color;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Size;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class ProductListTest extends TestCase
{
    use RefreshDatabase;

    public function test_products_are_paginated(): void
    {
        $this->makeProducts(3);

        $body = $this->getJson('/api/products?perPage=2&page=1')->assertSuccessful()->json('data');

        $this->assertCount(2, $body['data']);
        $this->assertSame(3, $body['meta']['total']);
        $this->assertSame(2, $body['meta']['lastPage']);
    }

    public function test_products_can_be_searched_by_name(): void
    {
        Product::create(['name' => 'Air Zoom Pegasus', 'description' => 'road', 'price' => 100, 'image' => 'a.jpg']);
        Product::create(['name' => 'Metcon Trainer', 'description' => 'gym', 'price' => 120, 'image' => 'b.jpg']);

        $body = $this->getJson('/api/products?search=pegasus')->assertSuccessful()->json('data');

        $this->assertSame(1, $body['meta']['total']);
        $this->assertSame('Air Zoom Pegasus', $body['data'][0]['name']);
    }

    public function test_products_can_be_filtered_by_category(): void
    {
        $running = Category::create(['name' => 'Running']);
        $skate = Category::create(['name' => 'Skate']);

        $pegasus = Product::create(['name' => 'Pegasus', 'description' => 'road', 'price' => 100, 'image' => 'a.jpg']);
        $dunk = Product::create(['name' => 'Dunk', 'description' => 'street', 'price' => 120, 'image' => 'b.jpg']);
        $pegasus->categories()->attach($running);
        $dunk->categories()->attach($skate);

        $body = $this->getJson("/api/products?category={$running->id}")->assertSuccessful()->json('data');

        $this->assertSame(1, $body['meta']['total']);
        $this->assertSame('Pegasus', $body['data'][0]['name']);
    }

    public function test_products_can_be_filtered_by_stock(): void
    {
        $size = Size::create(['size' => 42]);
        $color = Color::create(['name' => 'Black', 'code' => '#000']);

        $inStock = Product::create(['name' => 'Available', 'description' => 'x', 'price' => 100, 'image' => 'a.jpg']);
        $outOfStock = Product::create(['name' => 'Sold out', 'description' => 'x', 'price' => 100, 'image' => 'b.jpg']);

        ProductVariant::create(['product_id' => $inStock->id, 'size_id' => $size->id, 'color_id' => $color->id, 'stock' => 5]);
        ProductVariant::create(['product_id' => $outOfStock->id, 'size_id' => $size->id, 'color_id' => $color->id, 'stock' => 0]);

        $in = $this->getJson('/api/products?stock=in')->assertSuccessful()->json('data');
        $this->assertSame(1, $in['meta']['total']);
        $this->assertSame('Available', $in['data'][0]['name']);

        $out = $this->getJson('/api/products?stock=out')->assertSuccessful()->json('data');
        $this->assertSame(1, $out['meta']['total']);
        $this->assertSame('Sold out', $out['data'][0]['name']);
    }

    public function test_products_can_be_sorted_by_price(): void
    {
        Product::create(['name' => 'Cheap', 'description' => 'x', 'price' => 80, 'image' => 'a.jpg']);
        Product::create(['name' => 'Pricey', 'description' => 'x', 'price' => 250, 'image' => 'b.jpg']);
        Product::create(['name' => 'Mid', 'description' => 'x', 'price' => 150, 'image' => 'c.jpg']);

        $asc = $this->getJson('/api/products?sort=price_asc')->assertSuccessful()->json('data.data');
        $this->assertSame(['Cheap', 'Mid', 'Pricey'], array_column($asc, 'name'));

        $desc = $this->getJson('/api/products?sort=price_desc')->assertSuccessful()->json('data.data');
        $this->assertSame(['Pricey', 'Mid', 'Cheap'], array_column($desc, 'name'));
    }

    private function makeProducts(int $count): void
    {
        foreach (range(1, $count) as $i) {
            Product::create([
                'name'        => "Product {$i}",
                'description' => 'A test product',
                'price'       => 100 + $i,
                'image'       => "p{$i}.jpg",
            ]);
        }
    }
}
