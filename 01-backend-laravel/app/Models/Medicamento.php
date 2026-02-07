<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicamento extends Model
{
    use HasFactory;

    protected $table = 'medicamentos';

    protected $fillable = [
        'codigo_barras',
        'nombre_comercial',
        'nombre_generico',
        'descripcion',
        'fabricante',
        'categoria_id',
        'subcategoria',
        'forma_farmaceutica',
        'concentracion',
        'contenido',
        'requiere_receta',
        'controlado',
        'fecha_vencimiento',
        'precio_referencia',
        'precio_regular',
        'imagen_url',
        'activo'
    ];

    protected $casts = [
        'requiere_receta' => 'boolean',
        'controlado' => 'boolean',
        'activo' => 'boolean',
        'fecha_vencimiento' => 'date',
        'precio_referencia' => 'decimal:2',
        'precio_regular' => 'decimal:2',
    ];

    // Relaciones
    public function categoria()
    {
        return $this->belongsTo(CategoriaMedicamento::class, 'categoria_id');
    }

    public function stock()
    {
        return $this->hasMany(StockFarmacia::class, 'medicamento_id');
    }

    public function pedidoDetalles()
    {
        return $this->hasMany(PedidoDetalle::class, 'medicamento_id');
    }

    // Scopes
    public function scopeActivos($query)
    {
        return $query->where('activo', true);
    }

    public function scopeDisponibles($query)
    {
        return $query->whereHas('stock', function($q) {
            $q->where('disponible', true)->where('stock_actual', '>', 0);
        });
    }

    public function scopeConReceta($query)
    {
        return $query->where('requiere_receta', true);
    }

    public function scopeSinReceta($query)
    {
        return $query->where('requiere_receta', false);
    }

    public function scopeByCategoria($query, $categoriaId)
    {
        return $query->where('categoria_id', $categoriaId);
    }
}
