<?php

namespace App\Domains\Auth\Controllers;

use App\Domains\Auth\Dto\LoginDto;
use App\Domains\Auth\Resources\LoginResource;
use App\Domains\Auth\Services\AuthService;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(public readonly AuthService $service)
    {
    }

    public function login(Request $request): JsonResponse
    {
        $response = $this->service->login(LoginDto::from($request));

        return $this->sendResponse(LoginResource::from($response));
    }

    public function logout(): JsonResponse
    {
        $response = $this->service->logout();

        if (!$response) {
            return $this->sendBadResponse('There was an error logging you out.');
        }

        return $this->sendResponse(['success' => true]);
    }
}
