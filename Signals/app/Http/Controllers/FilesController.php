<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FilesController extends Controller
{
    public function getFile(Request $request)  {
       
        
        $id = $request->route('id');

        if($id ==null){

            $get_files = 'No files';
        }

        $get_files = File::select('uploads.filename','uploads.path', 'uploads.extension', 'uploads.id as file_id')->where('signal_id',$id)->get();


        if(!$get_files){

            $get_files = 'No files';
        }

        return $get_files;

    }
}
