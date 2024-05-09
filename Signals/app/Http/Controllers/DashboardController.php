<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Tymon\JWTAuth\JWT;
use App\Models\Signals;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class DashboardController extends Controller
{
    public function dashboardData(Request $request)
    {

        // $authorizationHeader = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzEzNzg0NjYxLCJleHAiOjE3MTM3ODgyNjEsIm5iZiI6MTcxMzc4NDY2MSwianRpIjoiM2FOSDlsdjRsV292blJ2dCIsInN1YiI6IjUiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwiVVNFUk5BTUUiOiJ0ZXN0MSJ9.1NeU6_bxh7A-D5d96F39GQzWrSJMIy6zqIkElgR7E_M';

        // if ($authorizationHeader) {
        //     // Extract the JWT token from the authorization header
        //     $token = substr($authorizationHeader, 7); // Remove "Bearer " prefix
    
        //     // Decode the JWT token
        //     $decodedToken = JWTAuth::getPayload($token);
    
        //     // Now you can access the decoded token
        //     // For example, you can retrieve the expiration date
        //     $expirationDate = $decodedToken['exp'];
    
        //     // You may want to convert the expiration timestamp to a human-readable format
        //     $expirationDateReadable = date('Y-m-d H:i:s', $expirationDate);
    
        //     // Return the decoded token or perform further processing
        //     return [
        //         'decodedToken' => $decodedToken,
        //         'expirationDate' => $expirationDateReadable
        //     ];
        // }
        
        $year = Carbon::now()->year;
        $month = Carbon::now()->month;
        $today = Carbon::today();

        $signalsDay = Signals::whereDate('date_received', $today)->count();
        $signalsMonth = Signals::whereYear('date_received', $year)->whereMonth('date_received', $month)->count();
        $signalsYear = Signals::whereYear('date_received', $year)->count();

        $lastFiveSignals = Signals::orderBy('date_received', 'desc')
        ->orderByDesc('id')
        ->select('random_number','name','source','topic','status')
        ->take(5)
        ->get();



      
        return response()->json([
            'signalsDay' => $signalsDay,
            'signalsMonth' => $signalsMonth,
            'signalsYear' => $signalsYear,
            'lastFiveSignals' => $lastFiveSignals,
        ]);
    }
}
