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

        if ($request->has('min_age')) {
            $minAge = $request->input('min_age');
            $minBirthYear = now()->year - $minAge;
            $query->whereYear('date_of_birth', '<=', $minBirthYear);
        }
    
        if ($request->has('max_age')) {
            $maxAge = $request->input('max_age');
            if ($request->has('max_age')) {
                $maxAge = $request->input('max_age');
                $maxBirthYear = now()->year - $maxAge;
                $query->whereYear('date_of_birth', '>=', $maxBirthYear);
            }
        }

        if ($request->has('department')) {
            $departmentId = $request->input('department');
            $query->where('department_id', $departmentId);
        }

        if ($request->has('gender')) {
            $genderId = $request->input('gender');
            $query->where('gender_id', $genderId);
        }

        $staff = $query->get();

        return response()->json([
            "status" => "success", 
            "data" => $staff
        ]);
    }
}
