<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    
    public function up(): void {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->integer('user_type_id');
            $table->string('username')->unique();
            $table->string('password');
            $table->timestamps();

        });

        Schema::create('user_types', function (Blueprint $table) {
            $table->id();
            $table->string('type');
        });

        Schema::create('genders', function (Blueprint $table) {
            $table->id();
            $table->string('gender');
        });

        Schema::create('staff', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->integer('department_id');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->date('date_of_birth');
            $table->text('phone_number');
            $table->integer('gender_id');
            $table->string('major');
            $table->timestamps();
        });

    }

    public function down(): void {
        Schema::dropIfExists('users');
    }
};
