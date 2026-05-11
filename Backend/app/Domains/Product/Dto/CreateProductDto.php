<?php

declare(strict_types=1);

namespace App\Domains\Product\Dto;

use App\Http\Data\BaseData;
use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\DataCollection;

final class CreateProductDto extends BaseData
{
    public function __construct(
        public readonly string $name,
        public readonly string $description,
        public readonly string $price,
        public readonly UploadedFile $image,
        /** @var int[] */
        public readonly array $categories,
        #[DataCollectionOf(ProductVariantDto::class)]
        public readonly DataCollection $variants,
    ) {
    }

    public static function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:2000'],
            'price' => ['required', 'numeric', 'min:0'],
            'image' => ['required', 'image', 'mimes:jpeg,jpg,png,webp', 'max:5120'],
            'categories' => ['required', 'array', 'min:1'],
            'categories.*' => ['integer', 'exists:categories,id'],
            'variants' => ['required', 'array', 'min:1'],
        ];
    }
}
