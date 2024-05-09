<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Signals;
use Illuminate\Http\Request;
use App\Models\UserEmailSend;
use App\Models\SignalRedirect;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use Carbon\Carbon;
use DateTime;
use DateTimeZone;



class SignalController extends Controller
{
    public function getAllSignals(Request $request)
    {
        $token = JWTAuth::parseToken()->getToken();
        $payload = JWTAuth::decode($token);
        $role = $payload['role'];
        $user_id = $payload['user_id'];

        $pageSize = $request->query('pageSize', 10);
        $pageNumber = $request->query('pageNumber', 1);
        $phone = $request->query('phone');
        $category = $request->query('category');
        $dateDelovodenFrom = $request->query('dateDelovodenFrom');
        $dateDelovodenTo = $request->query('dateDelovodenTo');
        $dateEndSignal = $request->query('dateEndSignal');
        $dateFromSignal = $request->query('dateFromSignal');
        $delovoden = $request->query('delovoden');
        $email = $request->query('email');
        $keyWord = $request->query('keyWord');
        $name = $request->query('name');
        $number = $request->query('number');
        $sentTo = $request->query('sentTo');
        $status = $request->query('status');

        $order = $request->query('order');






        if ($role === 1) {

            $signals = Signals::select('signals.*', 'signals.id as signal_id');
        } elseif ($role === 2) {
            $signals = Signals::leftjoin('signal_redirect', 'signals.id', '=', 'signal_redirect.signal_id')
                ->join('user_group', 'user_group.group_id', '=', 'signal_redirect.redirected_group_id')
                ->where('user_group.user_id', $user_id);
        } else {

            $signals = [];
        }

        if ($phone) {
            $signals->where('phone', $phone);
        }
        if ($category) {
            $signals->where('category_id', $category);
        }
        if ($delovoden) {
            $signals->where('delovoden_number', $delovoden);
        }

        if ($email) {
            $signals->where('email', $email);
        }

        if ($keyWord) {
            $signals->where(function ($query) use ($keyWord) {
                $query->where('text', 'like', '%' . $keyWord . '%');
            });
        }

        if ($name) {
            $signals->where(function ($query) use ($name) {
                $query->where('name', 'like', '%' . $name . '%');
            });
        }

        if ($number) {
            $signals->where('random_number', $number);
        }

        if ($sentTo) {
            $signals->join('signal_redirect', 'signals.id', '=', 'signal_redirect.signal_id')
                ->where('signal_redirect.redirected_group_id', $sentTo);
        }

        if ($status) {
            $signals->where('status', $status);
        }

        if ($dateDelovodenFrom) {

            $dateDelovodenFrom = preg_replace('/\s\(.*\)$/', '', $dateDelovodenFrom);
            $dateTime = new DateTime($dateDelovodenFrom);
            $dateTime->setTimezone(new DateTimeZone('Etc/GMT-3'));
            $formattedDate = $dateTime->format('Y-m-d');
            $signals->whereDate('delovoden_date', '>=', $formattedDate);
        }

        if ($dateDelovodenTo) {

            $dateDelovodenTo = preg_replace('/\s\(.*\)$/', '', $dateDelovodenTo);
            $dateTime = new DateTime($dateDelovodenTo);
            $dateTime->setTimezone(new DateTimeZone('Etc/GMT-3'));
            $formattedDate = $dateTime->format('Y-m-d');
            $signals->whereDate('delovoden_date', '>=', $formattedDate);
        }


        if ($dateFromSignal) {
            $dateFromSignal = preg_replace('/\s\(.*\)$/', '', $dateFromSignal);
            $dateTime = new DateTime($dateFromSignal);
            $dateTime->setTimezone(new DateTimeZone('Etc/GMT-3'));
            $formattedDate = $dateTime->format('Y-m-d');
            $signals->whereDate('date_received', '>=', $formattedDate);
        }

        if ($dateEndSignal) {

            $dateEndSignal = preg_replace('/\s\(.*\)$/', '', $dateEndSignal);
            $dateTime = new DateTime($dateEndSignal);
            $dateTime->setTimezone(new DateTimeZone('Etc/GMT-3'));
            $formattedDate = $dateTime->format('Y-m-d');
            $signals->whereDate('date_received', '<=', $formattedDate);
        }




        $signals = $signals->orderByDesc('date_received')
            // ->orderByDesc('id')
            ->paginate($pageSize, ['*'], 'pageNumber', $pageNumber);



        foreach ($signals as $signal) {
            $redirects = SignalRedirect::where('signal_id', $signal->id)->get();
            $signal->redirects = $redirects;

            $uploads = File::where('signal_id', $signal->id)->get();
            $signal->uploads = $uploads;

            $emailsSend = UserEmailSend::where('signal_id', $signal->id)->get();
            $signal->emailsSend = $emailsSend;
        }



        return $signals;
    }


