<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperSize
 */
class Sizes extends Model
{
    protected $table = 'sizes';
    protected $fillable = [
        'size'
    ];

    public function products()
    {
        return $this->belongsToMany(Products::class, 'products_sizes', 'size_id','product_id');
    }
}
