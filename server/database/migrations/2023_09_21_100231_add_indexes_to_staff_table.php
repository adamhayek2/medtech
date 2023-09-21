<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration { 
    public function up(): void {
        Schema::table('staff', function (Blueprint $table) {
            $table->index('date_of_birth');
            $table->index('department_id');
            $table->index('gender_id');
            $table->index('first_name');
            $table->index('last_name');
            $table->index('email');
        });
    }
 
    public function down(): void {
        Schema::table('staff', function (Blueprint $table) {
            $table->dropIndex(['date_of_birth']);
            $table->dropIndex(['department_id']);
            $table->dropIndex(['gender_id']);
            $table->dropIndex(['first_name']);
            $table->dropIndex(['last_name']);
            $table->dropIndex(['email']);
        });
    }
};
