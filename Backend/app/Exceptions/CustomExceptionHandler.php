<?php

declare(strict_types=1);

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\ItemNotFoundException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response as SymfonyBaseResponse;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

final class CustomExceptionHandler
{
    public static function renderCustomResponse(Throwable $throwable): JsonResponse
    {
        $message = $throwable->getMessage();
        $error = '';
        $code = method_exists($throwable, 'getStatusCode') ? $throwable->getStatusCode() : $throwable->getCode();

        if ($throwable instanceof NotFoundHttpException) {
            $code = 404;
            $error = '404 - Route not found';
            if ($throwable->getPrevious() instanceof ModelNotFoundException) {
                $message = 'No results found for '.self::getModelName($throwable);
            }

            $message = empty($message) ? '404 - Resource not found' : $message;
        }

        $error = empty($error) ? $message : $error;
        if ($throwable instanceof AuthenticationException) {
            $code = 401;
        }

        if ($throwable instanceof AccessDeniedHttpException) {
            $code = 403;
        }

        if ($throwable instanceof ItemNotFoundException) {
            $code = 404;
        }

        $errCode = $code !== 0 ? $code : SymfonyBaseResponse::HTTP_UNPROCESSABLE_ENTITY;

        return response()->json([
            'data' => [
                'message' => $message,
                'error' => $error,
                'errors' => self::getMessageBag($throwable),
                'status' => (string) $errCode,
            ],
            'version' => config('app.version'),
        ], $errCode);
    }

    private static function getMessageBag(Throwable $exception): mixed
    {
        if ($exception instanceof ValidationException) {
            return $exception->validator->getMessageBag();
        }

        return [];
    }

    private static function getModelName(NotFoundHttpException $exception): string
    {
        $previousException = $exception->getPrevious();
        if (!$previousException instanceof ModelNotFoundException) {
            return 'requested model';
        }

        try {
            $modelName = last(explode('\\', $previousException->getModel()));
        } catch (Throwable) {
            $modelName = 'requested model';
        }

        return $modelName;
    }
}
