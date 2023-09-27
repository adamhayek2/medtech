<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AiReport;
use App\Models\Patient;
use App\Models\Image;
use Carbon\Carbon;
use Auth;

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
            $report['full_name'] = $report->patient->name;
            $report['report_data'] = json_decode($report->report_data);
            $report['time'] =  Carbon::parse( $report->created_at)->format('Y-m-d H:i:s');
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
            'gender' => $report->patient->gender->gender, 
            'blood_type' => $report->patient->bloodType->name, 
            'patient_status' => $report->patient->status,
            'patient_name' => $report->patient->name, 
            'created_at' => $report->created_at, 
            'updated_at' => $report->updated_at, 
        ];
            
    
    
        return response()->json([
            "status" => "success", 
            "data" => $formattedResponse
        ]);
    }

    public function approveReport(Request $request) {
        $user = Auth::user();

        $request->validate([
            'report_id' => 'required|integer',
        ]);

        $report = AiReport::find($request->report_id);

        if (!$report) {
            return response()->json(['error' => 'Report not found'], 404);
        }

        $report->update([
            'status' => true,
            'approved_by_doctor_id' => $user->id
        ]);

        return response()->json([
            "status" => "success", 
            "messgae" => "Report Labled Aprroved Successfully"
        ]);
    }

    public function updateReportData(Request $request, $id) {
        $user = Auth::user();

        $report = AiReport::find($id);

        if (!$report) {
            return response()->json(['error' => 'Report not found'], 404);
        }

        $request->validate([
            'report_data' => 'required|json',
        ]);

        $report->update([
            'approved_by_doctor_id' => $user->id,
            'report_data' => $request->report_data,
        ]);

        return response()->json([
            "status" => "success", 
            "messgae" => "Report Updated Successfully"
        ], 200);
    }

    public function create(Request $request) {
        $base64Data = $request->input('data');

        list($type, $data) = explode(';', $base64Data);
        list(, $data) = explode(',', $data);
        $imageData = base64_decode($data);
        $imagePath = public_path('images/') . uniqid() . '.jpg';
        file_put_contents($imagePath, $imageData);

        $report = new AiReport;

        $report->patient_id = Patient::latest()->first()->id;

        $report->save();

        $image = new Image;

        $image->path = $imagePath;
        $image->report_id = $report->id;

        $image->save();

        return response()->json(['message' => 'Image saved successfully'], 201);
    }
    
}
