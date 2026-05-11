<?php

declare(strict_types=1);

namespace App\Domains\Product\Services;

use App\Models\Category;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

final readonly class CategoryService
{
    private const string CACHE_KEY = 'categories.all';
    private const int CACHE_TTL = 3600;

    public function all(): Collection
    {
        return Cache::remember(
            self::CACHE_KEY,
            self::CACHE_TTL,
            fn (): Collection => Category::all()
        );
    }

    public function flush(): void
    {
        Cache::forget(self::CACHE_KEY);
    }
}
