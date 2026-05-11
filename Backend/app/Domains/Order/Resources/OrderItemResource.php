<?php

declare(strict_types=1);

namespace App\Domains\Order\Resources;

use App\Http\Data\BaseData;

final class OrderItemResource extends BaseData
{
    public function __construct(
        public readonly int $id,
        public readonly int $variantId,
        public readonly string $productName,
        public readonly string $productImage,
        public readonly string $sizeValue,
        public readonly string $colorName,
        public readonly string $unitPrice,
        public readonly int $quantity,
        public readonly string $total,
        public readonly string $createdAt,
        public readonly string $updatedAt,
    ) {
    }
}
