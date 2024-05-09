<?php

namespace App\Http\Controllers;



use App\Mail\MailServer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

use App\Models\User;

class EmailController extends Controller
{
    public function SendMailNewSignal(Request $request)
    {
        $randomNumber = $request->input('randomNumber');
        $signalDate= $request->input('signalDate');
        $signalId=  $request->input('signalId');
        $userEmail=  $request->input('userEmail');

        $mode = 1; // External signal to external User
        $theme = 'Потвърждение за получен сигнал';
        $sender = 'signali@uslugi.io';
        $text = 'Вашият сигнал е заведен в системата с електронен номер ' . $randomNumber. ' от дата '  . $signalDate . 'г. Може да проследите състоянието на подаденият сигнал на www.signal.usligi.io, като въведете вашият номер.';


        $mail = new MailServer($theme, $sender, $userEmail, $text,$mode);
        Mail::to($userEmail)->send($mail);
        return 200;
    }

    public function SendMailAddDelovodeen(Request $request)
    {
        return ('Send signal when add a numbrer and date to signal');
    }


    public function SendMailStatusChange(Request $request)
    {
        return ('Send email to group users where signal is with status 1');
    }



    public function SendMailToUser(Request $request)
    {

        $userId = $request->input('userId');
        $signal = $request->input('signal');

        $userEmail = User::findOrFail($userId);

        $mode = 2; // Send to user in system
        $sender = 'g.evlogiev@is-bg.net';
        $theme = 'Signal Notification';
        $text = $signal;

        $mail = new MailServer($theme, $sender, $userEmail->email, $text, $mode);
        Mail::to($userEmail->email)->send($mail);


        return 200;
    }


    public function SendMailSignalEnd(Request $request)
    {
        return ('Send email to user with details for end of signals');
    }
}
