<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class UserGroup extends Model
{
    protected $table = 'user_group';


    public $timestamps = false;

    protected $primaryKey = 'user_id';

}
