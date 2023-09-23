<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gender;
use App\Models\Department;
use App\Models\UserType;
use App\Models\BloodType;
use App\Models\Status;

class DataController extends Controller {
    public function getData() {
        $userTypes = UserType::where('type', '!=', 'admin')
        ->get()
        ->map(function ($userType){
            return[
                'id' => $userType->id,
                'name' => $userType->type,
            ];      
        });
        $departments = Department::all(['id', 'name']);
        $genders = Gender::all()->map(function ($gender){
            return[
                'id' => $gender->id,
                'name' => $gender->gender,
            ];      
        });

        $statuses = Status::all();

        $bloodTypes = BloodType::all();

        if(!$userTypes || !$departments || !$genders || !$statuses || !$bloodTypes) return response()->json(['error' => 'error has occured'], 404);

        $data = [
            'userTypes' => $userTypes,
            'departments' => $departments,
            'genders' => $genders,
            'statuses' => $statuses,
            'bloodTypes' => $bloodTypes,
        ];

        return response()->json([
            "status" => "success", 
            "data" => $data
        ], 200);
    }
}
