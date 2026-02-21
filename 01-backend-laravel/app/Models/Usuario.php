<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * Modelo de usuario del sistema (clientes, farmacéuticos, repartidores, admin).
 *
 * Autenticación vía Laravel Sanctum; contraseña en campo `clave`.
 * Relaciones: pedidos, carrito, mensajes, calificaciones. Scopes por tipo y estado.
 */
class Usuario extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'usuarios';
    protected $primaryKey = 'id';

    protected $fillable = [
        'cedula',
        'nombre_completo',
        'email',
        'clave',
        'telefono',
        'direccion',
        'tipo',
        'fecha_nacimiento',
        'genero',
        'foto_perfil',
        'licencia_conducir',
        'vehiculo_tipo',
        'placa_vehiculo',
        'estado'
    ];

    protected $hidden = [
        'clave',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'fecha_nacimiento' => 'date',
        'fecha_registro' => 'datetime',
        'ultimo_login' => 'datetime',
    ];

    /**
     * Nombre del campo de contraseña para autenticación.
     *
     * @return string
     */
    public function getAuthPassword()
    {
        return $this->clave;
    }

    // Relaciones

    /** @return \Illuminate\Database\Eloquent\Relations\HasMany<Pedido> */
    public function pedidos()
    {
        return $this->hasMany(Pedido::class, 'cliente_id');
    }

    /** @return \Illuminate\Database\Eloquent\Relations\HasMany */
    public function pedidosRepartidor()
    {
        return $this->hasMany(Pedido::class, 'repartidor_id');
    }

    /** @return \Illuminate\Database\Eloquent\Relations\HasMany */
    public function mensajesEnviados()
    {
        return $this->hasMany(Mensaje::class, 'remitente_id');
    }

    /** @return \Illuminate\Database\Eloquent\Relations\HasMany */
    public function mensajesRecibidos()
    {
        return $this->hasMany(Mensaje::class, 'destinatario_id');
    }

    /** @return \Illuminate\Database\Eloquent\Relations\HasMany */
    public function calificaciones()
    {
        return $this->hasMany(Calificacion::class, 'cliente_id');
    }

    /** @return \Illuminate\Database\Eloquent\Relations\HasMany */
    public function carrito()
    {
        return $this->hasMany(CarritoCompra::class, 'cliente_id');
    }

    // Scopes

    /** @param \Illuminate\Database\Eloquent\Builder $query */
    public function scopeActivos($query)
    {
        return $query->where('estado', 'activo');
    }

    /** @param \Illuminate\Database\Eloquent\Builder $query */
    public function scopeClientes($query)
    {
        return $query->where('tipo', 'cliente');
    }

    /** @param \Illuminate\Database\Eloquent\Builder $query */
    public function scopeFarmaceuticos($query)
    {
        return $query->where('tipo', 'farmaceutico');
    }

    /** @param \Illuminate\Database\Eloquent\Builder $query */
    public function scopeRepartidores($query)
    {
        return $query->where('tipo', 'repartidor');
    }

    /** @param \Illuminate\Database\Eloquent\Builder $query */
    public function scopeAdmins($query)
    {
        return $query->where('tipo', 'admin');
    }
}
