<?php

use App\Domains\Notification\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function (): void {
    Route::get('/', [NotificationController::class, 'index']);
    Route::post('/read-all', [NotificationController::class, 'readAll']);
    Route::delete('/', [NotificationController::class, 'destroyAll']);
    Route::post('/{id}/read', [NotificationController::class, 'read']);
    Route::delete('/{id}', [NotificationController::class, 'destroy']);
});
