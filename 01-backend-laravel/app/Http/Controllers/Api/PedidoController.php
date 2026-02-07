<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pedido;
use App\Models\PedidoDetalle;
use App\Models\CarritoCompra;
use App\Models\StockFarmacia;
use App\Models\SeguimientoPedido;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class PedidoController extends Controller
{
    public function index(Request $request)
    {
        try {
            $user = $request->user();

            $query = Pedido::with(['farmacia', 'detalles.medicamento', 'seguimientos'])
                ->orderBy('fecha_pedido', 'desc');

            // Filtros según tipo de usuario
            if ($user->tipo === 'cliente') {
                $query->where('cliente_id', $user->id);
            } elseif ($user->tipo === 'farmaceutico') {
                // Asumimos que el farmacéutico trabaja en una farmacia específica
                $query->where('farmacia_id', $user->farmacia_id ?? 0);
            } elseif ($user->tipo === 'repartidor') {
                $query->where('repartidor_id', $user->id)
                      ->orWhereNull('repartidor_id')
                      ->where('estado', 'listo_recojo');
            }

            // Filtros adicionales
            if ($request->has('estado')) {
                $query->where('estado', $request->estado);
            }

            if ($request->has('fecha_inicio') && $request->has('fecha_fin')) {
                $query->whereBetween('fecha_pedido', [
                    $request->fecha_inicio,
                    $request->fecha_fin
                ]);
            }

            $perPage = $request->get('per_page', 15);
            $pedidos = $query->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => $pedidos
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener pedidos',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'farmacia_id' => 'required|exists:farmacias,id',
            'direccion_entrega' => 'required|string',
            'telefono_contacto' => 'required|string|max:20',
            'instrucciones_entrega' => 'nullable|string',
            'metodo_pago' => 'required|in:efectivo,pago_movil,divisa,transferencia',
            'carrito' => 'required|array|min:1',
            'carrito.*.stock_farmacia_id' => 'required|exists:stock_farmacia,id',
            'carrito.*.cantidad' => 'required|integer|min:1',
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
            $farmaciaId = $request->farmacia_id;
            $items = $request->carrito;

            // Verificar stock y calcular total
            $subtotal = 0;
            $detalles = [];

            foreach ($items as $item) {
                $stock = StockFarmacia::with('medicamento')
                    ->where('id', $item['stock_farmacia_id'])
                    ->where('farmacia_id', $farmaciaId)
                    ->disponibles()
                    ->firstOrFail();

                if (!$stock->tieneStock($item['cantidad'])) {
                    throw new \Exception("Stock insuficiente para: {$stock->medicamento->nombre_comercial}");
                }

                $precioUnitario = $stock->precioFinal();
                $totalItem = $precioUnitario * $item['cantidad'];

                $detalles[] = [
                    'stock_farmacia_id' => $stock->id,
                    'medicamento_id' => $stock->medicamento_id,
                    'cantidad' => $item['cantidad'],
                    'precio_unitario' => $precioUnitario,
                    'subtotal_item' => $totalItem,
                ];

                $subtotal += $totalItem;
            }

            // Obtener datos de la farmacia
            $farmacia = \App\Models\Farmacia::findOrFail($farmaciaId);
            $costoEnvio = $farmacia->costo_envio_base;
            $total = $subtotal + $costoEnvio;

            // Generar número de pedido único
            $numeroPedido = 'PED-' . date('Ymd') . '-' . strtoupper(uniqid());

            // Crear pedido
            $pedido = Pedido::create([
                'numero_pedido' => $numeroPedido,
                'cliente_id' => $user->id,
                'farmacia_id' => $farmaciaId,
                'subtotal' => $subtotal,
                'costo_envio' => $costoEnvio,
                'total' => $total,
                'direccion_entrega' => $request->direccion_entrega,
                'telefono_contacto' => $request->telefono_contacto,
                'instrucciones_entrega' => $request->instrucciones_entrega,
                'metodo_pago' => $request->metodo_pago,
                'estado' => 'pendiente',
                'estado_pago' => 'pendiente',
                'fecha_pedido' => now(),
            ]);

            // Crear detalles del pedido
            foreach ($detalles as $detalle) {
                $detalle['pedido_id'] = $pedido->id;
                PedidoDetalle::create($detalle);

                // Actualizar stock
                $stock = StockFarmacia::find($detalle['stock_farmacia_id']);
                $stock->actualizarStock($detalle['cantidad']);
            }

            // Limpiar carrito del usuario
            CarritoCompra::where('cliente_id', $user->id)
                ->where('farmacia_id', $farmaciaId)
                ->delete();

            // Crear primer seguimiento
            SeguimientoPedido::create([
                'pedido_id' => $pedido->id,
                'estado' => 'pendiente',
                'observaciones' => 'Pedido creado exitosamente',
                'fecha_evento' => now(),
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Pedido creado exitosamente',
                'data' => [
                    'pedido' => $pedido->load(['detalles.medicamento', 'farmacia']),
                    'numero_pedido' => $numeroPedido,
                    'total' => $total
                ]
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Error al crear pedido',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $user = request()->user();
            $pedido = Pedido::with([
                'farmacia',
                'cliente',
                'repartidor',
                'detalles.medicamento',
                'detalles.stockFarmacia',
                'seguimientos',
                'mensajes'
            ])->findOrFail($id);

            // Verificar permisos
            if ($user->tipo === 'cliente' && $pedido->cliente_id !== $user->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'No autorizado'
                ], 403);
            }

            return response()->json([
                'success' => true,
                'data' => $pedido
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Pedido no encontrado'
            ], 404);
        }
    }

    public function updateEstado(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'estado' => 'required|in:confirmado,en_preparacion,listo_recojo,asignado_repartidor,en_camino,entregado,cancelado',
            'observaciones' => 'nullable|string',
            'repartidor_id' => 'nullable|exists:usuarios,id',
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
            $pedido = Pedido::findOrFail($id);
            $user = $request->user();

            // Verificar permisos según tipo de usuario
            if ($user->tipo === 'cliente' && $request->estado !== 'cancelado') {
                return response()->json([
                    'success' => false,
                    'message' => 'Solo puedes cancelar tus pedidos'
                ], 403);
            }

            if ($user->tipo === 'farmaceutico' && $pedido->farmacia_id !== $user->farmacia_id) {
                return response()->json([
                    'success' => false,
                    'message' => 'No autorizado para este pedido'
                ], 403);
            }

            // Validar transiciones de estado
            $estadosValidos = [
                'pendiente' => ['confirmado', 'cancelado'],
                'confirmado' => ['en_preparacion', 'cancelado'],
                'en_preparacion' => ['listo_recojo', 'cancelado'],
                'listo_recojo' => ['asignado_repartidor', 'cancelado'],
                'asignado_repartidor' => ['en_camino', 'cancelado'],
                'en_camino' => ['entregado', 'cancelado'],
                'entregado' => [],
                'cancelado' => [],
            ];

            if (!in_array($request->estado, $estadosValidos[$pedido->estado] ?? [])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Transición de estado no válida'
                ], 400);
            }

            // Actualizar pedido
            $pedido->estado = $request->estado;

            if ($request->estado === 'cancelado' && $request->has('motivo_cancelacion')) {
                $pedido->motivo_cancelacion = $request->motivo_cancelacion;
            }

            if ($request->estado === 'asignado_repartidor' && $request->repartidor_id) {
                $pedido->repartidor_id = $request->repartidor_id;
            }

            if ($request->estado === 'entregado') {
                $pedido->fecha_entrega_real = now();
                $pedido->estado_pago = 'pagado'; // Si es pago contra entrega
            }

            $pedido->save();

            // Crear registro de seguimiento
            SeguimientoPedido::create([
                'pedido_id' => $pedido->id,
                'estado' => $request->estado,
                'observaciones' => $request->observaciones ?? "Estado actualizado a: {$request->estado}",
                'fecha_evento' => now(),
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Estado del pedido actualizado',
                'data' => $pedido
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar estado',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function cancelar($id)
    {
        DB::beginTransaction();

        try {
            $pedido = Pedido::with('detalles.stockFarmacia')->findOrFail($id);
            $user = request()->user();

            if ($pedido->cliente_id !== $user->id && $user->tipo !== 'admin') {
                return response()->json([
                    'success' => false,
                    'message' => 'No autorizado'
                ], 403);
            }

            if (!$pedido->puedeCancelar()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No se puede cancelar el pedido en su estado actual'
                ], 400);
            }

            // Revertir stock
            foreach ($pedido->detalles as $detalle) {
                $stock = $detalle->stockFarmacia;
                $stock->stock_actual += $detalle->cantidad;
                $stock->save();
            }

            // Actualizar pedido
            $pedido->estado = 'cancelado';
            $pedido->motivo_cancelacion = 'Cancelado por el cliente';
            $pedido->save();

            // Seguimiento
            SeguimientoPedido::create([
                'pedido_id' => $pedido->id,
                'estado' => 'cancelado',
                'observaciones' => 'Pedido cancelado por el cliente',
                'fecha_evento' => now(),
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Pedido cancelado exitosamente'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Error al cancelar pedido',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function seguimiento($id)
    {
        try {
            $pedido = Pedido::with('seguimientos')->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $pedido->seguimientos()->orderBy('fecha_evento', 'desc')->get()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener seguimiento'
            ], 500);
        }
    }
}
