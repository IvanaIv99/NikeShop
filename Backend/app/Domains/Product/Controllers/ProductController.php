<?php

declare(strict_types=1);

namespace App\Domains\Product\Controllers;

use App\Domains\Product\Dto\CreateProductDto;
use App\Domains\Product\Dto\UpdateProductDto;
use App\Domains\Product\Resources\ProductResource;
use App\Domains\Product\Services\ProductService;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class ProductController extends Controller
{
    public function __construct(
        private readonly ProductService $service
    ) {
    }

    public function index(): JsonResponse
    {
        $response = $this->service->all();
        return $this->sendResponse(
            ProductResource::collect($response)
        );
    }

    public function show(Product $product): JsonResponse
    {
        $response = $this->service->loadFull($product);
        return $this->sendResponse(
            ProductResource::from($response)
        );
    }

    public function store(Request $request): JsonResponse
    {
        $response = $this->service->create(CreateProductDto::from($request));
        return $this->sendResponse(
            ProductResource::from($response)
        );
    }

    public function update(Request $request, Product $product): JsonResponse
    {
        $response = $this->service->update($product, UpdateProductDto::from($request));
        return $this->sendResponse(
            ProductResource::from($response)
        );
    }

    public function destroy(Product $product): JsonResponse
    {
        $response = $this->service->delete($product);
        return $this->sendResponse($response);
    }

    public function stats(): JsonResponse
    {
        $response = $this->service->stats();
        return $this->sendResponse($response);
    }
}
