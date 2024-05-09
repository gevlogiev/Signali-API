<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Contracts\Providers\JWT;


class AuthController extends Controller
{

    public function login(Request $request)
    {

        $username = $request->input('username');
        $password = $request->input('password');

        $getUser =  User::where('username', $username)->first();

        if ($getUser) {

            if ($getUser && Hash::check($password, $getUser->password)) {

                $user = $getUser;
                $token = JWTAuth::fromUser($user);

                $tokenParts = explode('.', $token);
                $tokenPayload = base64_decode($tokenParts[1]);
                $payload = json_decode($tokenPayload, true);
                $expirationTimestamp = $payload['exp'];
                $expirationTimestamp += 3 * 60 * 60;
                $expirationDateReadable = date('Y-m-d H:i:s', $expirationTimestamp);

                $getUserGroups = User::select('groups.id', 'groups.name')
                    ->join('user_group', 'user_group.user_id', '=', 'users.id')
                    ->join('groups', 'groups.id', '=', 'user_group.group_id')
                    ->where('groups.active_status', true)
                    ->where('users.id', $user->id)
                    ->get();



                return response()->json(['status' => 'success', 'username' => $username, 'name' => $user->name, 'accessToken' => $token, 'id' => $user->id, 'userType' => $user->type, 'groupMember' => $getUserGroups, 'expDate' => $expirationDateReadable]);
            } else {
                return response()->json(['status' => 'error', 'message' => 'Invalid credentials']);
            }
        }
        return response()->json(['status' => 'error', 'message' => 'Invalid credentials']);
    }




    public function logout(Request $request)
    {

        return response()->json(['message' => 'Successfully logged out']);
    }
}
