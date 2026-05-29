<?php

declare(strict_types=1);

namespace App\Domains\Notification\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Symfony\Component\HttpFoundation\Response;

final class NotificationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $admin = getLoggedInUser();

        $items = $admin->notifications()
            ->latest()
            ->limit(20)
            ->get()
            ->map(fn (DatabaseNotification $n) => [
                'id'         => $n->id,
                'data'       => $n->data,
                'read_at'    => $n->read_at,
                'created_at' => $n->created_at,
            ]);

        return $this->sendResponse([
            'items'        => $items,
            'unread_count' => $admin->unreadNotifications()->count(),
        ]);
    }

    public function read(Request $request, string $id): JsonResponse
    {
        $notification = getLoggedInUser()->notifications()->whereKey($id)->first();

        if ($notification === null) {
            return $this->sendResponse(null, Response::HTTP_NOT_FOUND);
        }

        $notification->markAsRead();

        return $this->sendResponse(null);
    }

    public function readAll(Request $request): JsonResponse
    {
        getLoggedInUser()->unreadNotifications->markAsRead();

        return $this->sendResponse(null);
    }

    public function destroy(Request $request, string $id): JsonResponse
    {
        $deleted = getLoggedInUser()->notifications()->whereKey($id)->delete();

        if ($deleted === 0) {
            return $this->sendResponse(null, Response::HTTP_NOT_FOUND);
        }

        return $this->sendResponse(null);
    }

    public function destroyAll(Request $request): JsonResponse
    {
        getLoggedInUser()->notifications()->delete();

        return $this->sendResponse(null);
    }
}
