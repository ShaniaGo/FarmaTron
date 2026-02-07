<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

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

    public function getAuthPassword()
    {
        return $this->clave;
    }

    // Relaciones
    public function pedidos()
    {
        return $this->hasMany(Pedido::class, 'cliente_id');
    }

    public function pedidosRepartidor()
    {
        return $this->hasMany(Pedido::class, 'repartidor_id');
    }

    public function mensajesEnviados()
    {
        return $this->hasMany(Mensaje::class, 'remitente_id');
    }

    public function mensajesRecibidos()
    {
        return $this->hasMany(Mensaje::class, 'destinatario_id');
    }

    public function calificaciones()
    {
        return $this->hasMany(Calificacion::class, 'cliente_id');
    }

    public function carrito()
    {
        return $this->hasMany(CarritoCompra::class, 'cliente_id');
    }

    // Scopes
    public function scopeActivos($query)
    {
        return $query->where('estado', 'activo');
    }

    public function scopeClientes($query)
    {
        return $query->where('tipo', 'cliente');
    }

    public function scopeFarmaceuticos($query)
    {
        return $query->where('tipo', 'farmaceutico');
    }

    public function scopeRepartidores($query)
    {
        return $query->where('tipo', 'repartidor');
    }

    public function scopeAdmins($query)
    {
        return $query->where('tipo', 'admin');
    }
}
