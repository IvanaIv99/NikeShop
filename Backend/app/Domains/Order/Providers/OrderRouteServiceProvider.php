<?php

declare(strict_types=1);

namespace App\Domains\Order\Providers;

use App\Traits\ServiceProvider\DynamicRoute;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider;

final class OrderRouteServiceProvider extends RouteServiceProvider
{
    use DynamicRoute;

    public function map(): void
    {
        $this->mapRoute('api/orders');
    }
}
