<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'tenant_id',
        'name',
        'email',
        'password',
        'phone',
        'avatar',
        'email_verified_at',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'two_factor_confirmed_at',
        'is_active',
        'is_suspended',
        'last_login_at',
        'last_login_ip',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_secret',
        'two_factor_recovery_codes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'is_active' => 'boolean',
        'is_suspended' => 'boolean',
        'last_login_at' => 'datetime',
        'two_factor_confirmed_at' => 'datetime',
    ];

    /**
     * Get the tenant that owns the user.
     */
    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    /**
     * Get the user's addresses.
     */
    public function addresses()
    {
        return $this->hasMany(Address::class);
    }

    /**
     * Get the user's orders.
     */
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Get the user's cart.
     */
    public function cart()
    {
        return $this->hasOne(Cart::class);
    }

    /**
     * Get the user's wishlist.
     */
    public function wishlist()
    {
        return $this->hasOne(Wishlist::class);
    }

    /**
     * Get the user's login history.
     */
    public function loginHistory()
    {
        return $this->hasMany(LoginHistory::class);
    }

    /**
     * Get the user's activity logs.
     */
    public function activityLogs()
    {
        return $this->hasMany(ActivityLog::class);
    }

    /**
     * Get the user's reviews.
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Get the user's affiliate profile.
     */
    public function affiliate()
    {
        return $this->hasOne(Affiliate::class);
    }

    /**
     * Check if user is tenant admin.
     */
    public function isTenantAdmin(): bool
    {
        return $this->hasRole('tenant_admin');
    }

    /**
     * Check if user is super admin.
     */
    public function isSuperAdmin(): bool
    {
        return $this->hasRole('super_admin');
    }

    /**
     * Record login activity.
     */
    public function recordLogin(string $ip): void
    {
        $this->update([
            'last_login_at' => now(),
            'last_login_ip' => $ip,
        ]);

        LoginHistory::create([
            'user_id' => $this->id,
            'ip_address' => $ip,
            'user_agent' => request()->userAgent(),
            'login_successful' => true,
        ]);
    }
}
