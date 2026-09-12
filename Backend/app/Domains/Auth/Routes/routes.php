<?php

use App\Domains\Auth\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:auth')->name('login');
Route::middleware('auth:sanctum')->group(function (): void {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});
