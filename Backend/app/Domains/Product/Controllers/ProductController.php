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
use Symfony\Component\HttpFoundation\Response;

final class ProductController extends Controller
{
    public function __construct(
        private readonly ProductService $service
    ) {
    }

    public function index(): JsonResponse
    {
        return $this->sendResponse(
            ProductResource::collect($this->service->all())
        );
    }

    public function show(Product $product): JsonResponse
    {
        return $this->sendResponse(
            ProductResource::from($this->service->find($product))
        );
    }

    public function store(Request $request): JsonResponse
    {
        $product = $this->service->create(CreateProductDto::from($request));

        return $this->sendResponse(ProductResource::from($product));
    }

    public function update(Request $request, Product $product): JsonResponse
    {
        $product = $this->service->update($product, UpdateProductDto::from($request));

        return $this->sendResponse(ProductResource::from($product));
    }

    public function destroy(Product $product): JsonResponse
    {
        return $this->sendResponse($this->service->delete($product));
    }

    public function stats(): JsonResponse
    {
        return $this->sendResponse(
            $this->service->stats()
        );
    }
}
