<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Models\Appointment;

class AppointmentController extends Controller
{
    public function getAppointments(Request $request) {
    $user = Auth::user();
    
    $appointments = Appointment::where('doctor_id', $user->id)
        ->get()
        ->map(function ($appointment) {
            $start = \DateTime::createFromFormat('Y-m-d H:i:s', "{$appointment->start}");
            $end = \DateTime::createFromFormat('Y-m-d H:i:s', "{$appointment->end}");

            return [
                'id' => $appointment->id,
                'title' => $appointment->purpose,
                'start' => "new Date(" . $start->format('Y, m, d, H, i') . ")",
                'end' => "new Date(" . $end->format('Y, m, d, H, i') . ")",
                'patient' => $appointment->patient->name, 
            ];
        });

    return response()->json([
        "status" => "success", 
        "data" => $appointments
    ]);
}
}
