<?php

namespace Database\Seeders;

use App\Models\Products;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Products::query()->insert(
            [
                [
                    'name' => 'SNike X OFF-white',
                    'description' => 'The 10: Air Jordan 1 off-white - Chicago',
                    'price' => 999,
                    'image' => 'IMG_999.png'
                ],
                [
                    'name' => 'Nike Dunk Low 1',
                    'description' => 'Nike Dunk Low 1',
                    'price' => 1250,
                    'image' => 'IMG_4767.png'
                ],
                [
                    'name' => 'SNike X OFF-white Dunk Low',
                    'description' => 'The top 10: Dunk 1 off-white - Chicago',
                    'price' => 999,
                    'image' => 'IMG_4770.png'
                ],
                [
                    'name' => 'Nike X OFF-white AF1',
                    'description' => "Air Force 1 Retro High 'Off-White - UNC' sneakers",
                    'price' => 560,
                    'image' => 'IMG_123.png'
                ],
                [
                    'name' => 'Air Jordan Low 1',
                    'description' => 'The top 10: Air Jordan 1 off-white - Chicago',
                    'price' => 800,
                    'image' => "transparent.png"
                ],
                [
                    'name' => 'Nike X Nicki J AF1',
                    'description' => "Air force 1 Retro COLORS 'Off-White - UNC' sneakers",
                    'price' => 1050,
                    'image' => "IMG_456.png"
                ],
            ]
        );
    }
}
