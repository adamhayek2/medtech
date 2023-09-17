<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AiReport;

class AdminController extends Controller
{
    public function dashboard() {
        $reportsTodayCount = AiReport::whereDate('created_at', now()->toDateString())->count();

        $mostRepeatedLabel = AiReport::select('label')
            ->groupBy('label')
            ->orderByRaw('COUNT(*) DESC')
            ->limit(1)
            ->value('label');

        return response()->json([
            'reportsTodayCount' => $reportsTodayCount,
            'mostRepeatedLabel' => $mostRepeatedLabel,
        ]);
    }
}
