<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatusesTableSeeder extends Seeder {

    public function run(): void {
        $statuses = [
            'Post-Op',
            'Pre-Op',
            'ICU',
            'Stable',
            'Critical',
            'Discharged',
            'Admitted',
            'Palliative',
            'Chronic',
        ];

        foreach ($statuses as $status) {
            Status::create(['name' => $status]);
        }
    }
}
