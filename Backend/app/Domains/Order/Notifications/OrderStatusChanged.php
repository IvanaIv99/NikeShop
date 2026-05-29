<?php

declare(strict_types=1);

namespace App\Domains\Order\Notifications;

use App\Domains\Order\Enums\OrderStatus;
use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

final class OrderStatusChanged extends Notification implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;
    public array $backoff = [10, 60, 300];

    public function __construct(public readonly Order $order)
    {
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        [$subject, $view] = $this->resolve($this->order->status);

        $this->order->loadMissing('orderItems');

        return (new MailMessage())
            ->subject($subject)
            ->view("emails.orders.$view", [
                'order'      => $this->order,
                'orderItems' => $this->order->orderItems,
            ]);
    }

    /**
     * @return array{0:string, 1:string}
     */
    private function resolve(OrderStatus $status): array
    {
        return match ($status) {
            OrderStatus::Received  => ["We've received your order #{$this->order->id}", 'received'],
            OrderStatus::Shipped   => ["Your order #{$this->order->id} is on the way", 'shipped'],
            OrderStatus::Done      => ["Your order #{$this->order->id} has been delivered", 'delivered'],
            OrderStatus::Cancelled => ["Your order #{$this->order->id} was cancelled", 'cancelled'],
            OrderStatus::Refunded  => ["Refund issued for order #{$this->order->id}", 'refunded'],
        };
    }
}
