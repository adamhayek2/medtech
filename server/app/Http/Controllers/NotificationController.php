<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Laravel\Firebase\Facades\Firebase; 
use Kreait\Firebase\Messaging\CloudMessage;
use App\Models\User;
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

        $tokens = User::whereHas('userType', function ($query) {
        $query->where('type', 'doctor');
        })
        ->whereHas('staff', function ($query) {
        $query->whereHas('department', function ($subQuery) {
            $subQuery->where('name', 'emergency');
        });
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
    
}
