<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('meetings', function (Blueprint $table) {
            $table->dropColumn('date');
            $table->dropColumn('duration');

            $table->dateTime('start');
            $table->dateTime('end');
        });
    }

    public function down(): void {
        //
    }
};
