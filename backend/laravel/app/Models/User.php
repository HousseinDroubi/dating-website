<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use app\Models\Blocker;
use app\Models\Chat;
use app\Models\Favorite;
use app\Models\Interester;


class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'username',
        'email',
        'password',
        'gender',
        'bio',
        'age',
        'location',
        'image',
        'interested',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function Blocker(){
        return $this->hasMany(Blocker::class,"blocker_id");
    }
    
    public function Chat(){
        return $this->hasMany(Chat::class,"chat_id");
    }
    
    public function Favorite(){
        return $this->hasMany(Favorite::class,"favorite_id");
    }

    public function Interester(){
        return $this->hasMany(Interester::class,"interester_id");
    }
}
