<?php

declare(strict_types=1);

namespace App\Domains\Product\Dto;

use App\Http\Data\BaseData;

final class ListProductsDto extends BaseData
{
    public function __construct(
        public readonly ?string $search = null,
        public readonly int $page = 1,
        public readonly int $perPage = 24,
    ) {
    }

    public static function rules(): array
    {
        return [
            'search'  => ['nullable', 'string', 'max:255'],
            'page'    => ['nullable', 'integer', 'min:1'],
            'perPage' => ['nullable', 'integer', 'min:1', 'max:100'],
        ];
    }
}
