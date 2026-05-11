<?php

use App\Domains\Order\Controllers\OrderController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/', [OrderController::class, 'get']);
    Route::get('/today-stats', [OrderController::class, 'getTodayStats']);
    Route::get('/{order}', [OrderController::class, 'getOne']);
    Route::patch('/{order}/status', [OrderController::class, 'changeStatus']);
});
Route::post('/create', [OrderController::class, 'create']);
