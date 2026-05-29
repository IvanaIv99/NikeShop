<?php

declare(strict_types=1);

namespace App\Domains\Order\Notifications;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

final class NewOrderReceived extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public readonly Order $order)
    {
    }

    /**
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * @return array<string, mixed>
     */
    public function toDatabase(object $notifiable): array
    {
        return [
            'type'          => 'new_order',
            'order_id'      => $this->order->id,
            'customer_name' => trim($this->order->first_name . ' ' . $this->order->last_name),
            'total'         => (float) $this->order->subtotal,
            'items_count'   => (int) $this->order->orderItems->sum('quantity'),
            'link'          => '/admin-panel/orders/' . $this->order->id,
        ];
    }
}
