<?php

declare(strict_types=1);

namespace App\Helpers;

use Illuminate\Support\Str;

final class Tracing
{
    private static ?string $traceId = null;

    public static function getCurrentTraceId(): string
    {
        if (Tracing::$traceId !== null) {
            return Tracing::$traceId;
        }

        Tracing::$traceId = self::generateTraceId();
        return Tracing::$traceId;
    }

    public static function clear(): void
    {
        Tracing::$traceId = null;
    }

    public static function generateTraceId(): string
    {
        return Str::random(8);
    }
}
