<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserGroup;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function getAllUsers()
    {
        $users = User::select(
            'users.id as userId',
            'users.username as userName',
            'users.email as userEmail',
            'users.name as userRealName',
            'users.active_status as activeStatus',
            'users.role as userRole',
            'users.created_at as createdOn',
            'users.updated_at as updatedOn'
        )
            ->leftJoin('user_group', 'users.id', '=', 'user_group.user_id')
            ->leftJoin('groups', 'groups.id', '=', 'user_group.group_id')
            ->groupBy('users.id')
            ->get();


        foreach ($users as $user) {

            $groupIds = User::select('groups.id')
                ->leftJoin('user_group', 'users.id', '=', 'user_group.user_id')
                ->leftJoin('groups', 'groups.id', '=', 'user_group.group_id')
                ->where('users.id', $user->userId)
                ->pluck('groups.id')
                ->implode(', ');
            $user->groupIds = $groupIds;
        }

        return $users;
    }


    public function createUser(Request $request)
    {
        $user = new User();
        $user->username = $request->input('userName');
        $user->name = $request->input('userRealName');
        $user->email = $request->input('userEmail');
        $user->active_status = $request->input('activeStatus');
        $user->is_on_duty = $request->input('onDuty');
        $user->password = Hash::make($request->input('userPasswordRetake'));
        $user->save();


        $userId = $user->id;


        $selectedGroups = $request->input('selectedGroups');


        foreach ($selectedGroups as $groupId) {
            $userGroup = new UserGroup();
            $userGroup->user_id = $userId;
            $userGroup->group_id = $groupId;
            $userGroup->save();
        }

        return response()->json($userId, 201);
    }




    public function updateUser(Request $request)
    {

        return 'User is updated';
    }
}
