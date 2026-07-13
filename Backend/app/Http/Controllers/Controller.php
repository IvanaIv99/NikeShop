<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

abstract class Controller
{
    use AuthorizesRequests;
    use ValidatesRequests;

    /**
     * @return array{page: int, perPage: int, total: int, lastPage: int}
     */
    protected function paginationMeta(LengthAwarePaginator $paginator): array
    {
        return [
            'page'     => $paginator->currentPage(),
            'perPage'  => $paginator->perPage(),
            'total'    => $paginator->total(),
            'lastPage' => $paginator->lastPage(),
        ];
    }

    protected function sendResponse(mixed $data, int $responseCode = Response::HTTP_OK): JsonResponse
    {
        return response()->json([
            'data' => $data,
            'version' => config('app.version'),
        ], $responseCode);
    }

    protected function sendBadResponse(
        string $message,
        int $responseCode = Response::HTTP_BAD_REQUEST
    ): JsonResponse {
        return $this->sendResponse([
            'message' => $message,
            'error' => $message,
        ], $responseCode);
    }
}
