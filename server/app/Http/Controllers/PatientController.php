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
                        ->get();

        return response()->json([
            "status" => "success", 
            "data" => $patients
        ]);
    }
}
