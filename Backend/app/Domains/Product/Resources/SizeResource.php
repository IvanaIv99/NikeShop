<?php

declare(strict_types=1);

namespace App\Domains\Product\Resources;

use App\Http\Data\BaseData;

final class SizeResource extends BaseData
{
    public function __construct(
        public int $id,
        public readonly string $size,
    ) {
    }
}
