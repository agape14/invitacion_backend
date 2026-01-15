<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invitado extends Model
{
    protected $fillable = [
        'nombres_completos',
        'cantidad_adultos',
        'cantidad_ninos',
        'edades_ninos',
        'requiere_cochera',
        'ip_address',
        'user_agent',
    ];

    protected $casts = [
        'edades_ninos' => 'array',
        'requiere_cochera' => 'boolean',
        'cantidad_adultos' => 'integer',
        'cantidad_ninos' => 'integer',
    ];
}
