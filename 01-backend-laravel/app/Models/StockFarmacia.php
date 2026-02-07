<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
    public function farmacia()
    {
        return $this->belongsTo(Farmacia::class, 'farmacia_id');
    }

    public function medicamento()
    {
        return $this->belongsTo(Medicamento::class, 'medicamento_id');
    }

    public function pedidoDetalles()
    {
        return $this->hasMany(PedidoDetalle::class, 'stock_farmacia_id');
    }

    public function carritos()
    {
        return $this->hasMany(CarritoCompra::class, 'stock_farmacia_id');
    }

    // Scopes
    public function scopeDisponibles($query)
    {
        return $query->where('disponible', true)->where('stock_actual', '>', 0);
    }

    public function scopeConPromocion($query)
    {
        return $query->where('promocion', true);
    }

    public function scopeByFarmacia($query, $farmaciaId)
    {
        return $query->where('farmacia_id', $farmaciaId);
    }

    // Métodos
    public function precioFinal()
    {
        if ($this->promocion && $this->precio_promocion) {
            return $this->precio_promocion;
        }
        return $this->precio_venta;
    }

    public function tieneStock($cantidad)
    {
        return $this->stock_actual >= $cantidad;
    }

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
