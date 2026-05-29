<?php

declare(strict_types=1);

namespace App\Domains\Notification\Providers;

use Illuminate\Support\ServiceProvider;
use Override;

final class NotificationDomainServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
    }

    #[Override]
    public function register(): void
    {
        $this->app->register(NotificationRouteServiceProvider::class);
    }
}
