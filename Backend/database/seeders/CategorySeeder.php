<?php

namespace Database\Seeders;

use App\Models\Categories;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Categories::query()->insert([
            [
                'name' => 'Woman',
            ],
            [
                'name' => 'Man',
            ],
            [
                'name' => 'Kids',
            ]
        ]);
    }
}
