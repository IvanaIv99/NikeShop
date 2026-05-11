<?php

declare(strict_types=1);

namespace App\Domains\Product\Resources;

use App\Http\Data\BaseData;

final class ProductVariantResource extends BaseData
{
    public function __construct(
        public readonly int $id,
        public readonly SizeResource $size,
        public readonly ColorResource $color,
        public readonly int $stock,
        public readonly ?string $sku,
    ) {
    }
}
