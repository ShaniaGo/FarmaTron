<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * Obtiene la tasa oficial USD del BCV desde bcv.org.ve con caché.
 */
class BcvService
{
    private const CACHE_KEY = 'bcv_tasa_usd';

    private const CACHE_TTL_HOURS = 12;

  /**
   * @return array{moneda: string, tasa: float, fecha_valor: string|null, fecha_valor_texto: string|null, fuente: string, actualizado_en: string}
   */
    public function obtenerTasaUsd(): array
    {
        $cache = Cache::store('file');

        return $cache->remember(self::CACHE_KEY, now()->addHours(self::CACHE_TTL_HOURS), function () {
            $datos = $this->consultarBcv();

            if ($datos !== null) {
                return $datos;
            }

            $fallback = config('services.bcv.fallback_tasa');
            if ($fallback) {
                return $this->respuesta(
                    (float) $fallback,
                    null,
                    null,
                    'fallback'
                );
            }

            throw new \RuntimeException('No se pudo obtener la tasa del BCV');
        });
    }

    public function limpiarCache(): void
    {
        Cache::store('file')->forget(self::CACHE_KEY);
    }

    /**
     * @return array{moneda: string, tasa: float, fecha_valor: string|null, fecha_valor_texto: string|null, fuente: string, actualizado_en: string}|null
     */
    private function consultarBcv(): ?array
    {
        try {
            $request = Http::timeout(15)
                ->withOptions([
                    'verify' => (bool) config('services.bcv.verify_ssl', true),
                ])
                ->withHeaders([
                    'User-Agent' => 'Mozilla/5.0 (compatible; FarmaTron/1.0)',
                    'Accept' => 'text/html,application/xhtml+xml',
                ]);

            $response = $request->get('https://www.bcv.org.ve');

            if (! $response->successful()) {
                return null;
            }

            $html = $response->body();

            if (! preg_match('/id="dolar"[^>]*>.*?<strong[^>]*>([\d,\.]+)<\/strong>/s', $html, $match)) {
                return null;
            }

            $tasa = $this->normalizarMonto($match[1]);
            if ($tasa <= 0) {
                return null;
            }

            $fechaValor = null;
            $fechaValorTexto = null;

            if (preg_match('/Fecha Valor:.*?content="([^"]+)"/s', $html, $fechaMatch)) {
                $fechaValor = substr($fechaMatch[1], 0, 10);
            }

            if (preg_match('/Fecha Valor:.*?<span[^>]*>([^<]+)<\/span>/s', $html, $fechaTextoMatch)) {
                $fechaValorTexto = trim(html_entity_decode($fechaTextoMatch[1]));
            }

            return $this->respuesta($tasa, $fechaValor, $fechaValorTexto, 'bcv');
        } catch (\Throwable $e) {
            Log::warning('Error al consultar tasa BCV: '.$e->getMessage());

            return null;
        }
    }

    private function normalizarMonto(string $valor): float
    {
        $limpio = trim($valor);
        $limpio = str_replace(',', '.', $limpio);

        return (float) $limpio;
    }

    /**
     * @return array{moneda: string, tasa: float, fecha_valor: string|null, fecha_valor_texto: string|null, fuente: string, actualizado_en: string}
     */
    private function respuesta(float $tasa, ?string $fechaValor, ?string $fechaValorTexto, string $fuente): array
    {
        return [
            'moneda' => 'USD',
            'tasa' => round($tasa, 4),
            'fecha_valor' => $fechaValor,
            'fecha_valor_texto' => $fechaValorTexto,
            'fuente' => $fuente,
            'actualizado_en' => now()->toIso8601String(),
        ];
    }
}
