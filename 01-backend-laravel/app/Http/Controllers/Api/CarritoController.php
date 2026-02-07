<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CarritoCompra;
use App\Models\StockFarmacia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class CarritoController extends Controller
{
    public function index(Request $request)
    {
        try {
            $user = $request->user();

            $carrito = CarritoCompra::with([
                'stockFarmacia.medicamento',
                'stockFarmacia.farmacia'
            ])
            ->where('cliente_id', $user->id)
            ->get()
            ->groupBy('farmacia_id');

            $total = 0;
            $itemsPorFarmacia = [];

            foreach ($carrito as $farmaciaId => $items) {
                $subtotal = 0;
                $farmacia = null;

                foreach ($items as $item) {
                    if ($item->stockFarmacia && $item->stockFarmacia->disponible) {
                        $precio = $item->stockFarmacia->precioFinal();
                        $subtotal += $precio * $item->cantidad;

                        if (!$farmacia) {
                            $farmacia = $item->stockFarmacia->farmacia;
                        }
                    }
                }

                if ($farmacia) {
                    $itemsPorFarmacia[] = [
                        'farmacia' => $farmacia,
                        'items' => $items,
                        'subtotal' => $subtotal,
                        'costo_envio' => $farmacia->costo_envio_base,
                        'total_farmacia' => $subtotal + $farmacia->costo_envio_base
                    ];
                    $total += $subtotal + $farmacia->costo_envio_base;
                }
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'items_por_farmacia' => $itemsPorFarmacia,
                    'total_items' => $carrito->sum('count'),
                    'total' => $total
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener carrito',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function agregar(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'stock_farmacia_id' => 'required|exists:stock_farmacia,id',
            'cantidad' => 'required|integer|min:1|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        DB::beginTransaction();

        try {
            $user = $request->user();
            $stock = StockFarmacia::with('medicamento', 'farmacia')
                ->disponibles()
                ->findOrFail($request->stock_farmacia_id);

            // Verificar stock
            if (!$stock->tieneStock($request->cantidad)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Stock insuficiente'
                ], 400);
            }

            // Verificar si ya existe en el carrito
            $carritoItem = CarritoCompra::where('cliente_id', $user->id)
                ->where('stock_farmacia_id', $stock->id)
                ->first();

            if ($carritoItem) {
                // Actualizar cantidad
                $nuevaCantidad = $carritoItem->cantidad + $request->cantidad;

                if (!$stock->tieneStock($nuevaCantidad)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Stock insuficiente para la cantidad total'
                    ], 400);
                }

                $carritoItem->cantidad = $nuevaCantidad;
                $carritoItem->save();
            } else {
                // Crear nuevo item
                CarritoCompra::create([
                    'cliente_id' => $user->id,
                    'farmacia_id' => $stock->farmacia_id,
                    'stock_farmacia_id' => $stock->id,
                    'cantidad' => $request->cantidad,
                    'fecha_agregado' => now(),
                ]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Producto agregado al carrito',
                'data' => [
                    'producto' => $stock->medicamento,
                    'farmacia' => $stock->farmacia,
                    'cantidad' => $request->cantidad,
                    'precio_unitario' => $stock->precioFinal()
                ]
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Error al agregar al carrito',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function actualizar(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'cantidad' => 'required|integer|min:1|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $user = $request->user();
            $carritoItem = CarritoCompra::with('stockFarmacia')
                ->where('cliente_id', $user->id)
                ->findOrFail($id);

            // Verificar stock
            if (!$carritoItem->stockFarmacia->tieneStock($request->cantidad)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Stock insuficiente'
                ], 400);
            }

            $carritoItem->cantidad = $request->cantidad;
            $carritoItem->save();

            return response()->json([
                'success' => true,
                'message' => 'Carrito actualizado',
                'data' => $carritoItem
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar carrito',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function eliminar($id)
    {
        try {
            $user = request()->user();
            $carritoItem = CarritoCompra::where('cliente_id', $user->id)
                ->findOrFail($id);

            $carritoItem->delete();

            return response()->json([
                'success' => true,
                'message' => 'Producto eliminado del carrito'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar del carrito',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function limpiar()
    {
        try {
            $user = request()->user();
            CarritoCompra::where('cliente_id', $user->id)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Carrito limpiado exitosamente'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al limpiar carrito',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
