/**
 * Constantes globales del frontend FarmaLink.
 * @module utils/constants
 */

/**
 * URL base de la API según el host (localhost vs red).
 * @type {string}
 */
export const API_URL = (() => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:8000/api';
  }
  return 'http://192.168.0.186:8000/api';
})();

/**
 * Categorías de medicamentos (referencia/fallback).
 * @type {{ id: number, nombre: string }[]}
 */
export const CATEGORIAS_MEDICAMENTOS = [
  { id: 1, nombre: 'Analgésicos' },
  { id: 2, nombre: 'Antibióticos' },
  { id: 3, nombre: 'Antigripales' },
  { id: 4, nombre: 'Digestivos' },
  { id: 5, nombre: 'Dermatológicos' },
  { id: 6, nombre: 'Vitaminas' },
];

/**
 * Estados posibles de un pedido (valores enviados por el backend).
 * @type {Object.<string, string>}
 */
export const ESTADOS_PEDIDO = {
  PENDIENTE: 'pendiente',
  CONFIRMADO: 'confirmado',
  EN_PREPARACION: 'en_preparacion',
  EN_CAMINO: 'en_camino',
  ENTREGADO: 'entregado',
  CANCELADO: 'cancelado',
};