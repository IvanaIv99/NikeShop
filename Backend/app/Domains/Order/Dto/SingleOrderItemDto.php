<?php

declare(strict_types=1);

namespace App\Domains\Order\Dto;

use App\Http\Data\BaseData;

final class SingleOrderItemDto extends BaseData
{
    public function __construct(
        public readonly int $variantId,
        public readonly int $quantity,
    ) {
    }

    public static function rules(): array
    {
        return [
            'variantId' => ['required', 'integer', 'exists:product_variants,id'],
            'quantity' => ['required', 'integer', 'min:1', 'max:10000'],
        ];
    }
}
