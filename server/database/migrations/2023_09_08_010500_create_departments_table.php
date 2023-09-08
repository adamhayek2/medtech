<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void {
        Schema::create('departments', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });

        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->integer('department_id');
            $table->integer('number');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('departments');
    }
};
