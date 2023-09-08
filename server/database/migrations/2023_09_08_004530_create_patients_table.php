<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->integer('first_name');
            $table->integer('last_name');
            $table->integer('age');
            $table->integer('gender_id');
            $table->text('phone_number');
            $table->integer('status_id');
            $table->integer('blood_type_id');
        });

        Schema::create('blood_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });

        Schema::create('statuses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });
    }

    public function down(): void {
        Schema::dropIfExists('patients');
    }
};
