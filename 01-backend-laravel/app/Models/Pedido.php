<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Modelo de pedido de medicamentos.
 *
 * Relaciona cliente, farmacia, repartidor; contiene detalles (ítems), seguimientos,
 * mensajes y calificación. Estados: pendiente, confirmado, en_preparacion, listo_recojo,
 * asignado_repartidor, en_camino, entregado, cancelado.
 */
class Pedido extends Model
{
    use HasFactory;

    protected $table = 'pedidos';

    protected $fillable = [
        'numero_pedido',
        'cliente_id',
        'farmacia_id',
        'repartidor_id',
        'subtotal',
        'descuento',
        'costo_envio',
        'impuestos',
        'total',
        'direccion_entrega',
        'telefono_contacto',
        'latitud_entrega',
        'longitud_entrega',
        'instrucciones_entrega',
        'fecha_entrega_estimada',
        'estado',
        'motivo_cancelacion',
        'metodo_pago',
        'estado_pago',
        'comprobante_pago_url',
        'codigo_seguimiento'
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'descuento' => 'decimal:2',
        'costo_envio' => 'decimal:2',
        'impuestos' => 'decimal:2',
        'total' => 'decimal:2',
        'latitud_entrega' => 'decimal:8',
        'longitud_entrega' => 'decimal:8',
        'fecha_entrega_estimada' => 'datetime',
        'fecha_entrega_real' => 'datetime',
    ];

    // Relaciones

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

    /** @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Usuario> */
    public function repartidor()
    {
        return $this->belongsTo(Usuario::class, 'repartidor_id');
    }

    /** @return \Illuminate\Database\Eloquent\Relations\HasMany<PedidoDetalle> */
    public function detalles()
    {
        return $this->hasMany(PedidoDetalle::class, 'pedido_id');
    }

    /** @return \Illuminate\Database\Eloquent\Relations\HasMany<SeguimientoPedido> */
    public function seguimientos()
    {
        return $this->hasMany(SeguimientoPedido::class, 'pedido_id');
    }

    /** @return \Illuminate\Database\Eloquent\Relations\HasMany<Mensaje> */
    public function mensajes()
    {
        return $this->hasMany(Mensaje::class, 'pedido_id');
    }

    /** @return \Illuminate\Database\Eloquent\Relations\HasOne<Calificacion> */
    public function calificacion()
    {
        return $this->hasOne(Calificacion::class, 'pedido_id');
    }

    // Scopes

    /** @param \Illuminate\Database\Eloquent\Builder $query */
    public function scopeActivos($query)
    {
        return $query->whereNotIn('estado', ['entregado', 'cancelado', 'rechazado']);
    }

    /** @param \Illuminate\Database\Eloquent\Builder $query */
    public function scopePorCliente($query, $clienteId)
    {
        return $query->where('cliente_id', $clienteId);
    }

    /** @param \Illuminate\Database\Eloquent\Builder $query */
    public function scopePorFarmacia($query, $farmaciaId)
    {
        return $query->where('farmacia_id', $farmaciaId);
    }

    /** @param \Illuminate\Database\Eloquent\Builder $query */
    public function scopePorRepartidor($query, $repartidorId)
    {
        return $query->where('repartidor_id', $repartidorId);
    }

    /** @param \Illuminate\Database\Eloquent\Builder $query */
    public function scopePorEstado($query, $estado)
    {
        return $query->where('estado', $estado);
    }

    // Métodos

    /** Calcula total: subtotal + envío - descuento + impuestos. */
    public function calcularTotal()
    {
        return $this->subtotal + $this->costo_envio - $this->descuento + $this->impuestos;
    }

    /** Indica si el pedido puede ser cancelado por el cliente. */
    public function puedeCancelar()
    {
        return in_array($this->estado, ['pendiente', 'confirmado', 'en_preparacion']);
    }

    /** Indica si el cliente puede dejar calificación (entregado y sin calificación). */
    public function puedeCalificar()
    {
        return $this->estado === 'entregado' && !$this->calificacion;
    }
}
