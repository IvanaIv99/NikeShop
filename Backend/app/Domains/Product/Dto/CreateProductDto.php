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

    public static function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:2000'],
            'price' => ['required', 'numeric', 'min:0'],
            'image' => ['required', 'image', 'mimes:jpeg,jpg,png,webp', 'max:5120'],
            'colors' => ['required', 'array', 'min:1'],
            'colors.*' => ['integer', 'exists:colors,id'],
            'categories' => ['required', 'array', 'min:1'],
            'categories.*' => ['integer', 'exists:categories,id'],
            'sizes' => ['required', 'array', 'min:1'],
            'sizes.*' => ['integer', 'exists:sizes,id'],
        ];
    }
}
