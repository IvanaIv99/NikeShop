<?php

use App\Http\Controllers\AuthController;
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

    //Product
    Route::prefix('products')->group(function () {
        Route::get('/', [ProductController::class, 'get']);
        Route::get('/sizes', [ProductController::class, 'getSizes']);
        Route::get('/categories', [ProductController::class, 'getCategories']);
        Route::get('/colors', [ProductController::class, 'getColors']);
        Route::post('/create', [ProductController::class, 'create']);
        Route::post('/edit/{product}', [ProductController::class, 'edit']);
    });

    Route::post('/auth/login', [AuthController::class, 'login']);

    Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});
