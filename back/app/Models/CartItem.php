<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'cart_id',
        'product_id',
        'quantity',
        'price',
        'options',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'price' => 'decimal:2',
        'options' => 'array',
    ];

    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function getTotalAttribute(): float
    {
        return $this->price * $this->quantity;
    }

    public function incrementQuantity(int $amount = 1): void
    {
        $this->update(['quantity' => $this->quantity + $amount]);
    }

    public function decrementQuantity(int $amount = 1): void
    {
        $newQuantity = max(0, $this->quantity - $amount);
        
        if ($newQuantity === 0) {
            $this->delete();
        } else {
            $this->update(['quantity' => $newQuantity]);
        }
    }
}
