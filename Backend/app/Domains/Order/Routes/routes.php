<?php

use App\Domains\Order\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::post('/create', [OrderController::class, 'store']);
Route::get('/shipping-fee', [OrderController::class, 'shippingFee']);
Route::post('/summary', [OrderController::class, 'summary']);
Route::get('/enums', [OrderController::class, 'enums']);

Route::middleware('auth:sanctum')->group(function (): void {
    Route::get('/', [OrderController::class, 'index']);
    Route::get('/today-stats', [OrderController::class, 'todayStats']);
    Route::get('/chart', [OrderController::class, 'chart']);

    Route::get('/{order}', [OrderController::class, 'show'])->whereNumber('order');
    Route::get('/{order}/pdf', [OrderController::class, 'downloadPdf'])->whereNumber('order');
    Route::patch('/{order}/status', [OrderController::class, 'changeStatus'])->whereNumber('order');
});
