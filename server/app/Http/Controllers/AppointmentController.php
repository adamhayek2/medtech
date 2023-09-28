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

    public function addAppointments(Request $request){
        $data = json_decode($request->report->getContent());
        $appointments = $data->data->report_data->appointments;

        foreach ($appointments as $temp) {

            $appointment = new Appointment();

            $appointment->doctor_id = $temp->doctor_id;
            $appointment->patient_id = $data->data->patient->id;
            $appointment->start = date("Y-m-d H:i:s", strtotime($temp->start));
            $appointment->end = date("Y-m-d H:i:s", strtotime($temp->end)); 
            $appointment->purpose = $temp->reason;

            $appointment->save();
        }

        return response()->json(['message' => 'Appointments added successfully'], 201);
        
    }
}
