<?php

namespace Database\Seeders;

use App\Models\Usuario;
use App\Models\Farmacia;
use App\Models\CategoriaMedicamento;
use App\Models\Medicamento;
use App\Models\StockFarmacia;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class InitialDataSeeder extends Seeder
{
    public function run(): void
    {
        // Usuarios
        $admin = Usuario::create([
            'cedula' => 'V12345678',
            'nombre_completo' => 'Administrador Sistema',
            'email' => 'admin@farma-link.com',
            'clave' => Hash::make('Admin123!'),
            'telefono' => '04141234567',
            'tipo' => 'admin',
            'estado' => 'activo',
            'fecha_registro' => now(),
        ]);

        $cliente = Usuario::create([
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

        $repartidor = Usuario::create([
            'cedula' => 'V11223344',
            'nombre_completo' => 'Carlos Repartidor',
            'email' => 'repartidor@farma-link.com',
            'clave' => Hash::make('Repartidor123!'),
            'telefono' => '04146667788',
            'tipo' => 'repartidor',
            'estado' => 'activo',
            'licencia_conducir' => 'LIC123456',
            'vehiculo_tipo' => 'moto',
            'placa_vehiculo' => 'ABC123',
            'fecha_registro' => now(),
        ]);

        // Farmacias
        $farmacia1 = Farmacia::create([
            'nombre' => 'FarmaLink Express',
            'direccion' => 'Av. Libertador, Chacao, Caracas',
            'telefono' => '02121234567',
            'email' => 'contacto@farma-link.com',
            'horario_apertura' => '08:00:00',
            'horario_cierre' => '22:00:00',
            'latitud' => 10.480594,
            'longitud' => -66.903606,
            'costo_envio_base' => 3.50,
            'tiempo_entrega_promedio' => 30,
            'estado' => 'abierta',
            'rating' => 4.5,
        ]);

        $farmacia2 = Farmacia::create([
            'nombre' => 'FarmaLink Plaza Venezuela',
            'direccion' => 'Plaza Venezuela, Caracas',
            'telefono' => '02127654321',
            'email' => 'plazavenezuela@farma-link.com',
            'horario_apertura' => '24:00:00',
            'horario_cierre' => '24:00:00',
            'latitud' => 10.492741,
            'longitud' => -66.888312,
            'costo_envio_base' => 4.00,
            'tiempo_entrega_promedio' => 25,
            'estado' => 'abierta',
            'rating' => 4.2,
        ]);

        // Categorías
        $categorias = [
            ['nombre' => 'Analgésicos', 'descripcion' => 'Medicamentos para el dolor', 'icono' => 'fa-pills', 'orden' => 1],
            ['nombre' => 'Antibióticos', 'descripcion' => 'Para infecciones bacterianas', 'icono' => 'fa-bacteria', 'orden' => 2],
            ['nombre' => 'Antigripales', 'descripcion' => 'Para resfriados y gripes', 'icono' => 'fa-head-side-cough', 'orden' => 3],
            ['nombre' => 'Vitaminas', 'descripcion' => 'Suplementos vitamínicos', 'icono' => 'fa-apple-alt', 'orden' => 4],
            ['nombre' => 'Cuidado Personal', 'descripcion' => 'Productos de higiene', 'icono' => 'fa-hand-sparkles', 'orden' => 5],
        ];

        foreach ($categorias as $cat) {
            CategoriaMedicamento::create($cat);
        }

        // Medicamentos
        $medicamentos = [
            // Analgésicos
            [
                'nombre_comercial' => 'Paracetamol 500mg',
                'nombre_generico' => 'Paracetamol',
                'categoria_id' => 1,
                'forma_farmaceutica' => 'tableta',
                'concentracion' => '500mg',
                'contenido' => '20 tabletas',
                'precio_referencia' => 2.50,
                'requiere_receta' => false,
            ],
            [
                'nombre_comercial' => 'Ibuprofeno 400mg',
                'nombre_generico' => 'Ibuprofeno',
                'categoria_id' => 1,
                'forma_farmaceutica' => 'tableta',
                'concentracion' => '400mg',
                'contenido' => '24 tabletas',
                'precio_referencia' => 3.80,
                'requiere_receta' => false,
            ],
            // Antibióticos
            [
                'nombre_comercial' => 'Amoxicilina 500mg',
                'nombre_generico' => 'Amoxicilina',
                'categoria_id' => 2,
                'forma_farmaceutica' => 'capsula',
                'concentracion' => '500mg',
                'contenido' => '12 cápsulas',
                'precio_referencia' => 8.90,
                'requiere_receta' => true,
            ],
            // Vitaminas
            [
                'nombre_comercial' => 'Vitamina C 500mg',
                'nombre_generico' => 'Ácido Ascórbico',
                'categoria_id' => 4,
                'forma_farmaceutica' => 'tableta',
                'concentracion' => '500mg',
                'contenido' => '30 tabletas',
                'precio_referencia' => 4.50,
                'requiere_receta' => false,
            ],
        ];

        foreach ($medicamentos as $med) {
            Medicamento::create($med);
        }

        // Stock
        $medicamentosDB = Medicamento::all();

        foreach ($medicamentosDB as $medicamento) {
            // Stock en farmacia 1
            StockFarmacia::create([
                'farmacia_id' => $farmacia1->id,
                'medicamento_id' => $medicamento->id,
                'stock_actual' => rand(50, 200),
                'stock_minimo' => 10,
                'precio_venta' => $medicamento->precio_referencia * 1.2, // +20%
                'disponible' => true,
            ]);

            // Stock en farmacia 2 (solo algunos productos)
            if (rand(0, 1)) {
                StockFarmacia::create([
                    'farmacia_id' => $farmacia2->id,
                    'medicamento_id' => $medicamento->id,
                    'stock_actual' => rand(30, 100),
                    'stock_minimo' => 5,
                    'precio_venta' => $medicamento->precio_referencia * 1.15, // +15%
                    'disponible' => true,
                ]);
            }
        }

        $this->command->info('✅ Datos iniciales creados exitosamente!');
        $this->command->info('👤 Admin: admin@farma-link.com / Admin123!');
        $this->command->info('👤 Cliente: cliente@farma-link.com / Cliente123!');
        $this->command->info('🏪 Farmacias: 2 farmacias creadas');
        $this->command->info('💊 Medicamentos: ' . count($medicamentos) . ' medicamentos con stock');
    }
}
