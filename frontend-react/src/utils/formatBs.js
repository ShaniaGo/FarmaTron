/**
 * Formatea un monto en bolívares (referencia BCV).
 * @param {number} montoUsd - Monto en dólares
 * @param {number} tasa - Tasa USD/VES del BCV
 * @returns {string}
 */
export function aBolivares(montoUsd, tasa) {
  if (!tasa || tasa <= 0) return '—';
  const bs = montoUsd * tasa;
  return new Intl.NumberFormat('es-VE', {
    style: 'currency',
    currency: 'VES',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(bs);
}
