<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    protected $table = 'colors';
    protected $fillable = [
        'name','code'
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_colors', 'color_id','product_id');
    }
}