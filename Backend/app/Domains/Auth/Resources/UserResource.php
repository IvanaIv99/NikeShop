<?php

declare(strict_types=1);

namespace App\Domains\Auth\Resources;

use App\Http\Data\BaseData;

final class UserResource extends BaseData
{
    public function __construct(
        public string $firstName,
        public string $lastName,
        public string $email
    ) {
    }
}
