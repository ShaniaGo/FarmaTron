<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cedula' => 'required|string|max:20|unique:usuarios',
            'nombre_completo' => 'required|string|max:100',
            'email' => 'required|string|email|max:100|unique:usuarios',
            'clave' => 'required|string|min:8|confirmed',
            'telefono' => 'required|string|max:20',
            'direccion' => 'nullable|string',
            'tipo' => 'in:cliente,farmaceutico,repartidor,admin',
            'fecha_nacimiento' => 'nullable|date',
            'genero' => 'nullable|in:M,F,Otro',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $usuario = Usuario::create([
                'cedula' => $request->cedula,
                'nombre_completo' => $request->nombre_completo,
                'email' => $request->email,
                'clave' => Hash::make($request->clave),
                'telefono' => $request->telefono,
                'direccion' => $request->direccion,
                'tipo' => $request->tipo ?? 'cliente',
                'fecha_nacimiento' => $request->fecha_nacimiento,
                'genero' => $request->genero,
                'estado' => 'activo',
                'fecha_registro' => now(),
            ]);

            $token = $usuario->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Usuario registrado exitosamente',
                'data' => [
                    'usuario' => $usuario,
                    'token' => $token,
                    'token_type' => 'Bearer'
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al registrar usuario',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'clave' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $usuario = Usuario::where('email', $request->email)->first();

            if (!$usuario || !Hash::check($request->clave, $usuario->clave)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Credenciales incorrectas'
                ], 401);
            }

            if ($usuario->estado !== 'activo') {
                return response()->json([
                    'success' => false,
                    'message' => 'Tu cuenta está ' . $usuario->estado
                ], 403);
            }

            $usuario->ultimo_login = now();
            $usuario->save();

            $token = $usuario->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Inicio de sesión exitoso',
                'data' => [
                    'usuario' => $usuario,
                    'token' => $token,
                    'token_type' => 'Bearer'
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al registrar usuario',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Sesión cerrada exitosamente'
        ]);
    }

    public function user(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => [
                'usuario' => $request->user()->load(['pedidos', 'carrito'])
            ]
        ]);
    }

    public function verify(Request $request)
    {
        return response()->json([
            'success' => true,
            'message' => 'Token válido',
            'data' => [
                'usuario' => $request->user()
            ]
        ]);
    }
}
