<?php

declare(strict_types=1);

namespace App\Domains\Product\Services;

use App\Models\Color;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

final readonly class ColorService
{
    private const string CACHE_KEY = 'colors.all';
    private const int CACHE_TTL = 3600;

    public function all(): Collection
    {
        return Cache::remember(
            self::CACHE_KEY,
            self::CACHE_TTL,
            fn (): Collection => Color::all()
        );
    }
}
