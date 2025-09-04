<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::prefix('api')->group(function () {
    // Product
    Route::prefix('products')->group(function () {
        Route::get('/', [ProductController::class, 'get']);
        Route::get('/sizes', [ProductController::class, 'getSizes']);
        Route::get('/categories', [ProductController::class, 'getCategories']);
        Route::get('/colors', [ProductController::class, 'getColors']);
        Route::middleware('auth:sanctum')->group(function (){
            Route::post('/', [ProductController::class, 'create']);
            Route::get('/stats', [ProductController::class, 'getStats']);
            Route::post('/{product}', [ProductController::class, 'edit']);
            Route::delete('/{product}', [ProductController::class, 'delete']);
        });
        Route::get('/file/{filename}', [ProductController::class, 'getFileFromStorage']);

    });

    // Orders
    Route::prefix('orders')->group(function () {
        Route::middleware('auth:sanctum')->group(function (){
            Route::get('/', [OrdersController::class, 'get']);
            Route::get('/today-stats', [OrdersController::class, 'getTodayStats']);
            Route::get('/{order}', [OrdersController::class, 'getOne']);
            Route::patch('/{order}/status', [OrdersController::class, 'changeStatus']);
        });
        Route::post('/create', [OrdersController::class, 'create']);
    });

    // Auth
    Route::post('/auth/login', [AuthController::class, 'login'])->name('login');
    Route::middleware('auth:sanctum')->group(function (){
        Route::post('/auth/logout', [AuthController::class, 'logout'])->name('logout');
    });
});
