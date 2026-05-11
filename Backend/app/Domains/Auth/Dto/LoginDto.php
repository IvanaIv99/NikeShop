<?php

declare(strict_types=1);

namespace App\Domains\Auth\Dto;

use App\Http\Data\BaseData;
use Spatie\LaravelData\Attributes\Validation\Email;

final class LoginDto extends BaseData
{
    public function __construct(
        #[Email]
        public readonly string $email,
        public readonly string $password
    ) {
    }
}
