<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'USUARIO';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'contrasena',
        'TIPO_id',
        'ESTADO_id',
        'token'
    ];
}