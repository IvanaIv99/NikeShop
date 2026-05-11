<?php

use App\Domains\Product\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ProductController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/stats', [ProductController::class, 'stats']);
    Route::post('/', [ProductController::class, 'store']);
});

Route::get('/{product}', [ProductController::class, 'show'])
    ->whereNumber('product');

Route::middleware('auth:sanctum')->group(function () {
    Route::put('/{product}', [ProductController::class, 'update'])
        ->whereNumber('product');
    Route::delete('/{product}', [ProductController::class, 'destroy'])
        ->whereNumber('product');
});
