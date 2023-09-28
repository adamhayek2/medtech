<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AiReport extends Model {
    use HasFactory;

    protected $fillable = [
        'report_data',
    ];

    public function patient() {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function status() {
        return $this->belongsTo(Status::class, 'status');
    }

    public function image() {
        return $this->hasOne(Image::class, 'report_id');
    }
}
