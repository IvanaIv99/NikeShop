<?php

namespace App\Http\Controllers;

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
        DB::transaction(function () use ($request) {
            $orderItems = [];

            $order = new Order();
            $order->first_name = $request->get('first_name');
            $order->last_name = $request->get('last_name');
            $order->email = $request->get('email');
            $order->phone = $request->get('phone');
            $order->country = $request->get('country');
            $order->state = $request->get('state');
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
                    'product_id' => $item['product_id'],
                    'size_id' => $item['size_id'],
                    'color_id' => $item['color_id'],
                    'quantity' => $item['quantity'],
                    'total' => $item['total']
                ];
            }

            OrderItem::query()->insert($orderItems);
        });

        return response()->json(['message' => 'Order created'], 201);
    }

    public function get(Request $request): JsonResponse
    {
        return response()->json(['data' => Order::all()]);
    }

}
