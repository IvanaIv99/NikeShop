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
        DB::transaction(function () use ($request) {
            // Kreirajte novi Order objekat
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
            $order->payment_method = 'pay_on_delivery';
            $order->subtotal = $request->get('subtotal');
            $order->status = 'received';
            $order->created_at = now();
            $order->updated_at = now();
            $order->save();

            foreach ($request->get('items') as $item) {
                $orderItem = OrderItem::query()->insert([
                    'order_id' => $order->id,
                    'product_id' => $item->idProduct,
                    'size_id' => $item->idSize,
                    'color_id' => $item->idColor,
                    'quantity' => $item->quantity,
                    'total' => $item->total
                ]);
            }

            dd($order);
        });

        return response()->json([]);
    }

    public function get(Request $request): JsonResponse
    {
        return response()->json([]);
    }

}
