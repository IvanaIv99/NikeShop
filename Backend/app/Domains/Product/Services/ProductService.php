<?php

declare(strict_types=1);

namespace App\Domains\Product\Services;

use App\Domains\Product\Dto\CreateProductDto;
use App\Domains\Product\Dto\UpdateProductDto;
use App\Domains\Product\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Spatie\LaravelData\Optional;

final readonly class ProductService
{
    public function all(): Collection
    {
        return Product::with('categories', 'sizes', 'colors')->get();
    }

    public function find(Product $product): Product
    {
        return $product->load('categories', 'sizes', 'colors');
    }

    public function create(CreateProductDto $dto): Product
    {
        return DB::transaction(function () use ($dto): Product {
            $product = new Product();
            $product->name = $dto->name;
            $product->description = $dto->description;
            $product->price = $dto->price;
            $product->image = $this->storeImage($dto->image);
            $product->save();

            $product->colors()->sync($dto->colors);
            $product->categories()->sync($dto->categories);
            $product->sizes()->sync($dto->sizes);

            return $product->load('categories', 'sizes', 'colors');
        });
    }

    public function update(Product $product, UpdateProductDto $dto): Product
    {
        return DB::transaction(function () use ($product, $dto): Product {
            $product->name = $dto->name;
            $product->description = $dto->description;
            $product->price = $dto->price;

            if (!$dto->image instanceof Optional) {
                $product->image = $this->storeImage($dto->image);
            }

            $product->save();

            $product->colors()->sync($dto->colors);
            $product->categories()->sync($dto->categories);
            $product->sizes()->sync($dto->sizes);

            return $product->fresh(['categories', 'sizes', 'colors']);
        });
    }

    public function delete(Product $product): bool
    {
        return (bool) $product->delete();
    }

    public function stats(int $limit = 3): array
    {
        $topSelling = Product::query()
            ->withCount('orders')
            ->orderByDesc('orders_count')
            ->take($limit)
            ->get();

        return [
            'topSelling' => $topSelling
        ];
    }

    private function storeImage(UploadedFile $image): string
    {
        $completeFileName = $image->getClientOriginalName();
        $fileNameOnly = pathinfo($completeFileName, PATHINFO_FILENAME);
        $extension = $image->getClientOriginalExtension();
        $newName = sprintf('%s_%s.%s', now()->timestamp, $fileNameOnly, $extension);
        $image->storeAs('public/products', $newName);

        return $newName;
    }
}
