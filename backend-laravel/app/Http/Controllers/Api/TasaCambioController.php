<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\BcvService;
use Illuminate\Http\JsonResponse;

/**
 * Tasa de cambio oficial USD (BCV) para equivalencia en bolívares.
 */
class TasaCambioController extends Controller
{
    public function __construct(
        private readonly BcvService $bcvService
    ) {}

    /**
     * Devuelve la tasa USD/VES del BCV (cacheada).
     */
    public function show(): JsonResponse
    {
        try {
            $datos = $this->bcvService->obtenerTasaUsd();

            return response()->json([
                'success' => true,
                'data' => $datos,
            ]);
        } catch (\Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'No se pudo obtener la tasa de cambio del BCV',
            ], 503);
        }
    }
}
