<?php

declare(strict_types=1);

namespace Tests\Feature\Product;

use App\Models\Product;
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
