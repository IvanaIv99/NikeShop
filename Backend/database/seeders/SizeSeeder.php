<?php

namespace Database\Seeders;

use App\Models\Sizes;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SizeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Sizes::query()->insert([
            [
                'size' => 32
            ],
            [
                'size' => 33
            ],
            [
                'size' => 34
            ],
            [
                'size' => 35
            ],
            [
                'size' => 36
            ],
            [
                'size' => 37
            ],
            [
                'size' => 38
            ],
            [
                'size' => 39
            ],
            [
                'size' => 40
            ],
            [
                'size' => 41
            ],
        ]);
    }
}
