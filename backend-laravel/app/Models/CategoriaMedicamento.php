<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class CategoriaMedicamento extends Model
{
    protected $table = 'categoria_medicamentos';

    protected $fillable = [
        'nombre',
        'descripcion',
        'icono',
        'orden',
    ];

    public function medicamentos()
    {
        return $this->hasMany(Medicamento::class, 'categoria_id');
    }
}
