<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        DB::table('product_categories')->truncate();
        DB::table('product_sizes')->truncate();
        DB::table('product_colors')->truncate();
        DB::table('products')->truncate();
        DB::table('categories')->truncate();
        DB::table('colors')->truncate();
        DB::table('sizes')->truncate();
        DB::table('admins')->truncate();

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $this->call([
            ProductSeeder::class,
            CategorySeeder::class,
            ColorSeeder::class,
            SizeSeeder::class,
            ProductCategorySeeder::class,
            ProductSizeSeeder::class,
            ProductColorSeeder::class,
            AdminSeeder::class
        ]);
    }
}
