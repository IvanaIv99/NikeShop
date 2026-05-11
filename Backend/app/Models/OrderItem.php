<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class OrderItem extends Model
{
    protected $table = 'order_items';

    public function size(): HasOne
    {
        return $this->hasOne(Size::class, 'id', 'size_id');
    }

    public function product(): HasOne
    {
        return $this->hasOne(Product::class, 'id', 'product_id');
    }

    public function color(): HasOne
    {
        return $this->hasOne(Color::class, 'id', 'color_id');
    }
}
