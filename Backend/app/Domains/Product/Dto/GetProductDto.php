<?php

declare(strict_types=1);

namespace App\Domains\Product\Dto;

use App\Http\Data\BaseData;
use App\Models\Product;
use Spatie\LaravelData\Attributes\FromRouteParameter;

final class GetProductDto extends BaseData
{
    public function __construct(
        #[FromRouteParameter('product')]
        public readonly Product $product
    ) {
    }
}
