<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Staff;
use Carbon\Carbon;

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

        $staff = $query->get()->map(function ($temp) {
            $temp['hired_at'] =  Carbon::parse( $temp->created_at)->format('Y-m-d');
            return $temp;
        });;

        return response()->json([
            "status" => "success", 
            "data" => $staff
        ]);
    }

    public function add(Request $request) {
        $request->validate([
            'department_id' => 'required|integer',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email',
            'date_of_birth' => 'required|date',
            'phone_number' => 'required|string',
            'gender_id' => 'required|integer',
            'major' => 'required|string',
            'user_type_id' => 'required|integer',
            'username' => 'required|string|max:255',
            'password' => 'required|string|min:6',
        ]);

        if($request->user_type_id == 1) {
            return response()->json([
                "status" => "error", 
                "message" => "Cannot add an admin, please contact your it professional"
            ], 422 );
        }

        try {
            $register = app('App\Http\Controllers\AuthController')->register($request);
            $registerData = $register->getData(); 
        }catch(\Exception $e){
            return response()->json([
                "status" => "error", 
                "message" => $e->getMessage()
            ], 406 );
        }

        $staff = new Staff;

        $staff->user_id = $registerData->data->id;
        $staff->department_id = $request->department_id;
        $staff->first_name = $request->first_name;
        $staff->last_name = $request->last_name;
        $staff->email = $request->email;
        $staff->date_of_birth = $request->date_of_birth;
        $staff->phone_number = $request->phone_number;
        $staff->gender_id = $request->gender_id;
        $staff->major = $request->major;
        
        $staff->save();

        return response()->json([
            "status" => "success", 
            "data" => $staff
        ]);
    }

    public function singleStaff($id) {
        $staff = Staff::with(['user.userType', 'department', 'gender'])
        ->find($id);

        if (!$staff) {
            return response()->json([
                "status" => "error", 
                "message" => "Couldn't find Empoyee"
            ], 404 );
        }

        $staff['hired_at'] = Carbon::parse($staff->created_at)->format('Y-m-d');

        return response()->json([
            "status" => "success", 
            "data" => $staff
        ], 200);
    }
}
