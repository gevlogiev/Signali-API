<?php

namespace App\Http\Controllers;

use App\Models\Groups;
use Illuminate\Http\Request;

class GroupsController extends Controller
{
    public function getAllGroups()
    {
        $groups = Groups::select(
            'id as groupId',
            'name as groupName',
            'description as groupDescription',
            'phone as groupPhone',
            'active_status as activeStatus',
            'is_on_duty as onDuty',
            'created_on as createdOn'
        )->get();
        return $groups;
    }

    public function createGroup(Request $request)
    {
        
        $group = new Groups();
        $group->name = $request->input('groupName');
        $group->description = $request->input('groupDescription');
        $group->phone = $request->input('groupPhone');
        $group->active_status = $request->input('activeStatus');
        $group->is_on_duty = $request->input('onDuty');
        $group->save();

         return response()->json($group->id, 201);
    }

    public function updateGroup(Request $request, $id)
    {
        $group = Groups::findOrFail($id);

        $group->name = $request->input('groupName');
        $group->description = $request->input('groupDescription');
        $group->phone = $request->input('groupPhone');
        $group->active_status = $request->input('activeStatus');
        $group->is_on_duty = $request->input('onDuty');
        $group->save();

        return response()->json(['message' => 200], 200);
    }
}
