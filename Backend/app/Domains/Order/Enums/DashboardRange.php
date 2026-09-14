<?php

declare(strict_types=1);

namespace App\Domains\Order\Enums;

use Carbon\CarbonImmutable;

enum DashboardRange: string
{
    case H24 = '24h';
    case W12 = '12w';
    case Ytd = 'ytd';

    /**
     * Window start for this range, relative to $now. Kept in one place so the
     * revenue chart, order KPIs and top-seller stats all bucket by the exact
     * same boundaries.
     */
    public function since(CarbonImmutable $now): CarbonImmutable
    {
        return match ($this) {
            self::H24 => $now->startOfHour()->subHours(23),
            self::W12 => $now->startOfWeek()->subWeeks(11),
            self::Ytd => $now->startOfYear(),
        };
    }
}
