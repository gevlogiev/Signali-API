<?php

namespace App\Http\Controllers;

use App\Models\SignalRedirect;
use Illuminate\Http\Request;

class RedirectController extends Controller
{
    public function getRedirects(Request $request)  {
        
        $id = $request->route('id');
        $redirects = SignalRedirect::where('signal_id',$id)->get();

        return $redirects;
        

    }

}
