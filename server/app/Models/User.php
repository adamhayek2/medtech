<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject {
    use HasFactory, Notifiable;

    protected $fillable = [
        'user_type_id',
        'name',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier() {
        return $this->getKey();
    }

    public function getJWTCustomClaims() {
        return [];
    }

    public function userType() {
        return $this->belongsTo(UserType::class, 'user_type_id');
    }

    public function getUserTypeTypeAttribute(){
        return $this->userType->type;
    }
    
    public function reports() {
        return $this->hasMany(AiReport::class, 'patient_id');
    }

    public function staff() {
        return $this->hasOne(Staff::class, 'user_id');
    }
}
