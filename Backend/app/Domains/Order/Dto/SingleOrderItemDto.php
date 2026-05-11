<?php

declare(strict_types=1);

namespace App\Domains\Order\Dto;

use App\Http\Data\BaseData;

final class SingleOrderItemDto extends BaseData
{
    public function __construct(
        public readonly string $productId,
        public readonly string $sizeId,
        public readonly string $colorId,
        public readonly string $quantity,
        public readonly string $total,
    ) {
    }
}
