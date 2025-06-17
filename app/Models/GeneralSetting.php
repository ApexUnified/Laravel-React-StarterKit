<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GeneralSetting extends Model
{
    protected $fillable = ['app_name', 'contact_email', 'contact_number', 'app_main_logo_dark', 'app_main_logo_light', 'app_favicon'];
}
