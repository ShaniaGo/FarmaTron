<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Modelo de farmacia (punto de venta).
 *
 * Atributos: nombre, dirección, horarios, coordenadas, costo_envio_base, rating.
 * Relaciones: stock (medicamentos), pedidos, promociones, calificaciones.
 */
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

    /** @return \Illuminate\Database\Eloquent\Relations\HasMany<StockFarmacia> */
    public function stock()
    {
        return $this->hasMany(StockFarmacia::class, 'farmacia_id');
    }

    /** @return \Illuminate\Database\Eloquent\Relations\HasMany<Pedido> */
    public function pedidos()
    {
        return $this->hasMany(Pedido::class, 'farmacia_id');
    }

    /** @return \Illuminate\Database\Eloquent\Relations\HasMany<Promocion> */
    public function promociones()
    {
        return $this->hasMany(Promocion::class, 'farmacia_id');
    }

    /** @return \Illuminate\Database\Eloquent\Relations\HasMany<Calificacion> */
    public function calificaciones()
    {
        return $this->hasMany(Calificacion::class, 'farmacia_id');
    }

    // Scopes

    /** @param \Illuminate\Database\Eloquent\Builder $query */
    public function scopeAbiertas($query)
    {
        return $query->where('estado', 'abierta');
    }

    /** @param \Illuminate\Database\Eloquent\Builder $query Distancia en km (fórmula Haversine). */
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
