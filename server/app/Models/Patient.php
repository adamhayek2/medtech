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

    public function Gender() {
        return $this->belongsTo(Gender::class, 'gender_id');
    }

    public function getGenderNameAttribute() {
        return $this->gender->name;
    }

    public function bloodType() {
        return $this->belongsTo(BloodType::class, 'blood_type_id');
    }
    
    public function getBloodTypeNameAttribute() {
        return $this->bloodType->name;
    }

}
