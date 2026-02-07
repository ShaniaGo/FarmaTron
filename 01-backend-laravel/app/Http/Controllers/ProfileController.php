<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    /**
     * Obtener perfil del usuario
     */
    public function show()
    {
        $usuario = Auth::user();

        return response()->json([
            'success' => true,
            'usuario' => $usuario
        ]);
    }

    /**
     * Actualizar perfil
     */
    public function update(Request $request)
    {
        $usuario = Auth::user();

        $validator = Validator::make($request->all(), [
            'nombre_completo' => 'sometimes|string|max:100',
            'telefono' => 'sometimes|string|max:20',
            'direccion' => 'nullable|string',
            'fecha_nacimiento' => 'nullable|date',
            'genero' => 'nullable|in:M,F,Otro',
            'foto_perfil' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $usuario->update($request->only([
            'nombre_completo',
            'telefono',
            'direccion',
            'fecha_nacimiento',
            'genero',
            'foto_perfil'
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Perfil actualizado exitosamente',
            'usuario' => $usuario
        ]);
    }

    /**
     * Cambiar contraseña
     */
    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $usuario = Auth::user();

        if (!Hash::check($request->current_password, $usuario->contraseña)) {
            return response()->json([
                'success' => false,
                'message' => 'La contraseña actual es incorrecta'
            ], 400);
        }

        $usuario->contraseña = Hash::make($request->new_password);
        $usuario->save();

        return response()->json([
            'success' => true,
            'message' => 'Contraseña actualizada exitosamente'
        ]);
    }

    /**
     * Subir foto de perfil
     */
    public function uploadPhoto(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'foto' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $usuario = Auth::user();

        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('fotos_perfil', 'public');
            $usuario->foto_perfil = $path;
            $usuario->save();
        }

        return response()->json([
            'success' => true,
            'message' => 'Foto de perfil actualizada',
            'foto_url' => asset('storage/' . $usuario->foto_perfil)
        ]);
    }
}
