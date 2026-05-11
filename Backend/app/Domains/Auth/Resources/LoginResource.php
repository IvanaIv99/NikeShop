<?php

declare(strict_types=1);

namespace App\Domains\Auth\Resources;

use App\Http\Data\BaseData;

final class LoginResource extends BaseData
{
    public function __construct(
        public UserResource $user,
        public string $token,
    ) {
    }

    public static function fromArray(array $data): self
    {
        return new self(
            user: UserResource::from($data['user']),
            token: $data['token']
        );
    }
}
