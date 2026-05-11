<?php

use App\Domains\Auth\Providers\AuthDomainServiceProvider;
use App\Domains\Order\Providers\OrderDomainServiceProvider;
use App\Domains\Product\Providers\ProductDomainServiceProvider;
use App\Providers\AppServiceProvider;

return [
    AppServiceProvider::class,

    // Domains
    AuthDomainServiceProvider::class,
    OrderDomainServiceProvider::class,
    ProductDomainServiceProvider::class,
];
