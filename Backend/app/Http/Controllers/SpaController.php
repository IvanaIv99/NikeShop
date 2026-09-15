<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\BinaryFileResponse;

class SpaController extends Controller
{
    public function __invoke(): BinaryFileResponse
    {
        return response()->file(public_path('index.html'));
    }
}
