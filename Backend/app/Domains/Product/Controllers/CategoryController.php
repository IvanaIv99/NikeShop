<?php

declare(strict_types=1);

namespace App\Domains\Product\Controllers;

use App\Domains\Product\Resources\CategoryResource;
use App\Domains\Product\Services\CategoryService;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

final class CategoryController extends Controller
{
    public function __construct(
        private readonly CategoryService $service
    ) {
    }

    public function index(): JsonResponse
    {
        $response = $this->service->all();
        return $this->sendResponse(CategoryResource::collect($response));
    }
}
