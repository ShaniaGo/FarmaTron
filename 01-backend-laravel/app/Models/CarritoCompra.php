<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Ítem del carrito de compras de un cliente.
 *
 * Relaciona cliente, farmacia y stock_farmacia (medicamento en esa farmacia)
 * con cantidad y fecha de agregado.
 */
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

    /** @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Usuario> */
    public function cliente()
    {
        return $this->belongsTo(Usuario::class, 'cliente_id');
    }

    /** @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Farmacia> */
    public function farmacia()
    {
        return $this->belongsTo(Farmacia::class, 'farmacia_id');
    }

    /** @return \Illuminate\Database\Eloquent\Relations\BelongsTo<StockFarmacia> */
    public function stockFarmacia()
    {
        return $this->belongsTo(StockFarmacia::class, 'stock_farmacia_id');
    }
}
