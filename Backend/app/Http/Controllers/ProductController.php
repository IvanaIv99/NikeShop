<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getAll(Request $request): JsonResponse
    {
        return response()->json([
            Product::with('categories','sizes','colors')->get()
        ]);
    }
}
