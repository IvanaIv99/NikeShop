<?php

declare(strict_types=1);

namespace App\Domains\Product\Resources;

use App\Http\Data\BaseData;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\DataCollection;

final class ProductStatsResource extends BaseData
{
    public function __construct(
        #[DataCollectionOf(ProductResource::class)]
        public DataCollection $topSelling
    ) {
    }
}
