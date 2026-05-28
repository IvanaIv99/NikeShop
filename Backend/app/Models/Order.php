<?php

namespace App\Models;

use App\Domains\Order\Enums\OrderStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @mixin IdeHelperOrder
 */
class Order extends Model
{
    protected $table = 'orders';

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'country',
        'city',
        'address',
        'additional',
        'payment_method',
        'subtotal',
        'status',
    ];

    protected $casts = [
        'status'   => OrderStatus::class,
        'subtotal' => 'decimal:2',
    ];

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function scopeCreatedOn($query, \DateTimeInterface $date)
    {
        return $query->whereDate('created_at', $date);
    }
}
