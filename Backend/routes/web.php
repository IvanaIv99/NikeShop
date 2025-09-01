<?php

use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\PaymentMethodController;
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

    // staviti sta trrba po auth token

    // Product
    Route::prefix('products')->group(function () {
        Route::get('/', [ProductController::class, 'get']);
        Route::get('/sizes', [ProductController::class, 'getSizes']);
        Route::get('/categories', [ProductController::class, 'getCategories']);
        Route::get('/colors', [ProductController::class, 'getColors']);
        Route::post('/create', [ProductController::class, 'create']);
        Route::get('/stats', [ProductController::class, 'getStats']);
        Route::post('/edit/{product}', [ProductController::class, 'edit']);
        Route::delete('/delete/{product}', [ProductController::class, 'delete']);

    });

    // Orders
    Route::prefix('orders')->group(function () {
        Route::get('/', [OrdersController::class, 'get']);
        Route::post('/create', [OrdersController::class, 'create']);
        Route::get('/today-stats', [OrdersController::class, 'getTodayStats']);
        Route::get('/{order}', [OrdersController::class, 'getOne']);
        Route::post('/{order}/status', [OrdersController::class, 'changeStatus']);
    });

    // Payment Methods
    Route::prefix('paymentMethods')->group(function () {
        Route::get('/', [PaymentMethodController::class, 'get']);
    });

    // Analytics
    Route::prefix('analytics')->group(function () {
        Route::get('/', [AnalyticsController::class, 'get']);
    });


    // Auth
    Route::post('/auth/login', [AuthController::class, 'login'])->name('login');
    Route::middleware('auth:sanctum')->group(function (){
        Route::post('/auth/logout', [AuthController::class, 'logout'])->name('logout');
    });
});
