<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AiReport;

class ReportController extends Controller {

    public function getAll() {
    $reports  = AiReport::get();
        
    if(!$reports){
        return response()->json([
            "status" => "success", 
            "message" => "No patients arrived yet"
        ]);
    }

    $reports = $reports->map(function ($report) {
        $report['full_name'] = $report->patientName;
        $report['report_data'] = json_decode($report->report_data);
        return $report;
    });

    return response()->json([
        "status" => "success", 
        "data" => $reports
    ]);
    }

    public function search(Request $request) {
        $searchQuery = $request->input('query');
    
        $reports = AiReport::where('report_data', 'like', '%' . $searchQuery . '%')
                ->get()
                ->map(function ($report) {
                    return [
                        'id' => $report->id,
                        'report_data' => json_decode($report->report_data),
                        'status' => $report->status,
                        'approved_by_doctor_id' => $report->approved_by_doctor_id,
                        'patient' => $report->patient->name, 
                        'created_at' => $report->created_at, 
                        'updated_at' => $report->updated_at, 
                    ];
                });

        return response()->json([
            "status" => "success", 
            "data" => $reports
        ]);
    }

    public function singleReport($id) {
        $report = AiReport::find($id);

        if (!$report) {
            return response()->json(['error' => 'Report not found'], 404);
        }

        $formattedResponse = [
            'id' => $report->id,
            'report_data' => json_decode($report->report_data),
            'status' => $report->status,
            'approved_by_doctor_id' => $report->approved_by_doctor_id,
            'patient' => $report->patient, 
            'patient_status' => $report->patient->patient_status,
            'patient_name' => $report->patient->name, 
            'created_at' => $report->created_at, 
            'updated_at' => $report->updated_at, 
        ];
            
    
    
        return response()->json([
            "status" => "success", 
            "data" => $formattedResponse
        ]);
    }
}
