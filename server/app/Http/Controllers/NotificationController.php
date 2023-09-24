<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Laravel\Firebase\Facades\Firebase; 
use Kreait\Firebase\Messaging\CloudMessage;

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

    public function casting(Request $request) {
        $title = $request->input('title');
        $body = $request->input('body');

        $tokens = [
            'fdyjxwUDCevoB2mmKEsPIv:APA91bEGgZG0lNMDC3J0_ofEXabuZS2TTHXm_D4t6iL8p468dtYoY8xxhYxkZROKd_K4mz_65gAKoG7S3QxlZvHXlrbP1JC-ukX9l5wofRNaXhSeYRYcSIZwgGdYSAFEiYLxv-oFDCHE',
        ];

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
