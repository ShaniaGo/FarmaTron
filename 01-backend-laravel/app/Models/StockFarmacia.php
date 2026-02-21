<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Stock de un medicamento en una farmacia.
 *
 * Precio de venta, promoción/descuento, cantidad disponible.
 * Métodos: precioFinal(), tieneStock(), actualizarStock().
 */
class StockFarmacia extends Model
{
    use HasFactory;

    protected $table = 'stock_farmacia';

    protected $fillable = [
        'farmacia_id',
        'medicamento_id',
        'stock_actual',
        'stock_minimo',
        'precio_venta',
        'disponible',
        'ubicacion_estante',
        'promocion',
        'descuento_porcentaje',
        'precio_promocion'
    ];

    protected $casts = [
        'stock_actual' => 'integer',
        'stock_minimo' => 'integer',
        'precio_venta' => 'decimal:2',
        'disponible' => 'boolean',
        'promocion' => 'boolean',
        'descuento_porcentaje' => 'decimal:2',
        'precio_promocion' => 'decimal:2',
    ];

    // Relaciones

    /** @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Farmacia> */
    public function farmacia()
    {
        return $this->belongsTo(Farmacia::class, 'farmacia_id');
    }

    /** @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Medicamento> */
    public function medicamento()
    {
        return $this->belongsTo(Medicamento::class, 'medicamento_id');
    }

    /** @return \Illuminate\Database\Eloquent\Relations\HasMany<PedidoDetalle> */
    public function pedidoDetalles()
    {
        return $this->hasMany(PedidoDetalle::class, 'stock_farmacia_id');
    }

    /** @return \Illuminate\Database\Eloquent\Relations\HasMany<CarritoCompra> */
    public function carritos()
    {
        return $this->hasMany(CarritoCompra::class, 'stock_farmacia_id');
    }

    // Scopes

    /** @param \Illuminate\Database\Eloquent\Builder $query */
    public function scopeDisponibles($query)
    {
        return $query->where('disponible', true)->where('stock_actual', '>', 0);
    }

    /** @param \Illuminate\Database\Eloquent\Builder $query */
    public function scopeConPromocion($query)
    {
        return $query->where('promocion', true);
    }

    /** @param \Illuminate\Database\Eloquent\Builder $query */
    public function scopeByFarmacia($query, $farmaciaId)
    {
        return $query->where('farmacia_id', $farmaciaId);
    }

    // Métodos

    /** Precio con promoción si aplica, sino precio_venta. */
    public function precioFinal()
    {
        if ($this->promocion && $this->precio_promocion) {
            return $this->precio_promocion;
        }
        return $this->precio_venta;
    }

    /** @param int $cantidad @return bool */
    public function tieneStock($cantidad)
    {
        return $this->stock_actual >= $cantidad;
    }

    /** Resta cantidad del stock actual y persiste. */
    public function actualizarStock($cantidad)
    {
        $this->stock_actual -= $cantidad;
        if ($this->stock_actual < 0) $this->stock_actual = 0;

        if ($this->stock_actual <= $this->stock_minimo) {
            // Aquí podrías disparar un evento de stock bajo
        }

        $this->save();
    }
}
