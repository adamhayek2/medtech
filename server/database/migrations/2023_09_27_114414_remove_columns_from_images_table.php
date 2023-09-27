<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration { 
    public function up(): void {
        Schema::table('images', function (Blueprint $table) {
            $table->dropColumn('imageable_id');
            $table->dropColumn('imageable_type');
        });
    }
 
    public function down(): void {
        Schema::table('images', function (Blueprint $table) {
            //
        });
    }
};
