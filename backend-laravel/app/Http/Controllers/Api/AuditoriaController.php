<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pedido;
use App\Models\Usuario;
use Illuminate\Http\JsonResponse;

/**
 * Panel de auditoría: resumen del sistema (solo administradores).
 */
class AuditoriaController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $resumen = [
                'total_usuarios' => Usuario::count(),
                'usuarios_por_tipo' => Usuario::query()
                    ->selectRaw('tipo, COUNT(*) as total')
                    ->groupBy('tipo')
                    ->pluck('total', 'tipo'),
                'total_pedidos' => Pedido::count(),
                'pedidos_por_estado' => Pedido::query()
                    ->selectRaw('estado, COUNT(*) as total')
                    ->groupBy('estado')
                    ->pluck('total', 'estado'),
                'ventas_totales' => (float) Pedido::whereNotIn('estado', ['cancelado'])->sum('total'),
            ];

            $pedidosRecientes = Pedido::with(['cliente:id,primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,email', 'farmacia:id,nombre'])
                ->orderByDesc('fecha_pedido')
                ->limit(15)
                ->get()
                ->map(fn (Pedido $p) => [
                    'id' => $p->id,
                    'numero_pedido' => $p->numero_pedido,
                    'estado' => $p->estado,
                    'total' => (float) $p->total,
                    'fecha_pedido' => $p->fecha_pedido,
                    'cliente' => $this->nombreUsuario($p->cliente),
                    'farmacia' => $p->farmacia?->nombre,
                ]);

            $accesosRecientes = Usuario::query()
                ->whereNotNull('ultimo_login')
                ->orderByDesc('ultimo_login')
                ->limit(10)
                ->get(['id', 'email', 'tipo', 'ultimo_login', 'primer_nombre', 'primer_apellido'])
                ->map(fn (Usuario $u) => [
                    'id' => $u->id,
                    'email' => $u->email,
                    'tipo' => $u->tipo,
                    'nombre' => $this->nombreUsuario($u),
                    'ultimo_login' => $u->ultimo_login,
                ]);

            return response()->json([
                'success' => true,
                'data' => [
                    'resumen' => $resumen,
                    'pedidos_recientes' => $pedidosRecientes,
                    'accesos_recientes' => $accesosRecientes,
                    'generado_en' => now()->toIso8601String(),
                ],
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al cargar datos de auditoría',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    private function nombreUsuario(?Usuario $usuario): ?string
    {
        if (! $usuario) {
            return null;
        }

        return trim(implode(' ', array_filter([
            $usuario->primer_nombre,
            $usuario->segundo_nombre,
            $usuario->primer_apellido,
            $usuario->segundo_apellido,
        ])));
    }
}
