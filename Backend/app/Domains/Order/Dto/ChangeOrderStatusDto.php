<?php

declare(strict_types=1);

namespace App\Domains\Order\Dto;

use App\Domains\Order\Enums\OrderStatus;
use App\Http\Data\BaseData;
use Illuminate\Validation\Rules\Enum;

final class ChangeOrderStatusDto extends BaseData
{
    public function __construct(
        public readonly OrderStatus $status,
    ) {
    }

    public static function rules(): array
    {
        return [
            'status' => ['required', new Enum(OrderStatus::class)],
        ];
    }
}
