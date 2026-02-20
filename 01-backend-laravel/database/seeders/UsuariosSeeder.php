<?php

namespace Database\Seeders;

use App\Models\Usuario;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsuariosSeeder extends Seeder
{
    public function run(): void
    {
        Usuario::create([
            'cedula' => 12345678,
            'nombre_completo' => 'Administrador Sistema',
            'email' => 'admin@gmail.com',
            'clave' => Hash::make('q1w2e3.1'),
            'telefono' => '04141234567',
            'tipo' => 'admin',
            'estado' => 'activo',
            'fecha_registro' => now(),
        ]);

        Usuario::create([
            'cedula' => 87654321,
            'nombre_completo' => 'Juan Pérez',
            'email' => 'cliente@gmail.com',
            'clave' => Hash::make('q1w2e3.1'),
            'telefono' => '04149876543',
            'direccion' => 'Av. Principal, Caracas',
            'tipo' => 'cliente',
            'estado' => 'activo',
            'fecha_registro' => now(),
        ]);
    }
}
