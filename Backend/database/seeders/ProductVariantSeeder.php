<?php

namespace Database\Seeders;

use App\Models\ProductVariant;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class ProductVariantSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        $matrix = [
            1 => ['sizes' => [6, 7, 8, 9, 10], 'colors' => [1, 2, 3, 4]],
            2 => ['sizes' => [6, 7, 8, 9, 10], 'colors' => [2, 3, 7]],
            3 => ['sizes' => [6, 7, 8, 9, 10], 'colors' => [1, 5, 7]],
            4 => ['sizes' => [1, 2, 3, 4, 5], 'colors' => [4, 6]],
            5 => ['sizes' => [6, 7, 8, 9, 10], 'colors' => [1, 4]],
            6 => ['sizes' => [6, 7, 8, 9, 10], 'colors' => [1, 2]],
        ];

        $rows = [];

        foreach ($matrix as $productId => $axes) {
            foreach ($axes['sizes'] as $sizeId) {
                foreach ($axes['colors'] as $colorId) {
                    $rows[] = [
                        'product_id' => $productId,
                        'size_id' => $sizeId,
                        'color_id' => $colorId,
                        'stock' => 10,
                        'sku' => sprintf('P%d-S%d-C%d', $productId, $sizeId, $colorId),
                        'created_at' => $now,
                        'updated_at' => $now,
                    ];
                }
            }
        }

        ProductVariant::query()->insert($rows);
    }
}
