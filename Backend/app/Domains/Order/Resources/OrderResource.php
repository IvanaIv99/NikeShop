<?php

declare(strict_types=1);

namespace App\Domains\Order\Resources;

use App\Http\Data\BaseData;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\DataCollection;

final class OrderResource extends BaseData
{
    public function __construct(
        public int $id,
        public readonly string $firstName,
        public readonly string $lastName,
        public readonly string $email,
        public readonly string $phone,
        public readonly string $country,
        public readonly string $city,
        public readonly string $address,
        public readonly ?string $additional,
        public readonly string $paymentMethod,
        public readonly string $subtotal,
        public readonly string $status,
        public readonly string $createdAt,
        public readonly string $updatedAt,
        #[DataCollectionOf(OrderItemResource::class)]
        public readonly DataCollection $orderItems
    ) {
    }
}
