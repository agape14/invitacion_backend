<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invitado extends Model
{
    protected $fillable = [
        'nombres_completos',
        'cantidad_adultos',
        'cantidad_ninos',
        'cantidad_ninas',
        'edades_ninos',
        'edades_ninas',
        'requiere_cochera',
        'ip_address',
        'user_agent',
    ];

    protected $casts = [
        'edades_ninos' => 'array',
        'edades_ninas' => 'array',
        'requiere_cochera' => 'boolean',
        'cantidad_adultos' => 'integer',
        'cantidad_ninos' => 'integer',
        'cantidad_ninas' => 'integer',
    ];
}
