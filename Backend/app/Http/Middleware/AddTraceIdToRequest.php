<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Helpers\Tracing;
use Illuminate\Support\Facades\Log;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

final class AddTraceIdToRequest
{
    public function handle(Request $request, Closure $next): Response
    {
        $traceId = Tracing::getCurrentTraceId();
        Log::withContext([
            'trace' => $traceId,
        ]);
        $response = $next($request);
        $response->headers->set('X-TraceId', $traceId);

        return $response;
    }
}
