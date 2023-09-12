<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\AppointmentController;


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
    }); 

    Route::group(["prefix" => "patients"], function () {
        Route::get('search', [PatientController::class,'search']);
        
    }); 
    
    Route::group(["prefix" => "appointments"], function () {
        Route::get('get_appointments', [AppointmentController::class,'getAppointments']);
        
    }); 
    
});