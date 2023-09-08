<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void {
        Schema::create('ai_reports', function (Blueprint $table) {
            $table->id();
            $table->json('report_data');
            $table->boolean('status');
            $table->integer('approved_by_doctor_id');
            $table->integer('patient_id');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('reports');
    }
};
