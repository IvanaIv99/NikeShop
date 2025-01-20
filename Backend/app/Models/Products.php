<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * @mixin IdeHelperProduct
 */
class Products extends Model
{
    protected $table = 'products';
    protected $fillable = [
        'name','description','price','image'
    ];

    public function getImageAttribute($value): string
    {
        return asset('storage/products/' . $value);
    }

    public function categories()
    {
        return $this->belongsToMany(Categories::class, 'products_categories', 'product_id', 'category_id');
    }

    public function sizes()
    {
        return $this->belongsToMany(Sizes::class, 'products_sizes', 'product_id', 'size_id');
    }

    public function colors()
    {
        return $this->belongsToMany(Colors::class, 'products_colors', 'product_id', 'color_id');
    }
}
