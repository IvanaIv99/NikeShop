<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::table('order_items', function (Blueprint $table): void {
            $table->index('created_at');
        });

        Schema::table('product_variants', function (Blueprint $table): void {
            $table->index('stock');
        });

        Schema::table('products_categories', function (Blueprint $table): void {
            $table->index(['product_id', 'category_id']);
        });
    }

    public function down(): void
    {
        Schema::table('order_items', function (Blueprint $table): void {
            $table->dropIndex(['created_at']);
        });

        Schema::table('product_variants', function (Blueprint $table): void {
            $table->dropIndex(['stock']);
        });

        Schema::table('products_categories', function (Blueprint $table): void {
            $table->dropIndex(['product_id', 'category_id']);
        });
    }
};
