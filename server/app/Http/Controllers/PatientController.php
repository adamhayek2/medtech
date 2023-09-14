<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Patient;

class PatientController extends Controller {

    public function getAll(){

        $patients  = Patient::get();
        
        if(!$patients){
            return response()->json([
                "status" => "success", 
                "message" => "No patients arrived yet"
            ]);
        }

        $patients = $patients->map(function ($patient) {
            $patient['full_name'] = $patient->name;
            $patient['status'] = $patient->patient_status;
            return $patient;
        });

        return response()->json([
            "status" => "success", 
            "data" => $patients
        ]);
    }

    public function search(Request $request) {
        $searchQuery = $request->input('query');
        
        $patients = Patient::where(function ($query) use ($searchQuery) {
                            $query->where('first_name', 'like', '%' . $searchQuery . '%')
                            ->orWhere('last_name', 'like', '%' . $searchQuery . '%');
                        })
                        ->get()
                        ->map(function ($patient) {
                            return [
                                'id' => $patient->id,
                                'age' => $patient->age,
                                'blood_type_id' => $patient->blood_type_id,
                                'gender_id' => $patient->gender_id,
                                'full_name' => $patient->name, 
                                'status' => $patient->status, 
                                'status_id' => $patient->status_id, 
                                'phone_number' => $patient->phone_number, 
                            ];
                        });
                        
        return response()->json([
            "status" => "success", 
            "data" => $patients
        ]);
    }
}
