<?php

declare(strict_types=1);

namespace App\Domains\Product\Providers;

use App\Traits\ServiceProvider\DynamicRoute;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider;

final class ProductRouteServiceProvider extends RouteServiceProvider
{
    use DynamicRoute;

    public function map(): void
    {
        $this->mapRoute('api/products', null, 'app/Domains/Product/Routes/products.php');
        $this->mapRoute('api/categories', null, 'app/Domains/Product/Routes/categories.php');
        $this->mapRoute('api/sizes', null, 'app/Domains/Product/Routes/sizes.php');
        $this->mapRoute('api/colors', null, 'app/Domains/Product/Routes/colors.php');
    }
}
