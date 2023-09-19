<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
Use App\Models\Department;

class DepartmentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $departments = [
            'Emergency',
            'Outpatient',
            'Cardiology',
            'Neurology',
            'Orthopedics',
            'Oncology',
            'Pediatrics',
            'Gynecology',
        ];

        foreach ($departments as $department) {
            Department::create(['name' => $department]);
        }
    }
}
