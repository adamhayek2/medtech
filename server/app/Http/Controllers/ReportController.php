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
    
        $reports = AiReport::where(function ($query) use ($searchQuery) {
                        $query->where('patientName', 'like', '%' . $searchQuery . '%')
                        ->orwhere('report_data', 'like', '%' . $searchQuery . '%');
                    })
                    ->get();
    
        return response()->json(['reports' => $reports]);
    }
}
