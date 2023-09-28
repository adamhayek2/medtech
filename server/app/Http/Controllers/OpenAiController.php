<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI;


class OpenAIController extends Controller {
    function prompt(Request $request){
        $prompt = 'I have a patient in emergency room';
        $prompt .= ".\nhe is a victim of". $request->diagnosis;
        $prompt .= "\nI want you to generate a report for him in json format";
        $prompt .= "\nThe response should contain medications object wich have the name, dosage, and frequency";
        $prompt .= "\nThe response should contain scans object wich have the name and date";
        $prompt .= "\nThe response should contain blood_tests object wich have the name and date";
        $prompt .= "\nThe response should contain appointments object wich have the appointment_date, reason, notes";
        $prompt .= "\nThe JSON object should be in this format { \"blood_tests\": [ {\"name\": \"\", \"date\":\"\"} ],.......]}.";
        $prompt .= "\nfill the json objects with a prediction from your data";


        $result = OpenAI::completions()->create([
            'max_tokens' => 1024,
            'model' => 'text-davinci-003',
            'prompt' => $prompt,
        ]);

        echo $result['choices'][0]['text'];
    }

    
}
