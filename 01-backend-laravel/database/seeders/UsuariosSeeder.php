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
            'cedula' => 'V12345678',
            'nombre_completo' => 'Administrador Sistema',
            'email' => 'admin@farma-link.com',
            'clave' => Hash::make('Admin123!'),
            'telefono' => '04141234567',
            'tipo' => 'admin',
            'estado' => 'activo',
            'fecha_registro' => now(),
        ]);

        Usuario::create([
            'cedula' => 'V87654321',
            'nombre_completo' => 'Juan Pérez',
            'email' => 'cliente@farma-link.com',
            'clave' => Hash::make('Cliente123!'),
            'telefono' => '04149876543',
            'direccion' => 'Av. Principal, Caracas',
            'tipo' => 'cliente',
            'estado' => 'activo',
            'fecha_registro' => now(),
        ]);
    }
}
