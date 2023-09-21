<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration { 
    public function up(): void {
        Schema::table('rooms', function (Blueprint $table) {
            $table->dropColumn('number');
    
            $table->integer('patient_id')->nullable();
        });
    }
    
    public function down(): void {
        Schema::table('rooms', function (Blueprint $table) {
            $table->dropColumn('patient_id');

            $table->integer('number');
        });
    }
    
};
