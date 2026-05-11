<?php

use App\Exceptions\ApiException;
use App\Http\Middleware\ForceJsonMiddleware;
use App\Http\Middleware\AddTraceIdToRequest;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Middleware\ThrottleRequestsWithRedis;
use Illuminate\Support\ItemNotFoundException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->trustProxies(
            at: '*',
            headers: Request::HEADER_X_FORWARDED_FOR |
            Request::HEADER_X_FORWARDED_HOST |
            Request::HEADER_X_FORWARDED_PORT |
            Request::HEADER_X_FORWARDED_PROTO |
            Request::HEADER_X_FORWARDED_AWS_ELB
        );
        $middleware->api(prepend: [
            ForceJsonMiddleware::class,
            AddTraceIdToRequest::class,
            //ThrottleRequestsWithRedis::class . ':api'
        ]);
        $middleware->alias([
//            'authenticated-with-id-token' => AuthenticatedWithIdToken::class
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions
            ->dontReport([
                ApiException::class,
                ValidationException::class
            ])
            ->dontFlash(['passwordConfirmation'])
            ->render(function (Throwable $throwable): JsonResponse|null {
                $exceptionsToReturnJson = [
                    ApiException::class,
                    AuthenticationException::class,
                    AccessDeniedHttpException::class,
                    NotFoundHttpException::class,
                    ItemNotFoundException::class,
                    ValidationException::class,
                    ThrottleRequestsException::class,
                ];
                if (in_array($throwable::class, $exceptionsToReturnJson)) {
                    return \App\Exceptions\CustomExceptionHandler::renderCustomResponse($throwable);
                }
                return null;
            });
    })->create();
