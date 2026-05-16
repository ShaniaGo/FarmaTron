/**
 * Panel de auditoría del sistema (solo administradores).
 * @module pages/Auditoria
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ClipboardList, Users, Package, DollarSign, Shield } from 'lucide-react';
import api from '../api';

const formatFecha = (fecha) => {
  if (!fecha) return '—';
  return new Date(fecha).toLocaleString('es-VE', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
};

const Auditoria = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAuditoria = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/auditoria');
      if (res.data?.success) {
        setData(res.data.data);
      } else {
        setError(res.data?.message || 'No se pudo cargar la auditoría');
      }
    } catch (err) {
      setError(
        err.response?.status === 403
          ? 'No tienes permiso para ver esta sección'
          : err.response?.data?.message || 'Error al cargar auditoría'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAuditoria();
  }, [fetchAuditoria]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <p className="text-red-600 mb-4">{error}</p>
        <button
          type="button"
          onClick={fetchAuditoria}
          className="text-primary-600 hover:underline"
        >
          Reintentar
        </button>
      </div>
    );
  }

  const resumen = data?.resumen || {};

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <ClipboardList className="h-8 w-8 text-primary-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Auditoría</h1>
          <p className="text-gray-600 text-sm">Panel exclusivo para administradores</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-5">
          <Users className="h-6 w-6 text-blue-600 mb-2" />
          <p className="text-sm text-gray-500">Usuarios</p>
          <p className="text-2xl font-bold">{resumen.total_usuarios ?? 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-5">
          <Package className="h-6 w-6 text-purple-600 mb-2" />
          <p className="text-sm text-gray-500">Pedidos</p>
          <p className="text-2xl font-bold">{resumen.total_pedidos ?? 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-5">
          <DollarSign className="h-6 w-6 text-green-600 mb-2" />
          <p className="text-sm text-gray-500">Ventas (USD)</p>
          <p className="text-2xl font-bold">
            ${Number(resumen.ventas_totales || 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-5">
          <Shield className="h-6 w-6 text-primary-600 mb-2" />
          <p className="text-sm text-gray-500">Actualizado</p>
          <p className="text-sm font-medium mt-1">{formatFecha(data?.generado_en)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="font-semibold text-gray-900">Pedidos recientes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-600">
                <tr>
                  <th className="px-4 py-3">Pedido</th>
                  <th className="px-4 py-3">Cliente</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {(data?.pedidos_recientes || []).map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{p.numero_pedido || `#${p.id}`}</td>
                    <td className="px-4 py-3 text-gray-600">{p.cliente || '—'}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 capitalize">
                        {p.estado?.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      ${Number(p.total).toFixed(2)}
                    </td>
                  </tr>
                ))}
                {(data?.pedidos_recientes || []).length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                      Sin pedidos registrados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Usuarios por rol</h2>
            <ul className="space-y-2">
              {Object.entries(resumen.usuarios_por_tipo || {}).map(([tipo, total]) => (
                <li key={tipo} className="flex justify-between text-sm">
                  <span className="capitalize text-gray-600">{tipo}</span>
                  <span className="font-semibold">{total}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Últimos accesos</h2>
            <ul className="space-y-3">
              {(data?.accesos_recientes || []).map((u) => (
                <li key={u.id} className="text-sm border-b pb-2 last:border-0">
                  <p className="font-medium text-gray-900">{u.nombre || u.email}</p>
                  <p className="text-gray-500 text-xs">
                    {u.tipo} · {formatFecha(u.ultimo_login)}
                  </p>
                </li>
              ))}
              {(data?.accesos_recientes || []).length === 0 && (
                <li className="text-gray-500 text-sm">Sin registros de acceso</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auditoria;
