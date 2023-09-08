<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    public function getNameAttribute(){
        return implode(" ", [$this->first_name, $this->last_name]);
    }

    public function status() {
        return $this->belongsTo(Status::class, 'status_id');
    }
    
    public function getPatientStatusAttribute() {
        return $this->status->name;
    }
}
