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
    private $formasFarmaceuticas = [
        'tableta', 'capsula', 'jarabe', 'inyectable', 'crema',
        'ungüento', 'supositorio', 'gotas', 'inhalador', 'parche',
        'otro', 'tableta efervescente', 'unidad', 'gel'
    ];

    private $concentraciones = [
        '125mg', '250mg', '500mg', '750mg', '1g',
        '5mg/ml', '10mg/ml', '20mg/ml', '50mg/ml', '100mg/ml',
        '1%', '2%', '5%', '10%', '20%', '30%', '40%', '50%',
        '2.5mg', '5mg', '10mg', '20mg', '40mg', '80mg',
        '100mg', '200mg', '300mg', '400mg', '600mg', '800mg'
    ];

    private $contenidos = [
        '10 tabletas', '20 tabletas', '30 tabletas', '50 tabletas', '100 tabletas',
        '5 cápsulas', '10 cápsulas', '14 cápsulas', '20 cápsulas', '30 cápsulas',
        '60 ml', '120 ml', '240 ml', '100 gr', '200 gr', '500 gr',
        '1 frasco', '2 frascos', '1 tubo', '1 caja', '1 sobre',
        '15 comprimidos', '28 comprimidos', '30 comprimidos', '60 comprimidos'
    ];

    private $rangosPrecio = [
        'bajo' => [1.50, 5.00],
        'medio' => [5.01, 15.00],
        'alto' => [15.01, 80.00] // Aumentado el rango superior para medicamentos más caros
    ];

    public function run(): void
    {
        // Usuarios
        $admin = Usuario::create([
            'cedula' => 2625451,
            'primer_nombre' => 'Shania',
            'segundo_nombre' => 'Rose',
            'primer_apellido' => 'Gomez',
            'segundo_apellido' => 'Khan',
            'email' => 'shania@gmail.com',
            'clave' => Hash::make('q1w2e3.1'),
            'telefono' => '04149876543',
            'direccion' => 'Av. Principal, Caracas',
            'tipo' => 'admin',
            'estado' => 'activo',
            'fecha_registro' => now(),
        ]);


        $cliente = Usuario::create([
            'cedula' => 27302402,
            'primer_nombre' => 'Jeferson',
            'segundo_nombre' => 'Yexael',
            'primer_apellido' => 'Oramas',
            'segundo_apellido' => 'Rojas',
            'email' => 'jeff@gmail.com',
            'clave' => Hash::make('q1w2e3.1'),
            'telefono' => '04149876543',
            'direccion' => 'Av. Principal, Caracas',
            'tipo' => 'cliente',
            'estado' => 'activo',
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

        // Categorías con más detalles
        $categorias = [
            [
                'nombre' => 'Analgésicos',
                'descripcion' => 'Medicamentos para aliviar el dolor',
                'icono' => 'fa-pills',
                'orden' => 1,
                'rango_precio' => 'bajo'
            ],
            [
                'nombre' => 'Antibióticos',
                'descripcion' => 'Para infecciones bacterianas',
                'icono' => 'fa-bacteria',
                'orden' => 2,
                'rango_precio' => 'medio'
            ],
            [
                'nombre' => 'Antiinflamatorios',
                'descripcion' => 'Reducen inflamación',
                'icono' => 'fa-wind',
                'orden' => 3,
                'rango_precio' => 'medio'
            ],
            [
                'nombre' => 'Antihistamínicos',
                'descripcion' => 'Para alergias',
                'icono' => 'fa-allergies',
                'orden' => 4,
                'rango_precio' => 'bajo'
            ],
            [
                'nombre' => 'Antigripales',
                'descripcion' => 'Para resfriados y gripes',
                'icono' => 'fa-head-side-cough',
                'orden' => 5,
                'rango_precio' => 'bajo'
            ],
            [
                'nombre' => 'Vitaminas',
                'descripcion' => 'Suplementos vitamínicos',
                'icono' => 'fa-apple-alt',
                'orden' => 6,
                'rango_precio' => 'medio'
            ],
            [
                'nombre' => 'Minerales',
                'descripcion' => 'Suplementos minerales',
                'icono' => 'fa-flask',
                'orden' => 7,
                'rango_precio' => 'medio'
            ],
            [
                'nombre' => 'Gastrointestinales',
                'descripcion' => 'Para el sistema digestivo',
                'icono' => 'fa-stomach',
                'orden' => 8,
                'rango_precio' => 'bajo'
            ],
            [
                'nombre' => 'Cardiovasculares',
                'descripcion' => 'Para el corazón y circulación',
                'icono' => 'fa-heartbeat',
                'orden' => 9,
                'rango_precio' => 'alto'
            ],
            [
                'nombre' => 'Respiratorios',
                'descripcion' => 'Para el sistema respiratorio',
                'icono' => 'fa-lungs',
                'orden' => 10,
                'rango_precio' => 'medio'
            ],
            [
                'nombre' => 'Dermatológicos',
                'descripcion' => 'Para la piel',
                'icono' => 'fa-hand-sparkles',
                'orden' => 11,
                'rango_precio' => 'medio'
            ],
            [
                'nombre' => 'Oftálmicos',
                'descripcion' => 'Para los ojos',
                'icono' => 'fa-eye',
                'orden' => 12,
                'rango_precio' => 'medio'
            ],
            [
                'nombre' => 'Neurológicos',
                'descripcion' => 'Para el sistema nervioso',
                'icono' => 'fa-brain',
                'orden' => 13,
                'rango_precio' => 'alto'
            ],
            [
                'nombre' => 'Antidepresivos',
                'descripcion' => 'Para la depresión',
                'icono' => 'fa-smile',
                'orden' => 14,
                'rango_precio' => 'alto'
            ],
            [
                'nombre' => 'Antipsicóticos',
                'descripcion' => 'Para trastornos mentales',
                'icono' => 'fa-hospital',
                'orden' => 15,
                'rango_precio' => 'alto'
            ],
            [
                'nombre' => 'Anticonceptivos',
                'descripcion' => 'Control de natalidad',
                'icono' => 'fa-female',
                'orden' => 16,
                'rango_precio' => 'bajo'
            ],
            [
                'nombre' => 'Hormonales',
                'descripcion' => 'Terapia hormonal',
                'icono' => 'fa-droplet',
                'orden' => 17,
                'rango_precio' => 'alto'
            ],
            [
                'nombre' => 'Antidiabéticos',
                'descripcion' => 'Para la diabetes',
                'icono' => 'fa-syringe',
                'orden' => 18,
                'rango_precio' => 'alto'
            ],
            [
                'nombre' => 'Cuidado Personal',
                'descripcion' => 'Productos de higiene',
                'icono' => 'fa-hand-sparkles',
                'orden' => 19,
                'rango_precio' => 'bajo'
            ],
            [
                'nombre' => 'Antimicóticos',
                'descripcion' => 'Para hongos',
                'icono' => 'fa-fungus',
                'orden' => 20,
                'rango_precio' => 'medio'
            ],
        ];

        foreach ($categorias as $cat) {
            CategoriaMedicamento::create([
                'nombre' => $cat['nombre'],
                'descripcion' => $cat['descripcion'],
                'icono' => $cat['icono'],
                'orden' => $cat['orden']
            ]);
        }

        // Generar 300 medicamentos
        $medicamentos = $this->generarMedicamentos(300);

        // Insertar medicamentos en batches para mejor rendimiento
        $chunks = array_chunk($medicamentos, 50);
        foreach ($chunks as $chunk) {
            Medicamento::insert($chunk);
        }

        // Stock
        $medicamentosDB = Medicamento::all();
        $farmacias = Farmacia::all();
        $stockData = [];

        foreach ($medicamentosDB as $medicamento) {
            foreach ($farmacias as $farmacia) {
                // 85% de probabilidad de tener stock en cada farmacia (aumentado)
                if (rand(1, 100) <= 85) {
                    $precioVenta = $medicamento->precio_referencia * (1 + (rand(5, 30) / 100)); // +5% a +30%

                    $stockData[] = [
                        'farmacia_id' => $farmacia->id,
                        'medicamento_id' => $medicamento->id,
                        'stock_actual' => rand(15, 600), // Stock más variado
                        'stock_minimo' => rand(5, 25),
                        'precio_venta' => round($precioVenta, 2),
                        'disponible' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }
        }

        // Insertar stock en batches
        $stockChunks = array_chunk($stockData, 100);
        foreach ($stockChunks as $chunk) {
            StockFarmacia::insert($chunk);
        }

        $this->command->info('✅ Datos iniciales creados exitosamente!');
        $this->command->info('👤 Admin: '. $admin->email.' / q1w2e3.1');
        $this->command->info('👤 Cliente: '. $cliente->email.' / q1w2e3.1');
        $this->command->info('🏪 Farmacias: 2 farmacias creadas');
        $this->command->info('💊 Medicamentos: ' . count($medicamentos) . ' medicamentos con stock');
        $this->command->info('📦 Stock: ' . count($stockData) . ' registros de stock creados');
    }

    private function generarMedicamentos($cantidad)
    {
        $medicamentos = [];
        $categorias = CategoriaMedicamento::all();

        $medicamentosBase = [
            // Analgésicos (ampliado)
            'Acetaminofén', 'Paracetamol', 'Ibuprofeno', 'Naproxeno', 'Diclofenaco',
            'Ketorolaco', 'Metamizol', 'Tramadol', 'Codeína', 'Morfina',
            'Ketoprofeno', 'Piroxicam', 'Meloxicam', 'Celecoxib', 'Etoricoxib',
            'Dexketoprofeno', 'Flurbiprofeno', 'Indometacina', 'Nabumetona', 'Fentanilo',

            // Antibióticos (ampliado)
            'Amoxicilina', 'Azitromicina', 'Ciprofloxacino', 'Levofloxacino', 'Claritromicina',
            'Doxiciclina', 'Cefalexina', 'Penicilina', 'Eritromicina', 'Metronidazol',
            'Cefuroxima', 'Ceftriaxona', 'Cefixima', 'Moxifloxacino', 'Norfloxacino',
            'Clindamicina', 'Vancomicina', 'Gentamicina', 'Tobramicina', 'Meropenem',

            // Antiinflamatorios (ampliado)
            'Piroxicam', 'Meloxicam', 'Celecoxib', 'Indometacina', 'Nimesulida',
            'Diclofenaco', 'Ketoprofeno', 'Flurbiprofeno', 'Naproxeno', 'Ibuprofeno',
            'Etodolaco', 'Sulindaco', 'Diflunisal', 'Fenilbutazona', 'Oxaprozina',

            // Antihistamínicos (ampliado)
            'Loratadina', 'Cetirizina', 'Desloratadina', 'Fexofenadina', 'Difenhidramina',
            'Clorfeniramina', 'Levocetirizina', 'Bilastina', 'Ebastina', 'Rupatadina',
            'Hidroxicina', 'Prometazina', 'Dexclorfeniramina', 'Triprolidina', 'Clemastina',

            // Antigripales (ampliado)
            'GripeMax', 'Resfriol', 'Antigripal Plus', 'GripControl', 'Vicks Formula 44',
            'Panadol Antigripal', 'Tafirol Gripe', 'Tempra Gripe', 'Ibuevan Gripe', 'Bisolgrip',
            'Frenadol', 'Gelocatil Gripe', 'Hibiterm', 'Iniston', 'Actron Gripe',

            // Vitaminas (ampliado)
            'Vitamina C', 'Vitamina D3', 'Complejo B', 'Vitamina E', 'Vitamina A',
            'Multivitamínico', 'Centrum', 'Supradyn', 'Pharmaton', 'Berocca',
            'Vitamina K', 'Biotina', 'Ácido Fólico', 'Niacina', 'Riboflavina',
            'Tiamina', 'Piridoxina', 'Cianocobalamina', 'Ácido Pantoténico', 'Vitamina B12',

            // Minerales (ampliado)
            'Calcio', 'Magnesio', 'Zinc', 'Hierro', 'Potasio',
            'Selenio', 'Cromo', 'Manganeso', 'Cobre', 'Fósforo',
            'Yodo', 'Flúor', 'Molibdeno', 'Cobalto', 'Silicio',

            // Gastrointestinales (ampliado)
            'Omeprazol', 'Pantoprazol', 'Ranitidina', 'Lansoprazol', 'Esomeprazol',
            'Domperidona', 'Metoclopramida', 'Ondansetrón', 'Loperamida', 'Simeticona',
            'Famotidina', 'Cimetidina', 'Rabeprazol', 'Dexlansoprazol', 'Bismuto',
            'Hioscina', 'Trimebutina', 'Almagato', 'Hidrotalcita', 'Sucralfato',

            // Cardiovasculares (ampliado)
            'Losartán', 'Enalapril', 'Amlodipino', 'Carvedilol', 'Metoprolol',
            'Digoxina', 'Furosemida', 'Espironolactona', 'Hidroclorotiazida', 'Valsartán',
            'Ramipril', 'Lisinopril', 'Candesartán', 'Irbesartán', 'Telmisartán',
            'Nifedipino', 'Verapamilo', 'Diltiazem', 'Bisoprolol', 'Atenolol',

            // Respiratorios (ampliado)
            'Salbutamol', 'Budesonida', 'Fluticasona', 'Montelukast', 'Teofilina',
            'Bromhexina', 'Ambroxol', 'Acetilcisteína', 'Carbocisteína', 'Dextrometorfano',
            'Formoterol', 'Salmeterol', 'Tiotropio', 'Ipratropio', 'Beclometasona',
            'Terbutalina', 'Fenoterol', 'Zafirlukast', 'Pranlukast', 'Roﬂumilast',

            // Dermatológicos (ampliado)
            'Clotrimazol', 'Miconazol', 'Ketoconazol', 'Terbinafina', 'Mupirocina',
            'Hidrocortisona', 'Betametasona', 'Clobetasol', 'Tretinoína', 'Peróxido de benzoilo',
            'Adapaleno', 'Isotretinoína', 'Metronidazol tópico', 'Azelaico', 'Ácido salicílico',
            'Resorcinol', 'Alquitrán', 'Ciclosporina', 'Tacrolimus', 'Pimecrolimus',

            // Oftálmicos (ampliado)
            'Timolol', 'Latanoprost', 'Tobramicina', 'Ciprofloxacino oftálmico', 'Lágrimas artificiales',
            'Dorzolamida', 'Brinzolamida', 'Bimatoprost', 'Travoprost', 'Pilocarpina',
            'Atropina', 'Ciclopentolato', 'Tropicamida', 'Fenilefrina', 'Nafazolina',

            // Neurológicos (ampliado)
            'Carbamazepina', 'Fenitoína', 'Ácido valproico', 'Lamotrigina', 'Gabapentina',
            'Pregabalina', 'Topiramato', 'Levetiracetam', 'Oxcarbazepina', 'Zonisamida',
            'Fenobarbital', 'Primidona', 'Etosuximida', 'Clonazepam', 'Diazepam',

            // Antidepresivos (ampliado)
            'Fluoxetina', 'Sertralina', 'Paroxetina', 'Escitalopram', 'Venlafaxina',
            'Duloxetina', 'Citalopram', 'Fluvoxamina', 'Bupropión', 'Mirtazapina',
            'Trazodona', 'Amitriptilina', 'Nortriptilina', 'Imipramina', 'Clomipramina',

            // Antipsicóticos (ampliado)
            'Risperidona', 'Olanzapina', 'Quetiapina', 'Aripiprazol', 'Haloperidol',
            'Clozapina', 'Paliperidona', 'Ziprasidona', 'Lurasidona', 'Asenapina',
            'Flufenazina', 'Perfenazina', 'Tioridazina', 'Trifluoperazina', 'Clorpromazina',

            // Anticonceptivos (ampliado)
            'Etinilestradiol', 'Levonorgestrel', 'Desogestrel', 'Drospirenona', 'Noretisterona',
            'Gestodeno', 'Nomegestrol', 'Dienogest', 'Clormadinona', 'Ciproterona',

            // Hormonales (ampliado)
            'Levotiroxina', 'Metformina', 'Glibenclamida', 'Insulina', 'Testosterona',
            'Estradiol', 'Progesterona', 'Prednisona', 'Dexametasona', 'Hidrocortisona',

            // Antidiabéticos (ampliado)
            'Metformina', 'Glibenclamida', 'Insulina regular', 'Insulina NPH', 'Sitagliptina',
            'Saxagliptina', 'Linagliptina', 'Empagliflozina', 'Dapagliflozina', 'Canagliflozina',
            'Pioglitazona', 'Rosiglitazona', 'Repaglinida', 'Nateglinida', 'Acarbosa',

            // Antimicóticos (ampliado)
            'Fluconazol', 'Itraconazol', 'Ketoconazol', 'Terbinafina', 'Nistatina',
            'Anfotericina B', 'Micafungina', 'Caspofungina', 'Voriconazol', 'Posaconazol',
        ];

        for ($i = 0; $i < $cantidad; $i++) {
            // Seleccionar categoría aleatoria
            $categoria = $categorias->random();

            // Obtener nombre base aleatorio
            $nombreBase = $medicamentosBase[array_rand($medicamentosBase)];

            // Forma farmacéutica aleatoria
            $formaFarmaceutica = $this->formasFarmaceuticas[array_rand($this->formasFarmaceuticas)];

            // Concentración aleatoria
            $concentracion = $this->concentraciones[array_rand($this->concentraciones)];

            // Contenido aleatorio
            $contenido = $this->contenidos[array_rand($this->contenidos)];

            // Precio según categoría y variación aleatoria
            $rango = $this->rangosPrecio[$categorias->where('id', $categoria->id)->first()->rango_precio ?? 'medio'];
            $precio = round(rand($rango[0] * 100, $rango[1] * 100) / 100, 2);

            // Variar el nombre para hacerlo más realista
            $marcas = ['MK', 'Genfar', 'La Sante', 'Procaps', 'Bayer', 'Pfizer', 'Merck', 'Abbott', 'Roche', 'Novartis', 'Sanofi', 'GSK', 'AstraZeneca', 'Bristol', 'Lilly'];
            $marca = $marcas[array_rand($marcas)];

            $nombreComercial = $nombreBase . ' ' . $concentracion . ' ' . $marca;

            // Asegurar nombres únicos
            $counter = 1;
            while ($this->nombreEnArray($medicamentos, $nombreComercial)) {
                $nombreComercial = $nombreBase . ' ' . $concentracion . ' ' . $marca . ' ' . $counter;
                $counter++;
            }

            $medicamentos[] = [
                'nombre_comercial' => $nombreComercial,
                'nombre_generico' => $nombreBase,
                'categoria_id' => $categoria->id,
                'descripcion' => $this->generarDescripcion($nombreBase, $concentracion, $formaFarmaceutica),
                'forma_farmaceutica' => $formaFarmaceutica,
                'concentracion' => $concentracion,
                'contenido' => $contenido,
                'precio_referencia' => $precio,
                'requiere_receta' => in_array($categoria->nombre, ['Antibióticos', 'Cardiovasculares', 'Neurológicos', 'Antidepresivos', 'Antipsicóticos', 'Hormonales']) ? rand(0, 100) < 75 : rand(0, 100) < 25,
                'activo' => true,
                'fecha_creacion' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        return $medicamentos;
    }

    private function generarDescripcion($nombre, $concentracion, $forma)
    {
        $descripciones = [
            "Medicamento $nombre de $concentracion en presentación $forma para el tratamiento indicado.",
            "$nombre $concentracion - $forma. Eficacia comprobada en el alivio de síntomas.",
            "Fórmula farmacéutica de $nombre en $forma con $concentracion para su administración.",
            "Presentación en $forma de $nombre $concentracion. Calidad y seguridad garantizada.",
            "$nombre $concentracion, $forma de alta calidad para el cuidado de su salud."
        ];

        return $descripciones[array_rand($descripciones)];
    }

    private function nombreEnArray($array, $nombre)
    {
        foreach ($array as $item) {
            if ($item['nombre_comercial'] === $nombre) {
                return true;
            }
        }
        return false;
    }
}
