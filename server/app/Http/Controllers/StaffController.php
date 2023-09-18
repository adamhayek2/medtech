<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Staff;

class StaffController extends Controller
{
    public function getStaff() {
        $staff = Staff::with(['user.userType', 'department', 'gender'])->get();

        return response()->json([
            "status" => "success", 
            "data" => $staff
        ]);
    }
}
