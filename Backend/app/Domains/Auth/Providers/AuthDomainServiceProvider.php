<?php

declare(strict_types=1);

namespace App\Domains\Auth\Providers;

use App\Domains\Auth\Tokens\AccessToken;
use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\Sanctum;
use Override;

final class AuthDomainServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Sanctum::usePersonalAccessTokenModel(AccessToken::class);
    }

    #[Override]
    public function register(): void
    {
        $this->app->register(AuthRouteServiceProvider::class);
    }
}
