<?php

use App\Domains\Product\Controllers\SizeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [SizeController::class, 'index']);
