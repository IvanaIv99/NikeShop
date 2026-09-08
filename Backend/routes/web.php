<?php

use Illuminate\Support\Facades\Route;

// Serve the Angular single-page app for any non-API route.
// Static assets (JS/CSS/images) are served directly by the web server from
// public/; only unmatched paths fall through to here and return the SPA shell.
Route::get('/{any?}', function () {
    return response()->file(public_path('index.html'));
})->where('any', '^(?!api).*$');
