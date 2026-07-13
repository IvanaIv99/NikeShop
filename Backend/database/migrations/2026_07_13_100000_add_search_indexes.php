<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Indexes backing the server-side order/product search, filter and sort
     * endpoints (status/date filters, email search, created_at ordering,
     * product name search).
     */
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
