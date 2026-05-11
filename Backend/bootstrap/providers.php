<?php

use App\Domains\Auth\Providers\AuthDomainServiceProvider;
use App\Domains\Order\Providers\OrderDomainServiceProvider;
use App\Providers\AppServiceProvider;

return [
    AppServiceProvider::class,

    // Domains
    AuthDomainServiceProvider::class,
    OrderDomainServiceProvider::class
];
