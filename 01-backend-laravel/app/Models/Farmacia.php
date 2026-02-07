<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Farmacia extends Model
{
    use HasFactory;

    protected $table = 'farmacias';

    protected $fillable = [
        'nombre',
        'direccion',
        'telefono',
        'email',
        'logo_url',
        'horario_apertura',
        'horario_cierre',
        'latitud',
        'longitud',
        'estado',
        'rating',
        'tiempo_entrega_promedio',
        'costo_envio_base'
    ];

    protected $casts = [
        'horario_apertura' => 'datetime:H:i',
        'horario_cierre' => 'datetime:H:i',
        'latitud' => 'decimal:8',
        'longitud' => 'decimal:8',
        'rating' => 'decimal:2',
        'costo_envio_base' => 'decimal:2',
    ];

    // Relaciones
    public function stock()
    {
        return $this->hasMany(StockFarmacia::class, 'farmacia_id');
    }

    public function pedidos()
    {
        return $this->hasMany(Pedido::class, 'farmacia_id');
    }

    public function promociones()
    {
        return $this->hasMany(Promocion::class, 'farmacia_id');
    }

    public function calificaciones()
    {
        return $this->hasMany(Calificacion::class, 'farmacia_id');
    }

    // Scopes
    public function scopeAbiertas($query)
    {
        return $query->where('estado', 'abierta');
    }

    public function scopeCercanas($query, $latitud, $longitud, $radio = 10)
    {
        return $query->whereRaw("
            (6371 * acos(
                cos(radians(?)) * cos(radians(latitud)) *
                cos(radians(longitud) - radians(?)) +
                sin(radians(?)) * sin(radians(latitud))
            )) <= ?
        ", [$latitud, $longitud, $latitud, $radio]);
    }
}
