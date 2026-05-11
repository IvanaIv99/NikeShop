<?php

namespace App\Domains\Order\Controllers;

use App\Domains\Order\Dto\CreateOrderDto;
use App\Domains\Order\Resources\OrderResource;
use App\Domains\Order\Services\OrderService;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function __construct(
        public readonly OrderService $orderService
    ) {
    }

    public function create(Request $request): JsonResponse
    {
        $response = $this->orderService->create(CreateOrderDto::from($request));

        return $this->sendResponse(OrderResource::from($response));
    }

    public function get(Request $request): JsonResponse
    {
        $orders = Order::query()->orderBy('created_at', 'desc')->get();
        return response()->json(['data' => $orders]);
    }

    public function getOne(Order $order, Request $request): JsonResponse
    {
        $order = $order->load('orderItems');
        return response()->json(['data' => OrderResource::from($order)]);
    }

    public function changeStatus(Order $order, Request $request): JsonResponse
    {
        $newStatus = $request->get('status');
        $order->status = $newStatus;
        $order->save();

        $order = $order->fresh()->load('orderItems');
        return response()->json(['data' => OrderResource::from($order)]);
    }

    public function getTodayStats(Request $request): JsonResponse
    {
        $orders = Order::query()->whereDay('created_at', '=', now())->get();

        return response()->json([
            'data' => [
                'orders_count' => $orders->count(),
                'revenue' => $orders->sum('subtotal'),
                'shipped' => $orders->filter(fn (Order $order) => $order->status === 'shipped')->count(),
                'received' => $orders->filter(fn (Order $order) => $order->status === 'received')->count(),
            ]
        ]);
    }

}
