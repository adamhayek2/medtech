<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'staff_id',
        'seen',
        'title',
        'body',
    ];

    public function staff() {
        return $this->belongsTo(Staff::class, 'staff_id');
    }
}
