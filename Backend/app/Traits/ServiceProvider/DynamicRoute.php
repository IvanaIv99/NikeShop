<?php

declare(strict_types=1);

namespace App\Traits\ServiceProvider;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

trait DynamicRoute
{
    private function mapRoute(
        string $routePrefix,
        string $routeNamespace = null,
        string $routeBasePath = null
    ): void {
        $baseCut = Str::before(static::class, '\Providers');

        if (empty($routeNamespace)) {
            $routeNamespace = $baseCut."\Controllers";
        }

        if (empty($routeBasePath)) {
            /** @var string $routeBasePath */
            $routeBasePath = Str::replace('\\', '/', $baseCut);
            $routeBasePath .= '/Routes/routes.php';
            $routeBasePath = Str::camel($routeBasePath);
        }

        Route::prefix($routePrefix)
            ->middleware('api')
            ->namespace($routeNamespace)
            ->group(base_path($routeBasePath));
    }
}
