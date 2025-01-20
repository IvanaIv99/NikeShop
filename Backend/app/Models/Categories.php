<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperCategory
 */
class Categories extends Model
{
    protected $table = 'categories';
    protected $fillable = [
        'name'
    ];

    public function products()
    {
        return $this->belongsToMany(Products::class, 'products_categories', 'category_id','product_id');
    }
}
