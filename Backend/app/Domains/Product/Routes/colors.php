<?php

use App\Domains\Product\Controllers\ColorController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ColorController::class, 'index']);
