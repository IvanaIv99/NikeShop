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

    public function label(): string
    {
        return ucfirst($this->value);
    }

    /**
     * Allowed next states for the order lifecycle. Cancelled and Refunded are
     * terminal.
     *
     * @return list<self>
     */
    public function allowedTransitions(): array
    {
        return match ($this) {
            self::Received  => [self::Shipped, self::Cancelled],
            self::Shipped   => [self::Done, self::Refunded],
            self::Done      => [self::Refunded],
            self::Cancelled => [],
            self::Refunded  => [],
        };
    }

    public function canTransitionTo(self $to): bool
    {
        return in_array($to, $this->allowedTransitions(), true);
    }

    /**
     * Whether entering this state should return reserved stock to inventory.
     */
    public function restocksInventory(): bool
    {
        return $this === self::Cancelled || $this === self::Refunded;
    }
}
