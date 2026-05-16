<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Restringe el acceso según el campo tipo del usuario (admin, cliente, etc.).
 */
class CheckRole
{
    /**
     * @param  string  ...$roles  Roles permitidos separados por coma en la ruta (role:admin)
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        if (! $user) {
            return response()->json([
                'success' => false,
                'message' => 'No autenticado',
            ], 401);
        }

        $permitidos = collect($roles)
            ->flatMap(fn (string $r) => explode(',', $r))
            ->map(fn (string $r) => trim($r))
            ->filter()
            ->all();

        if (! in_array($user->tipo, $permitidos, true)) {
            return response()->json([
                'success' => false,
                'message' => 'No tienes permiso para acceder a este recurso',
            ], 403);
        }

        return $next($request);
    }
}
