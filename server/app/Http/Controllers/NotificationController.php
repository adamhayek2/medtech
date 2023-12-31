<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Laravel\Firebase\Facades\Firebase; 
use Kreait\Firebase\Messaging\CloudMessage;
use App\Models\User;
use App\Models\Meeting;
use App\Models\Notification;
use Auth;

class NotificationController extends Controller {

    protected $notification;
    public function __construct() {
        $this->notification = Firebase::messaging();
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

    public function reportNotifications(Request $request) {
        $title = $request->title;
        $body = $request->body;

        $users = User::where('user_type_id', 2 );
                        
        
        $tokens = $users->pluck('fcm_token')->toArray();

        $temps = $users->get();
        foreach ($temps as $temp) {
            $notification = new Notification;

            $notification->staff_id = $temp->staff->id;
            $notification->seen = false;
            $notification->title = $title;
            $notification->body = $body;
    
            $notification->save();
        }

        $message = CloudMessage::fromArray([
            'notification' => [
                'title' => $title,
                'body' => $body
                ],
            ]);
        

        $response = $this->notification->sendMulticast($message, $tokens);

        return response()->json([
            'status' => 'success',
            'message' => 'Notification sent',
        ], 200);
    }

    public function meetingNotification(Request $request) {
        $meeting_id = $request->meeting_id;
        $title = $request->title;
        $body = $request->body;

        $meeting = Meeting::find($meeting_id);

        $tokens = $meeting->attendees->map(function ($attendee) {
            return $attendee->staff->user;
        })->pluck('fcm_token')->toArray();

        $message = CloudMessage::fromArray([
            'notification' => [
                'title' => $title,
                'body' => $body
                ],
            ]);
        

        $response = $this->notification->sendMulticast($message, $tokens);

        return response()->json([
            'status' => 'success',
            'message' => 'Notification sent',
        ], 200);
    }

    public function forgotPasswordNotification(Request $request) {
        $request->validate([
            'username' => 'required|string|max:255',
        ]);
        
        $title = $request->usermame;
        $body = 'forgot his password, please reset it';

        $users = User::where('user_type_id', 1);

        $token = $user->fcm_token;

        $message = CloudMessage::fromArray([
            'token' => $token,
            'notification' => [
                'title' => $title,
                'body' => $body
                ],
            ]);
        $this->notification->send($message);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Notification sent',
        ], 200);
    }

    public function getNotifications() {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $notifications = Notification::where('staff_id', $user->staff->id)->get();

        $message = $notifications->toArray();

        $notifications->each(function ($notification) {
            $notification->update(['seen' => true]);
        });

        return response()->json([
            'status' => 'success',
            'data' => $message,
        ], 200);
    }
    
}
