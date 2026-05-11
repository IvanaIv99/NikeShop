<?php

declare(strict_types=1);

namespace App\Domains\Product\Controllers;

use App\Domains\Product\Resources\ColorResource;
use App\Domains\Product\Services\ColorService;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

final class ColorController extends Controller
{
    public function __construct(
        private readonly ColorService $service
    ) {
    }

    public function index(): JsonResponse
    {
        $response = $this->service->all();
        return $this->sendResponse(ColorResource::collect($response));
    }
}
