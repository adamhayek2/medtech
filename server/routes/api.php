<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OpenAiController;


Route::group(["prefix" => "guest"], function() {

    Route::get('unauthorized', [AuthController::class, 'unauthorized']) -> name("unauthorized");
    Route::post('login', [AuthController::class,'login']);
    Route::post('register', [AuthController::class,'register']);

});


Route::group(["middleware" => "auth:api"], function() {
    
    Route::group(["prefix" => "user"], function () {
        Route::post('logout', [AuthController::class,'logout']);
        Route::post('refresh', [AuthController::class,'refresh']);
        Route::get('all_patients', [PatientController::class,'getAll']);
        Route::get('all_reports', [ReportController::class,'getAll']);
        Route::get('get_data', [DataController::class, 'getData']);
        Route::get('all_notifications', [NotificationController::class, 'getNotifications']);
    }); 

    Route::group(["prefix" => "patients"], function () {
        Route::get('search', [PatientController::class,'search']);
        Route::get('/{id}/get_reports', [PatientController::class,'getReports']);
        Route::post('add', [PatientController::class,'create']);
        
    }); 
    
    Route::group(["prefix" => "reports"], function () {
        Route::post("add/", [AppointmentController::class, 'addAppointments']);
        Route::post("open_ai/", [OpenAIController::class, 'prompt']);
        Route::get('/search', [ReportController::class,'search']);
        Route::get("/{id?}", [ReportController::class, "singleReport"]);
        Route::post("/create", [ReportController::class, "create"]);
    }); 
    
    Route::group(["prefix" => "appointments"], function () {
        Route::get('get_appointments', [AppointmentController::class,'getAppointments']);
        
    }); 
    
    Route::group(["middleware" => "auth.admin", 'prefix' => 'admin'], function(){
        Route::get('dashboard', [AdminController::class,'dashboard']);
        Route::get('get_staff', [StaffController::class,'getStaff']);
        Route::post('add_staff', [StaffController::class,'add']);
        Route::post('edit_staff/{id?}', [StaffController::class,'edit']);
        Route::get('staff_profile/{id?}', [StaffController::class,'singleStaff']);
        Route::get('create_meeting', [MeetingController::class,'create']);
    }); 

    Route::group(["middleware" => "auth.doc", 'prefix' => 'doctor'], function(){
        Route::post('report/{id}/update_report_data', [ReportController::class,'updateReportData']);
    }); 
    
});