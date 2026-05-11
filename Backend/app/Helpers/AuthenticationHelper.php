<?php

declare(strict_types=1);

use App\Models\Admin;
use Illuminate\Support\Facades\Auth;

if (!function_exists('getLoggedInUser')) {
    function getLoggedInUser(): Admin
    {
        if (!Auth::id()) {
            throw new InvalidArgumentException('Invalid user state when asking for user.');
        }

        /** @var Admin $user */
        $user = Auth::user();
        return $user;
    }
}

if (!function_exists('getLoggedInUserId')) {
    function getLoggedInUserId(): int
    {
        if (!Auth::id()) {
            throw new InvalidArgumentException('Invalid user state when asking for ID.');
        }

        return (int) Auth::id();
    }
}
