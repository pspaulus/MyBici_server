<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $table = 'TICKET';
    public $timestamps = false;

    protected $fillable = [
        'TIPO_id',
        'USUARIO_id',
        'BICICLETA_id',
        'origen_puesto_alquiler',
        'destino_puesto_alquiler',
        'fecha',
        'hora_retiro',
        'hora_entrega',
        'duracion',
        'ESTADO_id'
    ];
}