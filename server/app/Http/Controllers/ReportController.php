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
}
