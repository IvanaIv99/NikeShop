<?php

namespace Database\Seeders;

use App\Models\Categories;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Categories::query()->insert([
            [
                'name' => 'Woman'
            ],
            [
                'name' => 'Man'
            ],
            [
                'name' => 'Kids'
            ]
        ]);
    }
}
