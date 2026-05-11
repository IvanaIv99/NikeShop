<?php

declare(strict_types=1);

namespace App\Domains\Product\Controllers;

use App\Domains\Product\Resources\ColorResource;
use App\Http\Controllers\Controller;
use App\Models\Color;
use Illuminate\Http\JsonResponse;

final class ColorController extends Controller
{
    public function index(): JsonResponse
    {
        return $this->sendResponse(ColorResource::collect(Color::all()));
    }
}
