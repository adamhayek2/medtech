<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Staff;

class StaffController extends Controller
{
    public function getStaff(Request $request) {
        $query = Staff::with(['user.userType', 'department', 'gender']);

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($query) use ($search) {
                $query->where('first_name', 'like', "%$search%")
                      ->orWhere('last_name', 'like', "%$search%")
                      ->orWhere('email', 'like', "%$search%");
            });
        }

        $staff = $query->get();

        return response()->json([
            "status" => "success", 
            "data" => $staff
        ]);
    }
}
