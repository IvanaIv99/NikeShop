<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @mixin IdeHelperProduct
 */
class Product extends Model
{
    use SoftDeletes;

    protected $table = 'products';
    protected $fillable = [
        'name', 'description', 'price', 'image',
        'stock',
        'size_id',
        'color_id',
        'sku',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'price'     => 'float',
    ];

    protected static function booted(): void
    {
        static::deleting(function (Product $product): void {
            if ($product->isForceDeleting()) {
                $product->variants()->withTrashed()->forceDelete();
            } else {
                $product->variants()->delete();
            }
        });

        static::restoring(function (Product $product): void {
            $product->variants()->onlyTrashed()->restore();
        });
    }

    public function getImageAttribute($value): string
    {
        return asset('storage/products/' . $value);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'products_categories', 'product_id', 'category_id');
    }

    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function orders(): HasManyThrough
    {
        return $this->hasManyThrough(
            OrderItem::class,
            ProductVariant::class,
            'product_id',
            'variant_id',
            'id',
            'id'
        );
    }
}
