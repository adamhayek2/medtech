<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Laravel\Firebase\Facades\Firebase; 
use Kreait\Firebase\Messaging\CloudMessage;
use Auth;
use App\Models\AiReport;
use Carbon\Carbon;

class ReportController extends Controller {
       
    protected $notification;
    public function __construct()
    {
        $this->notification = Firebase::messaging();
    }

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

    public function notification(Request $request) {
        $FcmToken = 'fdyjxwUDCevoB2mmKEsPIv:APA91bEGgZG0lNMDC3J0_ofEXabuZS2TTHXm_D4t6iL8p468dtYoY8xxhYxkZROKd_K4mz_65gAKoG7S3QxlZvHXlrbP1JC-ukX9l5wofRNaXhSeYRYcSIZwgGdYSAFEiYLxv-oFDCHE';
        $title = $request->input('title');
        $body = $request->input('body');
        $message = CloudMessage::fromArray([
        'token' => $FcmToken,
        'notification' => [
            'title' => $title,
            'body' => $body
            ],
        ]);
        $this->notification->send($message);

        return response()->json([
            "status" => "success", 
            "messgae" => "sent"
        ], 200);
    }
}
