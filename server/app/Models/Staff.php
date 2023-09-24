<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    use HasFactory;

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function department() {
        return $this->belongsTo(Department::class, 'department_id');
    }

    public function getDepartmentNameAttribute() {
        return $this->department->name;
    }

    public function gender() {
        return $this->belongsTo(Gender::class, 'gender_id');
    }

    public function notifications() {
        return $this->hasMany(Notification::class, 'staff_id');
    }
    
}
