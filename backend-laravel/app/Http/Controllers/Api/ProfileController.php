<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

/**
 * Perfil del usuario autenticado (Sanctum).
 */
class ProfileController extends Controller
{
    /**
     * Sube o actualiza la foto de perfil.
     */
    public function uploadPhoto(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'foto' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ], [], [
            'foto' => 'foto de perfil',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Archivo no válido',
                'errors' => $validator->errors(),
            ], 422);
        }

        $usuario = $request->user();

        if ($usuario->foto_perfil && Storage::disk('public')->exists($usuario->foto_perfil)) {
            Storage::disk('public')->delete($usuario->foto_perfil);
        }

        $path = $request->file('foto')->store('fotos_perfil', 'public');
        $usuario->foto_perfil = $path;
        $usuario->save();

        return response()->json([
            'success' => true,
            'message' => 'Foto de perfil actualizada',
            'data' => [
                'usuario' => $usuario->fresh(),
                'foto_perfil_url' => $usuario->foto_perfil_url,
            ],
        ]);
    }
}
