<?php

declare(strict_types=1);

namespace App\Domains\Auth\Tokens;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Laravel\Sanctum\PersonalAccessToken;

final class AccessToken extends PersonalAccessToken implements TokenInterface
{
    use HasUuids;

    protected $table = 'personal_access_tokens';

    protected $with = ['tokenable'];

    public function getTokenType(): string
    {
        return 'Sanctum '. $this->getType();
    }

    public function getEmail(): ?string
    {
        return $this->tokenable->email;
    }

    public function getUserId(): string
    {
        return $this->tokenable->id;
    }
}
