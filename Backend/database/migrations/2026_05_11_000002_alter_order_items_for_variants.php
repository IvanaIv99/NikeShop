<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            $table->dropForeign(['product_id']);
            $table->dropForeign(['size_id']);
            $table->dropForeign(['color_id']);
            $table->dropColumn(['product_id', 'size_id', 'color_id']);
        });

        Schema::table('order_items', function (Blueprint $table) {
            $table->foreignId('variant_id')
                ->after('order_id')
                ->constrained('product_variants')
                ->restrictOnDelete();
            $table->string('product_name')->after('variant_id');
            $table->string('product_image')->after('product_name');
            $table->string('size_value')->after('product_image');
            $table->string('color_name')->after('size_value');
            $table->decimal('unit_price', 10, 2)->after('color_name');
        });
    }

    public function down(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            $table->dropForeign(['variant_id']);
            $table->dropColumn([
                'variant_id',
                'product_name',
                'product_image',
                'size_value',
                'color_name',
                'unit_price',
            ]);
        });

        Schema::table('order_items', function (Blueprint $table) {
            $table->foreignId('product_id')->after('order_id')->constrained('products')->cascadeOnDelete();
            $table->foreignId('size_id')->after('product_id')->constrained('sizes')->cascadeOnDelete();
            $table->foreignId('color_id')->after('size_id')->constrained('colors')->cascadeOnDelete();
        });
    }
};
