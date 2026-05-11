<?php

declare(strict_types=1);

namespace App\Domains\Order\Dto;

use App\Http\Data\BaseData;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\DataCollection;

final class CreateOrderDto extends BaseData
{
    public function __construct(
        public readonly string $firstName,
        public readonly string $lastName,
        public readonly string $email,
        public readonly string $phone,
        public readonly string $country,
        public readonly string $city,
        public readonly string $address,
        public readonly string $additional,
        public readonly string $paymentMethod,
        public readonly string $subtotal,
        public readonly string $total,
        #[DataCollectionOf(SingleOrderItemDto::class)]
        public readonly DataCollection $orderItems
    ) {
    }
}
