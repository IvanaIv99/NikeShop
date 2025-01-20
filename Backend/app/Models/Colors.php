<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @mixin IdeHelperColor
 */
class Colors extends Model
{
    protected $table = 'colors';
    protected $fillable = [
        'name','code'
    ];

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Products::class, 'product_colors', 'color_id','product_id');
    }
}
