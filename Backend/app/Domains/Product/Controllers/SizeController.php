<?php

declare(strict_types=1);

namespace App\Domains\Product\Controllers;

use App\Domains\Product\Resources\SizeResource;
use App\Http\Controllers\Controller;
use App\Models\Size;
use Illuminate\Http\JsonResponse;

final class SizeController extends Controller
{
    public function index(): JsonResponse
    {
        return $this->sendResponse(SizeResource::collect(Size::all()));
    }
}
