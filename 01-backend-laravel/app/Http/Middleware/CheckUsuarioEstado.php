<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckUsuarioEstado
{
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
