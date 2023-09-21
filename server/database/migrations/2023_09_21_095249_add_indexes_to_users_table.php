<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration { 
    public function up(): void {
        Schema::table('users', function (Blueprint $table) {
            $table->index('username');
            $table->index('password');
        });
    }


    public function down(): void {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['username']);
            $table->dropIndex(['password']);
        });
    }
};
