<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->foreignId('size_id')->constrained('sizes')->restrictOnDelete();
            $table->foreignId('color_id')->constrained('colors')->restrictOnDelete();
            $table->unsignedInteger('stock')->default(0);
            $table->string('sku')->nullable();
            $table->timestamps();

            $table->unique(['product_id', 'size_id', 'color_id']);
        });

        Schema::dropIfExists('products_sizes');
        Schema::dropIfExists('products_colors');
    }

    public function down(): void
    {
        Schema::create('products_sizes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->foreignId('size_id')->constrained('sizes')->cascadeOnDelete();
            $table->timestamps();
        });

        Schema::create('products_colors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->foreignId('color_id')->constrained('colors')->cascadeOnDelete();
            $table->timestamps();
        });

        Schema::dropIfExists('product_variants');
    }
};
