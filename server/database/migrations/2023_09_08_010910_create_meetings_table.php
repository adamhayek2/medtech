<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void {
        Schema::create('meetings', function (Blueprint $table) {
            $table->id();
            $table->integer('admin_id');
            $table->string('purpose');
            $table->dateTime('date');
            $table->time('duration');
        });

        Schema::create('attendees', function (Blueprint $table) {
            $table->id();
            $table->integer('meeting_id');
            $table->integer('staff_id');
        });
    }

    public function down(): void {
        Schema::dropIfExists('meetings');
    }
};
