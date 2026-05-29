<?php

declare(strict_types=1);

namespace App\Domains\Product\Notifications;

use App\Models\ProductVariant;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

final class LowStockAlert extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public readonly ProductVariant $variant,
        public readonly int $threshold,
    ) {
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
            'type'         => $this->variant->stock === 0 ? 'out_of_stock' : 'low_stock',
            'variant_id'   => $this->variant->id,
            'product_id'   => $this->variant->product_id,
            'product_name' => $this->variant->product->name,
            'size'         => (string) $this->variant->size->size,
            'color'        => $this->variant->color->name,
            'sku'          => $this->variant->sku,
            'stock'        => $this->variant->stock,
            'threshold'    => $this->threshold,
            'link'         => '/admin-panel/products/edit/' . $this->variant->product_id,
        ];
    }
}
