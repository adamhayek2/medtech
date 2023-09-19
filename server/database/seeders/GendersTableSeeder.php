<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
Use App\Models\Gender;

class GendersTableSeeder extends Seeder {

    public function run(): void {
        $genders = 
        [
            'Male',
            'Female',
        ];

        foreach ($genders as $gender) {
            Gender::create(['gender' => $gender]);
        }
    }
}
