<?php

declare(strict_types=1);

namespace App\Domains\Auth\Tokens;

interface TokenInterface
{
    public function getTokenType(): string;

    public function getUserId(): string;

    public function getEmail(): ?string;
}
