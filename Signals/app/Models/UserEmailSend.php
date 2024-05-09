<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class UserEmailSend extends Model
{
    protected $table = 'user_email_send';


    public $timestamps = false;

    protected $primaryKey = 'id';
}
