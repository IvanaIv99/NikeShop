<?php

declare(strict_types=1);

namespace App\Domains\Order\Enums;

enum PaymentMethod: string
{
    case CashOnDelivery = 'cash_on_delivery';

    public function label(): string
    {
        return match ($this) {
            self::CashOnDelivery => 'Cash on Delivery',
        };
    }
}
