<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Signals extends Model
{
    protected $table = 'signals';

    public $timestamps = false;

    protected $primaryKey = 'id';

    public function redirects()
    {
        return $this->hasMany(SignalRedirect::class, 'signal_id', 'id');
    }

    public function emailSends()
    {
        return $this->hasMany(UserEmailSend::class, 'signal_id', 'id');
    }
}