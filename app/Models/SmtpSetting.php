<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SmtpSetting extends Model
{
    protected $fillable = [
        'smtp_mailer',
        'smtp_scheme',
        'smtp_host',
        'smtp_port',
        'smtp_username',
        'smtp_password',
        'smtp_mail_from_address',
    ];
}
