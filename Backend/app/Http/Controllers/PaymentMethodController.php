<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\Colors;
use App\Models\PaymentMethods;
use App\Models\Products;
use App\Models\Sizes;
use Database\Seeders\PaymentMethodSeeder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;

class PaymentMethodController extends Controller
{
    public function get(Request $request): JsonResponse
    {
        return response()->json([
            'data' => PaymentMethods::all()
        ]);
    }
}
