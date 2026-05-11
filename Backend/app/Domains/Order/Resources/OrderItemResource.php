<?php

namespace App\Domains\Order\Resources;

use App\Domains\Product\Resources\ColorResource;
use App\Domains\Product\Resources\ProductResource;
use App\Domains\Product\Resources\SizeResource;
use App\Http\Data\BaseData;

class OrderItemResource extends BaseData
{
    public function __construct(
        public int $id,
        public readonly ProductResource $product,
        public readonly SizeResource $size,
        public readonly ColorResource $color,
        public readonly string $quantity,
        public readonly string $total,
        public readonly string $createdAt,
        public readonly string $updatedAt
    ) {
    }
}
