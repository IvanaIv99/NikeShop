<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        DB::table('products_categories')->truncate();
        DB::table('product_variants')->truncate();
        DB::table('products')->truncate();
        DB::table('categories')->truncate();
        DB::table('colors')->truncate();
        DB::table('sizes')->truncate();
        DB::table('admins')->truncate();
        DB::table('order_items')->truncate();
        DB::table('orders')->truncate();

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $this->call([
            ProductSeeder::class,
            CategorySeeder::class,
            ColorSeeder::class,
            SizeSeeder::class,
            ProductCategorySeeder::class,
            ProductVariantSeeder::class,
            AdminSeeder::class,
            OrderSeeder::class,
        ]);
    }
}
