<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * Middleware que verifica que el usuario autenticado esté en estado activo.
 *
 * Si el usuario está inactivo/suspendido, revoca todos sus tokens
 * y devuelve 403. Se aplica a rutas API protegidas.
 */
class CheckUsuarioEstado
{
    /**
     * @param Request $request
     * @param Closure $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            $usuario = Auth::user();

            if ($usuario->estado !== 'activo') {
                // Revocar todos los tokens
                $usuario->tokens()->delete();

                return response()->json([
                    'success' => false,
                    'message' => 'Tu cuenta está ' . $usuario->estado . '. Contacta al administrador.'
                ], 403);
            }
        }

        return $next($request);
    }
}
