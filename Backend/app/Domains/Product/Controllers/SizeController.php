<?php

declare(strict_types=1);

namespace App\Domains\Product\Controllers;

use App\Domains\Product\Resources\SizeResource;
use App\Domains\Product\Services\SizeService;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

final class SizeController extends Controller
{
    public function __construct(
        private readonly SizeService $service
    ) {
    }

    public function index(): JsonResponse
    {
        $response = $this->service->all();
        return $this->sendResponse(
            SizeResource::collect($response)
        );
    }
}
