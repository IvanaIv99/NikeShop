<?php

declare(strict_types=1);

namespace App\Domains\Auth\Tokens;

use App\Models\Admin;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Laravel\Sanctum\PersonalAccessToken;

/**
 * @mixin IdeHelperAccessToken
 *
 * @property-read Admin $tokenable
 */
final class AccessToken extends PersonalAccessToken implements TokenInterface
{
    use HasUuids;

    protected $table = 'personal_access_tokens';

    protected $with = ['tokenable'];

    public function getTokenType(): string
    {
        return 'Sanctum';
    }

    public function getEmail(): ?string
    {
        return $this->tokenable->email;
    }

    public function getUserId(): string
    {
        return (string) $this->tokenable->id;
    }
}
