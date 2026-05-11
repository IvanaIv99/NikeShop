<?php

declare(strict_types=1);

namespace App\Domains\Product\Services;

use App\Domains\Product\Dto\CreateProductDto;
use App\Domains\Product\Dto\ProductVariantDto;
use App\Domains\Product\Dto\UpdateProductDto;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Optional;

final readonly class ProductService
{
    public function all(): Collection
    {
        return Product::with('categories', 'variants.size', 'variants.color')->get();
    }

    public function find(Product $product): Product
    {
        return $product->load('categories', 'variants.size', 'variants.color');
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

            $product->categories()->sync($dto->categories);
            $this->replaceVariants($product, $dto->variants);

            return $product->load('categories', 'variants.size', 'variants.color');
        });
    }

    public function update(Product $product, UpdateProductDto $dto): Product
    {
        return DB::transaction(function () use ($product, $dto): Product {
            $product->name = $dto->name;
            $product->description = $dto->description;
            $product->price = $dto->price;

            if (! $dto->image instanceof Optional) {
                $product->image = $this->storeImage($dto->image);
            }

            $product->save();

            $product->categories()->sync($dto->categories);
            $this->replaceVariants($product, $dto->variants);

            return $product->fresh(['categories', 'variants.size', 'variants.color']);
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

        return ['topSelling' => $topSelling];
    }

    /**
     * @param  DataCollection<int, ProductVariantDto>  $variants
     */
    private function replaceVariants(Product $product, DataCollection $variants): void
    {
        $incoming = collect($variants->toCollection())->keyBy(
            fn (ProductVariantDto $v) => sprintf("%d:%d", $v->sizeId, $v->colorId)
        );

        $idsToDelete = [];

        foreach ($product->variants as $existing) {
            $key =  sprintf("%d:%d", $existing->size_id, $existing->color_id);

            if ($incoming->has($key)) {
                /** @var ProductVariantDto $dto */
                $dto = $incoming->pull($key);
                $existing->update(['stock' => $dto->stock, 'sku' => $dto->sku]);
            } else {
                $idsToDelete[] = $existing->id;
            }
        }

        foreach ($incoming as $dto) {
            $product->variants()->create([
                'size_id' => $dto->sizeId,
                'color_id' => $dto->colorId,
                'stock' => $dto->stock,
                'sku' => $dto->sku,
            ]);
        }

        ProductVariant::destroy($idsToDelete);
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
