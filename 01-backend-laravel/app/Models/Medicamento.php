<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Modelo de medicamento/producto del catálogo.
 *
 * Atributos: nombre_comercial, nombre_generico, categoría, requiere_receta,
 * stock por farmacia (relación stock). Scopes: activos, disponibles, con/sin receta.
 */
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

    /** @return \Illuminate\Database\Eloquent\Relations\BelongsTo */
    public function categoria()
    {
        return $this->belongsTo(CategoriaMedicamento::class, 'categoria_id');
    }

    /** @return \Illuminate\Database\Eloquent\Relations\HasMany */
    public function stock()
    {
        return $this->hasMany(StockFarmacia::class, 'medicamento_id');
    }

    /** @return \Illuminate\Database\Eloquent\Relations\HasMany */
    public function pedidoDetalles()
    {
        return $this->hasMany(PedidoDetalle::class, 'medicamento_id');
    }

    // Scopes

    /** @param \Illuminate\Database\Eloquent\Builder $query */
    public function scopeActivos($query)
    {
        return $query->where('activo', true);
    }

    /** @param \Illuminate\Database\Eloquent\Builder $query */
    public function scopeDisponibles($query)
    {
        return $query->whereHas('stock', function($q) {
            $q->where('disponible', true)->where('stock_actual', '>', 0);
        });
    }

    /** @param \Illuminate\Database\Eloquent\Builder $query */
    public function scopeConReceta($query)
    {
        return $query->where('requiere_receta', true);
    }

    /** @param \Illuminate\Database\Eloquent\Builder $query */
    public function scopeSinReceta($query)
    {
        return $query->where('requiere_receta', false);
    }

    /** @param \Illuminate\Database\Eloquent\Builder $query */
    public function scopeByCategoria($query, $categoriaId)
    {
        return $query->where('categoria_id', $categoriaId);
    }
}
