<?php

declare(strict_types=1);

namespace App\Domains\Order\Dto;

use App\Http\Data\BaseData;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\DataCollection;

final class SummarizeOrderDto extends BaseData
{
    public function __construct(
        #[DataCollectionOf(SingleOrderItemDto::class)]
        public readonly DataCollection $orderItems
    ) {
    }

    public static function rules(): array
    {
        return [
            'orderItems' => ['required', 'array', 'min:1'],
        ];
    }
}
