<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\UserType;

class UserTypesTableSeeder extends Seeder {

    public function run(): void {
        $types = [
            'admin',
            'doctor',
            'nurse',
            'receptionist',
        ];

        foreach ($types as $type) {
            UserType::create(['type' => $type]);
        }
    }
}
