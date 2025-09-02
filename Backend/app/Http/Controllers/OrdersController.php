<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrdersController extends Controller
{
    public function create(Request $request): JsonResponse
    {
        //payment metod i status u enum
        $order = DB::transaction(function () use ($request) {
            $orderItems = [];

            $order = new Order();
            $order->first_name = $request->get('first_name');
            $order->last_name = $request->get('last_name');
            $order->email = $request->get('email');
            $order->phone = $request->get('phone');
            $order->country = $request->get('country');
            $order->city = $request->get('city');
            $order->address = $request->get('address');
            $order->additional = $request->get('additional');
            $order->payment_method = $request->get('payment_method');
            $order->subtotal = $request->get('subtotal');
            $order->status = 'received';
            $order->created_at = now();
            $order->updated_at = now();
            $order->save();

            foreach ($request->get('items') as $item) {
                $orderItems[] = [
                    'order_id' => $order->id,
                    'product_id' => $item['product']['id'],
                    'size_id' => $item['size_id'],
                    'color_id' => $item['color_id'],
                    'quantity' => $item['quantity'],
                    'total' => $item['total']
                ];
            }

            OrderItem::query()->insert($orderItems);

            return $order;
        });

        return response()->json([
            'order_id' => $order->id,
        ], 201);
    }

    public function get(Request $request): JsonResponse
    {
        $orders = Order::query()->orderBy('created_at', 'desc')->get();
        return response()->json(['data' => $orders]);
    }

    public function getOne(Order $order, Request $request): JsonResponse
    {
        $order = $order->load('orderItems.product');
        return response()->json(['data' => OrderResource::make($order)]);
    }

    public function changeStatus(Order $order,Request $request): JsonResponse
    {
        $newStatus = $request->get('status');
        $order->status = $newStatus;
        $order->save();

        $order = $order->fresh()->load('orderItems.product');
        return response()->json(['data' => OrderResource::make($order) ]);
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
