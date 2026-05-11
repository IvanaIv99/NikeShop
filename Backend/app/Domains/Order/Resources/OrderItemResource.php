<?php

namespace App\Domains\Order\Resources;

use App\Http\Data\BaseData;
use App\Http\Resources\ColorResource;
use App\Http\Resources\SizeResource;

class OrderItemResource extends BaseData
{
    public function __construct(
        public int $id,
        public readonly string $product,
        public readonly SizeResource $size,
        public readonly ColorResource $color,
        public readonly string $quantity,
        public readonly string $total,
        public readonly string $createdAt,
        public readonly string $updatedAt
    ) {
    }
}
