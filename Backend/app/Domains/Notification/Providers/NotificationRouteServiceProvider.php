<?php

declare(strict_types=1);

namespace App\Domains\Notification\Providers;

use App\Traits\ServiceProvider\DynamicRoute;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider;

final class NotificationRouteServiceProvider extends RouteServiceProvider
{
    use DynamicRoute;

    public function map(): void
    {
        $this->mapRoute('api/notifications');
    }
}
