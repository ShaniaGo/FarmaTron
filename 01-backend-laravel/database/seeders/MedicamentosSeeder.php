<?php

namespace Database\Seeders;

use App\Models\Farmacia;
use App\Models\CategoriaMedicamento;
use App\Models\Medicamento;
use App\Models\StockFarmacia;
use Illuminate\Database\Seeder;

class MedicamentosSeeder extends Seeder
{
    public function run(): void
    {
        // Verificar que existan farmacias
        $farmacias = Farmacia::all();
        if ($farmacias->isEmpty()) {
            $this->command->error('⚠️ No hay farmacias en la base de datos. Ejecuta primero el InitialDataSeeder completo o crea farmacias manualmente.');
            return;
        }

        // Crear categorías si no existen
        $categoriasData = [
            ['nombre' => 'Analgésicos', 'descripcion' => 'Medicamentos para el dolor', 'icono' => 'fa-pills', 'orden' => 1],
            ['nombre' => 'Antibióticos', 'descripcion' => 'Para infecciones bacterianas', 'icono' => 'fa-bacteria', 'orden' => 2],
            ['nombre' => 'Antigripales', 'descripcion' => 'Para resfriados y gripes', 'icono' => 'fa-head-side-cough', 'orden' => 3],
            ['nombre' => 'Vitaminas', 'descripcion' => 'Suplementos vitamínicos', 'icono' => 'fa-apple-alt', 'orden' => 4],
            ['nombre' => 'Cuidado Personal', 'descripcion' => 'Productos de higiene', 'icono' => 'fa-hand-sparkles', 'orden' => 5],
        ];

        $categoriaIds = [];
        foreach ($categoriasData as $cat) {
            $categoria = CategoriaMedicamento::firstOrCreate(
                ['nombre' => $cat['nombre']],
                $cat
            );
            $categoriaIds[$cat['nombre']] = $categoria->id;
        }

        // Medicamentos a crear
        $medicamentosData = [
            [
                'nombre_comercial' => 'Paracetamol 500mg',
                'nombre_generico' => 'Paracetamol',
                'categoria_id' => $categoriaIds['Analgésicos'],
                'forma_farmaceutica' => 'tableta',
                'concentracion' => '500mg',
                'contenido' => '20 tabletas',
                'precio_referencia' => 2.50,
                'requiere_receta' => false,
            ],
            [
                'nombre_comercial' => 'Ibuprofeno 400mg',
                'nombre_generico' => 'Ibuprofeno',
                'categoria_id' => $categoriaIds['Analgésicos'],
                'forma_farmaceutica' => 'tableta',
                'concentracion' => '400mg',
                'contenido' => '24 tabletas',
                'precio_referencia' => 3.80,
                'requiere_receta' => false,
            ],
            [
                'nombre_comercial' => 'Amoxicilina 500mg',
                'nombre_generico' => 'Amoxicilina',
                'categoria_id' => $categoriaIds['Antibióticos'],
                'forma_farmaceutica' => 'capsula',
                'concentracion' => '500mg',
                'contenido' => '12 cápsulas',
                'precio_referencia' => 8.90,
                'requiere_receta' => true,
            ],
            [
                'nombre_comercial' => 'Vitamina C 500mg',
                'nombre_generico' => 'Ácido Ascórbico',
                'categoria_id' => $categoriaIds['Vitaminas'],
                'forma_farmaceutica' => 'tableta',
                'concentracion' => '500mg',
                'contenido' => '30 tabletas',
                'precio_referencia' => 4.50,
                'requiere_receta' => false,
            ],
        ];

        $creados = 0;
        foreach ($medicamentosData as $med) {
            $medicamento = Medicamento::firstOrCreate(
                ['nombre_comercial' => $med['nombre_comercial']],
                $med
            );
            if ($medicamento->wasRecentlyCreated) {
                $creados++;
            }
        }

        // Crear stock para cada medicamento en cada farmacia
        $medicamentosDB = Medicamento::all();
        foreach ($medicamentosDB as $medicamento) {
            foreach ($farmacias as $farmacia) {
                StockFarmacia::firstOrCreate(
                    [
                        'farmacia_id' => $farmacia->id,
                        'medicamento_id' => $medicamento->id,
                    ],
                    [
                        'stock_actual' => rand(50, 200),
                        'stock_minimo' => 10,
                        'precio_venta' => $medicamento->precio_referencia * (rand(115, 125) / 100),
                        'disponible' => true,
                    ]
                );
            }
        }

        $this->command->info('✅ Medicamentos creados exitosamente!');
        $this->command->info('💊 Total medicamentos: ' . Medicamento::count());
        $this->command->info('📦 Stock asignado en ' . $farmacias->count() . ' farmacia(s)');
    }
}
