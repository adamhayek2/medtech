<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Patient;
use App\Models\AiReport;
use Illuminate\Support\Facades\Http;
use App\Models\Room;
use Carbon\Carbon;

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
            $patient['status'] = $patient->status_name;
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

    public function create(Request $request) {

        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'age' => 'required|integer',
            'gender_id' => 'required|integer',
            'phone_number' => 'required|string',
            'status_id' => 'required|integer',
            'blood_type_id' => 'required|integer',
        ]);

        $room = Room::whereNull('patient_id')->first();

        if (!$room) {
            return response()->json([
                'status' => 'error',
                'message' => 'No available rooms at the moment.',
            ], 422);
        }

        $patient = new Patient;

        $patient->first_name = $request->first_name;
        $patient->last_name = $request->last_name;
        $patient->age = $request->age;
        $patient->gender_id = $request->gender_id;
        $patient->phone_number = $request->phone_number;
        $patient->status_id = $request->status_id;
        $patient->blood_type_id = $request->blood_type_id;

        $patient->save();

        $room->patient_id = $patient->id;
        $room->save();
        
        $url = 'http://192.168.48.19/goto_room';


        $data = [
            'room' => $room->id,
        ];

        $response = Http::post($url, $data);

        return response()->json([
            'status' => 'success',
            'data' => $patient,
            'robot' => 'Ther Robot is going to room'. $room->id 
        ]);
    }
    
    public function getReports($id) {
        $patient = Patient::find($id);

        if(!$patient){
            return response()->json([
                "status" => "success", 
                "message" => "This patient doesn't exist"
            ]);
        }

        $report = AiReport::where('patient_id', $patient->id)
        ->get()
        ->map(function ($report) {
            return [
                'id' => $report->id,
                'report_data' => json_decode($report->report_data),
                'status' => $report->status,
                'approved_by_doctor_id' => $report->approved_by_doctor_id,
                'full_name' => $report->patient->name, 
                'time' => Carbon::parse( $report->created_at)->format('Y-m-d H:i:s'),
                'created_at' => $report->created_at, 
                'updated_at' => $report->updated_at, 
            ];
        });;

        if(!$report){
            return response()->json([
                "status" => "success", 
                "message" => "No reports for this patient"
            ]);
        }

        return response()->json([
            "status" => "success", 
            "data" => $report
        ], 200);

    }
}
