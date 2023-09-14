<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller {

    public function unauthorized(Request $request) {
        return response()->json([
            'status' => 'Error',
            'message' => 'Unauthorized',
        ], 401);
    }

    public function login(Request $request) {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('username', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();
        $user->token = $token;
        $userTypeName = $user->user_type_type;
        return response()->json([
                'status' => 'success',
                'data' => $user,
            ]);

    }

    public function register(Request $request){
        $request->validate([
            'user_type_id' => 'required|integer',
            'username' => 'required|string|max:255',
            'password' => 'required|string|min:6',
        ]);

        $user = new User;

        $user->user_type_id = $request->user_type_id;
        $user->username = $request->username;
        $user->password = Hash::make($request->password);
        
        $user->save();

        $token = Auth::login($user);
        $user->token = $token;
        return response()->json([
            'status' => 'success',
            'data' => $user,
        ]);
    }

    public function logout() {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh() {
        $user = Auth::user();
        $user->token = Auth::refresh();
        return response()->json([
            'status' => 'success',
            'data' => $user,
        ]);
    }
    
}