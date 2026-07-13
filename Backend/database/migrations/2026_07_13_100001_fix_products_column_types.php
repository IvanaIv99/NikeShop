<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Store price as an exact decimal (was float — imprecise for money) and
     * widen description to text (validation allows up to 2000 chars but the
     * column was VARCHAR(255), silently truncating long descriptions).
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table): void {
            $table->decimal('price', 10, 2)->change();
            $table->text('description')->change();
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table): void {
            $table->float('price')->change();
            $table->string('description')->change();
        });
    }
};
