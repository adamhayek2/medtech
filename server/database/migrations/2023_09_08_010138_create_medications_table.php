<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void {
        Schema::create('medications', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('dosage');
        });

        Schema::create('patient_medications', function (Blueprint $table) {
            $table->id();
            $table->integer('report_id');
            $table->integer('patient_id');
            $table->integer('medication_id');
            $table->integer('schedule');
        });
    }

    public function down(): void {
        Schema::dropIfExists('medications');
    }

};
