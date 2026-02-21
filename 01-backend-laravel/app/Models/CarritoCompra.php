<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarritoCompra extends Model
{
    protected $table = 'carrito_compras';

    protected $fillable = [
        'cliente_id',
        'farmacia_id',
        'stock_farmacia_id',
        'cantidad',
        'fecha_agregado',
    ];

    protected $casts = [
        'fecha_agregado' => 'datetime',
    ];

    public function cliente()
    {
        return $this->belongsTo(Usuario::class, 'cliente_id');
    }

    public function farmacia()
    {
        return $this->belongsTo(Farmacia::class, 'farmacia_id');
    }

    public function stockFarmacia()
    {
        return $this->belongsTo(StockFarmacia::class, 'stock_farmacia_id');
    }
}
