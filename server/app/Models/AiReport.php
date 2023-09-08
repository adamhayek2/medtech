<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AiReport extends Model
{
    use HasFactory;

    public function patient() {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function getPatientNameAttribute() {
        $patient = $this->patient;

        if ($patient) {
            return "{$patient->first_name} {$patient->last_name}";
        } else {
            return null; 
        }
    }
}
