<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Signals;
use Illuminate\Http\Request;

class ExternalSignalsController extends Controller
{
    public function create(Request $request)
    {

       
        $signal = new Signals;

        $signal->name = $request->input('name');
        $signal->email = $request->input('email');
        $signal->phone = $request->input('phone');
        $signal->location = $request->input('location');
        $signal->topic = $request->input('topic');
        $signal->text = $request->input('text');
        $signal->random_number = $this->generateRandom();
        $signal->source = 1;
        $signal->topic = $request->input('topic');
        $signal->category_id = $request->input('category');
        $signal->status = 1; // plouchen


        $signal->date_received = now()->timezone('Europe/Sofia')->format('Y-m-d H:i:s');

        $signal->save();


        if ($request->hasFile('file1')) {
            $file = $request->file('file1');
            $extension = $file->getClientOriginalExtension();
            $customPath = public_path('uploads');

            $filename = uniqid() . '_' . $file->getClientOriginalName();
            $file->move($customPath, $filename);
            $fileRecord = new File();
            $fileRecord->filename = $filename;
            $fileRecord->extension = $extension;
            $fileRecord->path = '/uploads/' . $filename;
            $fileRecord->signal_id = $signal->id;
            $fileRecord->save();
        }



        if ($request->hasFile('file2')) {
            $file = $request->file('file2');
            $extension = $file->getClientOriginalExtension();
            $customPath = public_path('uploads');

            $filename = uniqid() . '_' . $file->getClientOriginalName();
            $file->move($customPath, $filename);
            $fileRecord = new File();
            $fileRecord->filename = $filename;
            $fileRecord->extension = $extension;
            $fileRecord->path = '/uploads/' . $filename;
            $fileRecord->signal_id = $signal->id;
            $fileRecord->save();
        }


        //  Add logic to send email to admin and to user   $request->input('email') with number of signal $this->generateRandom();
        $dataForEmail = [

            'randomNumber' => $this->generateRandom(),
            'signalDate' =>  now()->timezone('Europe/Sofia')->format('Y-m-d H:i:s'),
            'signalId' =>  $signal->id,
            'userEmail' =>  $request->input('email'),
        ];

        $request = new Request($dataForEmail);


        $emailController = new EmailController();
        $response = $emailController->SendMailNewSignal($request);



        return 200;
    }


    public function generateRandom()
    {

        $randomCode = mt_rand(10000000, 99999999);


        $codeExists = $this->checkIfExistsInDB($randomCode);


        while ($codeExists) {
            $randomCode = mt_rand(10000000, 99999999);
            $codeExists = $this->checkIfExistsInDB($randomCode);
        }


        return $randomCode;
    }

    private function checkIfExistsInDB($code)
    {

        return Signals::where('random_number', $code)->exists();
    }
}
