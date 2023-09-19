<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AiReport;
use App\Models\Patient;

class AdminController extends Controller
{
    public function dashboard() {
        $todaysReports = AiReport::whereDate('created_at', now()->toDateString());
        $reportsTodayCount = $todaysReports->count();
        
        $mostRepeatedLabel = AiReport::select('label')
            ->groupBy('label')
            ->orderByRaw('COUNT(*) DESC')
            ->limit(1)
            ->value('label');

        $todaysPatients = Patient::whereDate('updated_at', now()->toDateString())->get();
        $timeDifferences = [];

        foreach ($todaysPatients as $patient) {
            $report = AiReport::find($patient->id);

            if ($report) {
                $timeDifference = $patient->updated_at->diffInMinutes($report->created_at);
                $timeDifferences[] = [
                            'x' => $patient->name,
                            'y' => $timeDifference,
                ];
            }
        }

        $formattedTimeDifferences = $timeDifferences[] = [
            'id' => '1', 
            'data' => $timeDifferences,
        ];

        return response()->json([
            'status' => 'success',
            'data' => [
                'reportsTodayCount' => $reportsTodayCount,
                'mostRepeatedLabel' => $mostRepeatedLabel,
                'timeDifferences' => $formattedTimeDifferences,
            ],
        ], 200);
    }
}
