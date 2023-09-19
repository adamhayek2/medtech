<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Status;

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
