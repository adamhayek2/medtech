<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Models\Meeting;
use App\Models\Attendee;


class MeetingController extends Controller
{
    public function create(Request $request) {
        $user = Auth::user();

        $request->validate([
            'purpose' => 'required|string',
            'start' => 'required|date',
            'end' => 'required|date',
            'attendees' => 'required|array',
            'attendees.*.staff_id' => 'required|integer',
        ]);

        $meeting = new Meeting;

        $meeting->admin_id = $user->id;
        $meeting->purpose = $request->purpose;
        $meeting->start = $request->start;
        $meeting->end = $request->end;

        $meeting->save();

        foreach ($request['attendees'] as $temp) {
            $attendee = new Attendee;

            $attendee->meeting_id = $meeting->id;
            $attendee->staff_id = $temp['staff_id'];
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Meeting Created Successfully',
        ]);
    }
}
