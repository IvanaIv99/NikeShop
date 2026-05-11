<?php

declare(strict_types=1);

namespace App\Domains\Product\Dto;

use App\Http\Data\BaseData;
use Illuminate\Http\UploadedFile;

final class CreateProductDto extends BaseData
{
    public function __construct(
        public readonly string $name,
        public readonly string $description,
        public readonly string $price,
        public readonly UploadedFile $image,
        /** @var int[] */
        public readonly array $colors,
        /** @var int[] */
        public readonly array $categories,
        /** @var int[] */
        public readonly array $sizes,
    ) {
    }
}
