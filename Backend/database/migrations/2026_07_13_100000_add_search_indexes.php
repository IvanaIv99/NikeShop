<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table): void {
            $table->index('status');
            $table->index('email');
            $table->index('created_at');
        });

        Schema::table('products', function (Blueprint $table): void {
            $table->index('name');
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table): void {
            $table->dropIndex(['status']);
            $table->dropIndex(['email']);
            $table->dropIndex(['created_at']);
        });

        Schema::table('products', function (Blueprint $table): void {
            $table->dropIndex(['name']);
        });
    }
};
