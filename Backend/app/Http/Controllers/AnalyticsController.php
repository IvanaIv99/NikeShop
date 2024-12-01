<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    public function get(Request $request): JsonResponse
    {
        return response()->json([
            'productsCount' => Product::query()->count()
        ]);
    }
}