<?php

declare(strict_types=1);

namespace App\Domains\Order\Enums;

enum OrderStatus: string
{
    case Received = 'received';
    case Shipped  = 'shipped';
    case Done     = 'done';
    case Cancelled = 'cancelled';
    case Refunded  = 'refunded';
}
