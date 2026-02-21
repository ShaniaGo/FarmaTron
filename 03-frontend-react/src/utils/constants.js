// constants.js - Para Vite
export const API_URL = (() => {
  // Si estamos en la misma máquina que el backend
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:8000/api';
  }
  // Si accedemos desde otra máquina, usar la IP del servidor
  return 'http://192.168.0.186:8000/api'; // Cambia por tu IP real
})();

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