<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders';
    protected $fillable = [
        'first_name','last_name','country','city','address','subtotal','payment_method_id'
    ];
}
