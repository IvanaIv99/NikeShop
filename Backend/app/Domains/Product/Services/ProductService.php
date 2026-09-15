<?php

declare(strict_types=1);

namespace App\Domains\Product\Services;

use App\Domains\Order\Enums\DashboardRange;
use App\Domains\Product\Dto\CreateProductDto;
use App\Domains\Product\Dto\ListProductsDto;
use App\Domains\Product\Dto\ProductVariantDto;
use App\Domains\Product\Dto\UpdateProductDto;
use App\Models\Product;
use App\Models\ProductVariant;
use Carbon\CarbonImmutable;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Optional;

final readonly class ProductService
{
    public function all(): Collection
    {
        return Product::with('categories', 'variants.size', 'variants.color')->get();
    }

    public function paginate(ListProductsDto $filters): LengthAwarePaginator
    {
        $query = Product::with('categories', 'variants.size', 'variants.color');

        if ($filters->search !== null && $filters->search !== '') {
            $term = '%' . $filters->search . '%';
            $query->where(static function ($q) use ($term): void {
                $q->where('name', 'like', $term)
                    ->orWhere('description', 'like', $term)
                    ->orWhere('id', 'like', $term);
            });
        }

        if ($filters->category !== null) {
            $query->whereHas('categories', static fn ($q) => $q->where('categories.id', $filters->category));
        }

        if ($filters->stock === 'in') {
            $query->whereHas('variants', static fn ($q) => $q->where('product_variants.stock', '>', 0));
        } elseif ($filters->stock === 'out') {
            $query->whereDoesntHave('variants', static fn ($q) => $q->where('product_variants.stock', '>', 0));
        }

        if ($filters->sort === 'newest') {
            $query->orderByDesc('created_at');
        } elseif ($filters->sort === 'price_asc') {
            $query->orderBy('price');
        } elseif ($filters->sort === 'price_desc') {
            $query->orderByDesc('price');
        }

        return $query->paginate($filters->perPage, ['*'], 'page', $filters->page);
    }

    public function loadFull(Product $product): Product
    {
        return $product->load('categories', 'variants.size', 'variants.color');
    }

    public function create(CreateProductDto $dto): Product
    {
        return DB::transaction(function () use ($dto): Product {
            $product = new Product();
            $product->name = $dto->name;
            $product->description = $dto->description;
            $product->price = (float) $dto->price;
            $product->image = $this->storeImage($dto->image);
            $product->save();

            $product->categories()->sync($dto->categories);
            $this->replaceVariants($product, $dto->variants);

            return $product->load('categories', 'variants.size', 'variants.color');
        });
    }

    public function update(Product $product, UpdateProductDto $dto): Product
    {
        $oldImage = null;
        $result = DB::transaction(function () use ($product, $dto, &$oldImage): Product {
            $locked = Product::query()->lockForUpdate()->findOrFail($product->id);

            $locked->name = $dto->name;
            $locked->description = $dto->description;
            $locked->price = (float) $dto->price;

            if (! $dto->image instanceof Optional) {
                $oldImage = $locked->getRawOriginal('image');
                $locked->image = $this->storeImage($dto->image);
            }

            $locked->save();
            $locked->categories()->sync($dto->categories);
            $this->replaceVariants($locked, $dto->variants);

            return $locked->refresh()->load('categories', 'variants.size', 'variants.color');
        });

        if ($oldImage !== null && $oldImage !== '') {
            $this->deleteImage($oldImage);
        }

        return $result;
    }

    public function delete(Product $product): bool
    {
        $image = $product->getRawOriginal('image');

        $deleted = DB::transaction(static fn (): bool => (bool) $product->delete());

        if ($deleted && $image !== null && $image !== '') {
            $this->deleteImage($image);
        }

        return $deleted;
    }

    /**
     * Top-selling products for each dashboard range. Windows mirror the order
     * stats/chart so the toggle updates every panel consistently.
     *
     * @return array<string, array<int, array{id: int, name: string, orders_count: int, image: string}>>
     */
    public function stats(int $limit = 3): array
    {
        $now = CarbonImmutable::now();

        $stats = [];
        foreach (DashboardRange::cases() as $range) {
            $stats[$range->value] = $this->topSelling($limit, $range->since($now));
        }

        return $stats;
    }

    /**
     * @return array<int, array{id: int, name: string, orders_count: int, image: string}>
     */
    private function topSelling(int $limit, CarbonImmutable $since): array
    {
        return Product::query()
            ->withCount(['orders as orders_count' => fn ($q) => $q->where('order_items.created_at', '>=', $since)])
            ->having('orders_count', '>', 0)
            ->orderByDesc('orders_count')
            ->take($limit)
            ->get()
            ->map(static fn (Product $product): array => [
                'id'           => $product->id,
                'name'         => $product->name,
                'orders_count' => (int) $product->orders_count,
                'image'        => $product->image,
            ])
            ->all();
    }

    /**
     * @param  DataCollection<int, ProductVariantDto>  $variants
     */
    private function replaceVariants(Product $product, DataCollection $variants): void
    {
        $existingAll = ProductVariant::query()
            ->withTrashed()
            ->where('product_id', $product->id)
            ->lockForUpdate()
            ->get();

        $existingActive = $existingAll
            ->whereNull('deleted_at')
            ->keyBy(fn (ProductVariant $v) => sprintf('%d:%d', $v->size_id, $v->color_id));

        $now = now();

        $rows = collect($variants->toCollection())
            ->map(fn (ProductVariantDto $v): array => [
                'product_id' => $product->id,
                'size_id'    => $v->sizeId,
                'color_id'   => $v->colorId,
                'stock'      => $v->stock,
                'sku'        => $v->sku,
                'is_active'  => true,
                'deleted_at' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ])
            ->all();

        $incomingKeys = collect($rows)
            ->map(fn (array $r): string => sprintf('%d:%d', $r['size_id'], $r['color_id']))
            ->all();

        if ($rows !== []) {
            ProductVariant::query()->upsert(
                $rows,
                ['product_id', 'size_id', 'color_id'],
                ['stock', 'sku', 'is_active', 'deleted_at', 'updated_at']
            );
        }

        $toSoftDelete = $existingActive
            ->reject(fn (ProductVariant $v, string $key): bool => in_array($key, $incomingKeys, true))
            ->pluck('id')
            ->all();

        if ($toSoftDelete !== []) {
            ProductVariant::query()->whereIn('id', $toSoftDelete)->delete();
        }
    }

    private function storeImage(UploadedFile $image): string
    {
        $extension = $image->getClientOriginalExtension();
        $newName = sprintf('%s_%s.%s', now()->timestamp, Str::random(16), $extension);
        $image->storePubliclyAs('products', $newName);

        return $newName;
    }

    private function deleteImage(string $filename): void
    {
        Storage::delete('products/' . $filename);
    }
}
