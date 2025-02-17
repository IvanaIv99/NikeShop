<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class OrderItem extends Model
{
    protected $table = 'order_items';

    public function size(): HasOne
    {
        return $this->hasOne(Sizes::class, 'id', 'size_id');
    }

    public function color(): HasOne
    {
        return $this->hasOne(Colors::class, 'id', 'color_id');
    }
}