    public function updateSignal(Request $request)
    {
        // $signalStatus = null;
        $signalId = $request->input('signalId');
        $userIdSent = $request->input('userId');
        $selectedAction = $request->input('selectedAction');
        $is_final = false;



        if ($request->input('dateEndSignal')) {
            $is_final = true;
        }

        $signal = Signals::with(['redirects', 'emailSends'])->find($signalId);




        if (!$signal) {

            return response()->json(['error' => 'Signal not found'], 404);
        }

        $signal->delovoden_number = $request->input('delovodenNumber');
        $signal->delovoden_date = $request->input('delovodenDate');
        $signal->category_id = $request->input('selectedCategory');
        $signal->note = $request->input('signalNote');
        $signal->date_end = $request->input('dateEndSignal');
        $signal->is_final = $is_final;

        if ($selectedAction != 0) {
            $signal->status = $selectedAction;
        }

        $signal->save();

        if ($selectedAction == 2) {


            #region  ********* Add members group where signal is redirected 
            $selectedMembers = $request->input('selectedMembers');
            $existingRedirects = SignalRedirect::where('signal_id', $signalId)->pluck('redirected_group_id')->toArray();
            $newMembers = array_diff($selectedMembers, $existingRedirects);

            if (!empty($selectedMembers)) {
                foreach ($newMembers as $memberId) {
                    $redirectSignal = new SignalRedirect();
                    $redirectSignal->signal_id = $signalId;
                    $redirectSignal->redirected_group_id = $memberId;
                    $redirectSignal->created_on = now()->timezone('Europe/Sofia')->format('Y-m-d H:i:s');
                    $redirectSignal->status = $selectedAction;
                    $redirectSignal->redirect_note = $request->input('redirectNote');
                    $redirectSignal->from_user_id = $userIdSent;
                    $redirectSignal->save();
                }
            }
            #endregion
        }

        #region send email to users

        if ($selectedAction == 3) {
            $selectedUsers = ($request->input('selectedUsers'));


            $existingRecords = UserEmailSend::where('signal_id', $signalId)
                ->whereIn('to_user_id', $selectedUsers)
                ->get();

            foreach ($selectedUsers as $userId) {

                if (!$existingRecords->contains('to_user_id', $userId)) {


                    $signalData = [
                        'userId' => $userId, // Replace with the actual user ID attribute from the Signals model
                        'signal' => $signal->signal, // Replace with the actual signal attribute from the Signals model
                    ];


                    $request = new Request($signalData);

                    $emailController = new EmailController();
                    $response = $emailController->sendMailToUser($request);


                    if ($response === 200) {

                        $userEmailSend = new UserEmailSend();
                        $userEmailSend->signal_id = $signalId;
                        $userEmailSend->to_user_id = $userId;
                        $userEmailSend->send_on = now();
                        $userEmailSend->status_email = true;
                        $userEmailSend->send_user_id = $userIdSent;
                        $userEmailSend->save();
                    } else {

                        $userEmailSend = new UserEmailSend();
                        $userEmailSend->signal_id = $signalId;
                        $userEmailSend->to_user_id = $userId;
                        $userEmailSend->status_email = false;
                        $userEmailSend->send_user_id = $userIdSent;
                        $userEmailSend->save();
                    }
                }
            }

            #endregion

        }

        if ($selectedAction == 4) {
            $redirectSignal = new SignalRedirect();
            $redirectSignal->signal_id = $signalId;
            $redirectSignal->created_on = now()->timezone('Europe/Sofia')->format('Y-m-d H:i:s');
            $redirectSignal->redirect_note = $request->input('redirectNote');
            $redirectSignal->from_user_id = $userIdSent;
            $redirectSignal->status = $selectedAction;
            $redirectSignal->save();
        }



        if ($selectedAction == 5) {
            $redirectSignal = new SignalRedirect();
            $redirectSignal->signal_id = $signalId;
            $redirectSignal->created_on = now()->timezone('Europe/Sofia')->format('Y-m-d H:i:s');
            $redirectSignal->redirect_note = $request->input('invalid');
            $redirectSignal->from_user_id = $userIdSent;
            $redirectSignal->status = $selectedAction;
            $redirectSignal->save();
        }



        $signal = Signals::find($signalId);

        $redirects = SignalRedirect::where('signal_id', $signal->id)
            ->orderByDesc('created_on')
            ->get();
        $signal->redirects = $redirects;

        $uploads = File::where('signal_id', $signal->id)->get();
        $signal->uploads = $uploads;

        $emailsSend = UserEmailSend::where('signal_id', $signal->id)
            ->orderByDesc('send_on')
            ->get();
        $signal->emailsSend = $emailsSend;



        return $signal;

        // return $signal;
    }


    public function updateSignalCount(Request $request)
    {



        $signalId = $request->signalId;
        $signal = Signals::find($signalId);

        if ($signal) {
            $signal->is_new_count = 1;
            $signal->save();

            return  200;
        } else {

            return  404;
        }
    }

    public function SignalDetails(Request $request)
    {

        $signalId = $request->route('id');

        $signal = Signals::find($signalId);

        $redirects = SignalRedirect::where('signal_id', $signal->id)
            ->orderByDesc('created_on')
            ->get();
        $signal->redirects = $redirects;

        $uploads = File::where('signal_id', $signal->id)->get();
        $signal->uploads = $uploads;

        $emailsSend = UserEmailSend::where('signal_id', $signal->id)
            ->orderByDesc('send_on')
            ->get();
        $signal->emailsSend = $emailsSend;



        return $signal;
    }
}
