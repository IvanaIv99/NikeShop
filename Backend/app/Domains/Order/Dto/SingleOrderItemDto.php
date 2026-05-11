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

    public static function rules(): array
    {
        return [
            'productId' => ['required', 'integer', 'exists:products,id'],
            'sizeId' => ['required', 'integer', 'exists:sizes,id'],
            'colorId' => ['required', 'integer', 'exists:colors,id'],
            'quantity' => ['required', 'integer', 'min:1'],
            'total' => ['required', 'numeric', 'min:0'],
        ];
    }
}
