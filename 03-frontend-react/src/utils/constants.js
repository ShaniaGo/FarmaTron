// constants.js - Para Vite
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const CATEGORIAS_MEDICAMENTOS = [
  { id: 1, nombre: 'Analgésicos' },
  { id: 2, nombre: 'Antibióticos' },
  { id: 3, nombre: 'Antigripales' },
  { id: 4, nombre: 'Digestivos' },
  { id: 5, nombre: 'Dermatológicos' },
  { id: 6, nombre: 'Vitaminas' },
];

export const ESTADOS_PEDIDO = {
  PENDIENTE: 'pendiente',
  CONFIRMADO: 'confirmado',
  EN_PREPARACION: 'en_preparacion',
  EN_CAMINO: 'en_camino',
  ENTREGADO: 'entregado',
  CANCELADO: 'cancelado',
};