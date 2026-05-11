<?php

declare(strict_types=1);

namespace App\Domains\Order\Providers;

use Illuminate\Support\ServiceProvider;
use Override;

final class OrderDomainServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
    }

    #[Override]
    public function register(): void
    {
        $this->app->register(OrderRouteServiceProvider::class);
    }
}
