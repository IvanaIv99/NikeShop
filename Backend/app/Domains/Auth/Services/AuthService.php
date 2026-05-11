<?php

declare(strict_types=1);

namespace App\Domains\Auth\Services;

use App\Domains\Auth\Dto\LoginDto;
use App\Exceptions\ApiException;
use App\Models\Admin;
use Illuminate\Support\Facades\Auth;

final readonly class AuthService
{
    /**
     * @throws ApiException
     */
    public function login(LoginDto $dto): array
    {
        try {
            if (!Auth::attempt($dto->toArray())) {
                throw new ApiException('Credentials does not match with our record.');
            }

            $user = Admin::query()->where('email', $dto->email)->first();

            return [
                'token' => $user->createToken("API TOKEN")->plainTextToken,
                'user' => $user
            ];
        } catch (\Throwable $th) {
            throw new ApiException($th->getMessage());
        }
    }

    public function logout(): bool
    {
        return (bool) getLoggedInUser()->tokens()->delete();
    }
}
