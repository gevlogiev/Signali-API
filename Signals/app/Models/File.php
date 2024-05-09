<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $table = 'uploads';


    public $timestamps = false;

    protected $primaryKey = 'id';
}
