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
        public readonly ?string $additional,
        public readonly string $paymentMethod,
        #[DataCollectionOf(SingleOrderItemDto::class)]
        public readonly DataCollection $orderItems
    ) {
    }

    public static function rules(): array
    {
        return [
            'firstName' => ['required', 'string', 'max:100'],
            'lastName' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:30'],
            'country' => ['required', 'string', 'max:100'],
            'city' => ['required', 'string', 'max:100'],
            'address' => ['required', 'string', 'max:255'],
            'additional' => ['nullable', 'string', 'max:1000'],
            'paymentMethod' => ['required', 'string', 'max:50'],
            'orderItems' => ['required', 'array', 'min:1'],
        ];
    }
}
