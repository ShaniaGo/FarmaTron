<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductoController;
use App\Http\Controllers\Api\PedidoController;
use App\Http\Controllers\Api\CarritoController;
use App\Http\Controllers\Api\FarmaciaController;
use App\Http\Controllers\Api\ProfileController;
use Illuminate\Support\Facades\Route;

// Ruta de prueba
Route::get('/test', function () {
    return response()->json([
        'success' => true,
        'message' => 'API FarmaLink funcionando',
        'version' => '1.0.0',
        'timestamp' => now()->toDateTimeString(),
    ]);
});

// Rutas públicas
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Productos públicos
Route::prefix('productos')->group(function () {
    Route::get('/', [ProductoController::class, 'index']);
    Route::get('/categorias', [ProductoController::class, 'categorias']);
    Route::get('/destacados', [ProductoController::class, 'productosDestacados']);
    Route::get('/{id}', [ProductoController::class, 'show']);
    Route::get('/{id}/farmacias', [ProductoController::class, 'farmaciasDisponibles']);
});

// Farmacias públicas
Route::prefix('farmacias')->group(function () {
    Route::get('/', [FarmaciaController::class, 'index']);
    Route::get('/{id}', [FarmaciaController::class, 'show']);
    Route::get('/{id}/productos', [FarmaciaController::class, 'productos']);
});

// Rutas protegidas con Sanctum
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'user']);
        Route::get('/verify', [AuthController::class, 'verify']);
    });

    // Perfil
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'show']);
        Route::put('/', [ProfileController::class, 'update']);
        Route::post('/change-password', [ProfileController::class, 'changePassword']);
        Route::post('/upload-photo', [ProfileController::class, 'uploadPhoto']);
    });

    // Carrito
    Route::prefix('carrito')->group(function () {
        Route::get('/', [CarritoController::class, 'index']);
        Route::post('/agregar', [CarritoController::class, 'agregar']);
        Route::put('/{id}', [CarritoController::class, 'actualizar']);
        Route::delete('/{id}', [CarritoController::class, 'eliminar']);
        Route::delete('/', [CarritoController::class, 'limpiar']);
    });

    // Pedidos
    Route::prefix('pedidos')->group(function () {
        Route::get('/', [PedidoController::class, 'index']);
        Route::post('/', [PedidoController::class, 'store']);
        Route::get('/{id}', [PedidoController::class, 'show']);
        Route::post('/{id}/estado', [PedidoController::class, 'updateEstado']);
        Route::delete('/{id}/cancelar', [PedidoController::class, 'cancelar']);
        Route::get('/{id}/seguimiento', [PedidoController::class, 'seguimiento']);
    });

    // Productos protegidos (para agregar/actualizar si es admin)
    Route::middleware('role:admin,farmaceutico')->prefix('productos')->group(function () {
        Route::post('/', [ProductoController::class, 'store']);
        Route::put('/{id}', [ProductoController::class, 'update']);
        Route::delete('/{id}', [ProductoController::class, 'destroy']);
    });
});
