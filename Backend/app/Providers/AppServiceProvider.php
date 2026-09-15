<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;

final class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {

    }

    public function boot(): void
    {
        Model::shouldBeStrict(!app()->isProduction());

        $testing = $this->app->environment('testing');

        RateLimiter::for('api', static fn (Request $request): Limit => $testing
            ? Limit::none()
            : Limit::perMinute(300)->by($request->ip()));

        RateLimiter::for('auth', static fn (Request $request): Limit => $testing
            ? Limit::none()
            : Limit::perMinute(5)->by($request->ip()));
        RateLimiter::for('orders', static fn (Request $request): Limit => $testing
            ? Limit::none()
            : Limit::perMinute(15)->by($request->ip()));

        Str::macro('isTruthy', fn (mixed $str): bool => filter_var($str, FILTER_VALIDATE_BOOLEAN));
    }
}
