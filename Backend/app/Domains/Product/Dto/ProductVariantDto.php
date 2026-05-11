<?php

declare(strict_types=1);

namespace App\Domains\Product\Dto;

use App\Http\Data\BaseData;

final class ProductVariantDto extends BaseData
{
    public function __construct(
        public readonly int $sizeId,
        public readonly int $colorId,
        public readonly int $stock,
        public readonly ?string $sku = null,
    ) {
    }

    public static function rules(): array
    {
        return [
            'sizeId' => ['required', 'integer', 'exists:sizes,id'],
            'colorId' => ['required', 'integer', 'exists:colors,id'],
            'stock' => ['required', 'integer', 'min:0'],
            'sku' => ['nullable', 'string', 'max:64'],
        ];
    }
}
