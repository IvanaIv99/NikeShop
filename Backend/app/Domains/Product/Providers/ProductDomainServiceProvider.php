<?php

declare(strict_types=1);

namespace App\Domains\Product\Providers;

use Illuminate\Support\ServiceProvider;
use Override;

final class ProductDomainServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
    }

    #[Override]
    public function register(): void
    {
        $this->app->register(ProductRouteServiceProvider::class);
    }
}
