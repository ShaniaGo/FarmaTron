<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Medicamento;
use App\Models\CategoriaMedicamento;
use App\Models\StockFarmacia;
use App\Models\Farmacia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductoController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = Medicamento::with(['categoria', 'stock.farmacia'])
                ->activos()
                ->disponibles();

            // Filtros
            if ($request->has('categoria_id')) {
                $query->where('categoria_id', $request->categoria_id);
            }

            if ($request->has('search')) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('nombre_comercial', 'like', "%{$search}%")
                      ->orWhere('nombre_generico', 'like', "%{$search}%")
                      ->orWhere('descripcion', 'like', "%{$search}%");
                });
            }

            if ($request->has('farmacia_id')) {
                $farmaciaId = $request->farmacia_id;
                $query->whereHas('stock', function($q) use ($farmaciaId) {
                    $q->where('farmacia_id', $farmaciaId)->disponibles();
                });
            }

            if ($request->has('requiere_receta')) {
                $query->where('requiere_receta', filter_var($request->requiere_receta, FILTER_VALIDATE_BOOLEAN));
            }

            // Ordenamiento
            $orderBy = $request->get('order_by', 'nombre_comercial');
            $orderDir = $request->get('order_dir', 'asc');
            $query->orderBy($orderBy, $orderDir);

            // Paginación
            $perPage = $request->get('per_page', 15);
            $productos = $query->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => $productos
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener productos',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $producto = Medicamento::with(['categoria', 'stock.farmacia'])
                ->activos()
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $producto
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Producto no encontrado'
            ], 404);
        }
    }

    public function categorias()
    {
        try {
            $categorias = CategoriaMedicamento::withCount(['medicamentos' => function($query) {
                $query->activos()->disponibles();
            }])->get();

            return response()->json([
                'success' => true,
                'data' => $categorias
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener categorías',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function farmaciasDisponibles($productoId)
    {
        try {
            $farmacias = StockFarmacia::with('farmacia')
                ->where('medicamento_id', $productoId)
                ->disponibles()
                ->get()
                ->map(function($stock) {
                    return [
                        'farmacia' => $stock->farmacia,
                        'precio' => $stock->precioFinal(),
                        'stock' => $stock->stock_actual,
                        'disponible' => $stock->disponible,
                        'promocion' => $stock->promocion,
                        'precio_promocion' => $stock->precio_promocion,
                        'descuento' => $stock->descuento_porcentaje
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $farmacias
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener farmacias disponibles',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function productosDestacados()
    {
        try {
            $destacados = Medicamento::with(['categoria', 'stock' => function($query) {
                $query->disponibles()->take(3);
            }])
            ->activos()
            ->whereHas('stock', function($query) {
                $query->disponibles();
            })
            ->inRandomOrder()
            ->limit(10)
            ->get();

            return response()->json([
                'success' => true,
                'data' => $destacados
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener productos destacados',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
