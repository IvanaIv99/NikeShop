<?php

declare(strict_types=1);

namespace App\Domains\Product\Resources;

use App\Http\Data\BaseData;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\DataCollection;

final class ProductResource extends BaseData
{
    public function __construct(
        public int $id,
        public readonly string $name,
        public readonly string $description,
        public readonly string $price,
        public readonly string $image,
        #[DataCollectionOf(CategoryResource::class)]
        public readonly DataCollection $categories,
        #[DataCollectionOf(SizeResource::class)]
        public readonly DataCollection $sizes,
        #[DataCollectionOf(ColorResource::class)]
        public readonly DataCollection $colors,
    ) {
    }
}
