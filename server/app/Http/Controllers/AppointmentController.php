<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Models\Appointment;

class AppointmentController extends Controller {
    public function getAppointments(Request $request) {
        $user = Auth::user();
        
        $appointments = Appointment::where('doctor_id', $user->id)
            ->get()
            ->map(function ($appointment) {
                
                $startDateTime = new \DateTime($appointment->start);
                $formattedStart = $startDateTime->format('D M d Y H:i:s \G\M\TO (e)');
                $endDateTime = new \DateTime($appointment->end);
                $formattedEnd = $endDateTime->format('D M d Y H:i:s \G\M\TO (e)');

                return [
                    'id' => $appointment->id,
                    'title' => $appointment->purpose,
                    'start' => $formattedStart,
                    'end' => $formattedEnd,
                    'patient' => $appointment->patient->name, 
                ];
            });

        return response()->json([
            "status" => "success", 
            "data" => $appointments
        ]);
    }
}
