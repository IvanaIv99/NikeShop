<?php

declare(strict_types=1);

namespace App\Domains\Order\Enums;

use Carbon\CarbonImmutable;

enum DashboardRange: string
{
    case H24 = '24h';
    case W12 = '12w';
    case Ytd = 'ytd';

    public function since(CarbonImmutable $now): CarbonImmutable
    {
        return match ($this) {
            self::H24 => $now->startOfHour()->subHours(23),
            self::W12 => $now->startOfWeek()->subWeeks(11),
            self::Ytd => $now->startOfYear(),
        };
    }
}
