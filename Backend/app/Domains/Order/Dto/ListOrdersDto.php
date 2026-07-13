<?php

declare(strict_types=1);

namespace App\Domains\Order\Dto;

use App\Domains\Order\Enums\OrderStatus;
use App\Http\Data\BaseData;
use Illuminate\Validation\Rule;

final class ListOrdersDto extends BaseData
{
    public function __construct(
        public readonly ?string $search = null,
        public readonly ?string $status = null,
        public readonly ?string $dateFrom = null,
        public readonly ?string $dateTo = null,
        public readonly int $page = 1,
        public readonly int $perPage = 20,
    ) {
    }

    public static function rules(): array
    {
        return [
            'search'   => ['nullable', 'string', 'max:255'],
            'status'   => ['nullable', 'string', Rule::enum(OrderStatus::class)],
            'dateFrom' => ['nullable', 'date'],
            'dateTo'   => ['nullable', 'date'],
            'page'     => ['nullable', 'integer', 'min:1'],
            'perPage'  => ['nullable', 'integer', 'min:1', 'max:100'],
        ];
    }
}
