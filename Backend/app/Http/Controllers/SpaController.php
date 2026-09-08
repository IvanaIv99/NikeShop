<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\BinaryFileResponse;

class SpaController extends Controller
{
    /**
     * Serve the compiled Angular single-page app shell for any non-API route.
     *
     * The SPA build output (index.html + assets) is generated into public/ at
     * deploy time by scripts/build-frontend.sh. Static assets are served
     * directly by the web server; only unmatched paths fall through to here.
     */
    public function __invoke(): BinaryFileResponse
    {
        return response()->file(public_path('index.html'));
    }
}
