import React, { useState } from 'react';
import { Package, CheckCircle, Clock, Truck, XCircle, Search } from 'lucide-react';

const Pedidos = () => {
  const [pedidos] = useState([
    {
      id: 'ORD-001',
      fecha: '2024-01-15',
      total: 45.97,
      estado: 'entregado',
      items: 3,
      farmacia: 'Farmacia Central',
      tracking: 'TRK-789012'
    },
    {
      id: 'ORD-002',
      fecha: '2024-01-14',
      total: 28.50,
      estado: 'en_camino',
      items: 2,
      farmacia: 'Farmacia Salud',
      tracking: 'TRK-789013'
    },
    {
      id: 'ORD-003',
      fecha: '2024-01-13',
      total: 62.75,
      estado: 'en_preparacion',
      items: 4,
      farmacia: 'Farmacia 24 Horas',
      tracking: 'TRK-789014'
    },
    {
      id: 'ORD-004',
      fecha: '2024-01-10',
      total: 15.99,
      estado: 'cancelado',
      items: 1,
      farmacia: 'Farmacia Express',
      tracking: 'TRK-789015'
    }
  ]);

  const getEstadoInfo = (estado) => {
    switch (estado) {
      case 'pendiente':
        return { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pendiente' };
      case 'en_preparacion':
        return { color: 'bg-blue-100 text-blue-800', icon: Package, label: 'En preparación' };
      case 'en_camino':
        return { color: 'bg-purple-100 text-purple-800', icon: Truck, label: 'En camino' };
      case 'entregado':
        return { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Entregado' };
      case 'cancelado':
        return { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Cancelado' };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: Package, label: 'Desconocido' };
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Mis Pedidos</h1>
        <p className="text-gray-600">Revisa el estado de tus pedidos y su historial</p>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar por ID de pedido o farmacia..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option value="">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="en_preparacion">En preparación</option>
            <option value="en_camino">En camino</option>
            <option value="entregado">Entregado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
      </div>

      {/* Lista de pedidos */}
      <div className="space-y-4">
        {pedidos.map((pedido) => {
          const estadoInfo = getEstadoInfo(pedido.estado);
          const EstadoIcon = estadoInfo.icon;
          
          return (
            <div key={pedido.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Header del pedido */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-gray-900">{pedido.id}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${estadoInfo.color} flex items-center gap-1`}>
                        <EstadoIcon className="h-4 w-4" />
                        {estadoInfo.label}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      {new Date(pedido.fecha).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <p className="text-2xl font-bold text-primary-600">${pedido.total.toFixed(2)}</p>
                  </div>
                </div>

                {/* Detalles del pedido */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600">Farmacia</p>
                    <p className="font-medium">{pedido.farmacia}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Productos</p>
                    <p className="font-medium">{pedido.items} items</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tracking</p>
                    <p className="font-medium">{pedido.tracking}</p>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50">
                    Ver Detalles
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Descargar Factura
                  </button>
                  {pedido.estado === 'entregado' && (
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                      Calificar Servicio
                    </button>
                  )}
                  {pedido.estado === 'en_camino' && (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      Rastrear Pedido
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mensaje si no hay pedidos */}
      {pedidos.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay pedidos</h3>
          <p className="text-gray-600 mb-6">Realiza tu primer pedido para verlo aquí</p>
          <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            Ver Catálogo
          </button>
        </div>
      )}

      {/* Estadísticas */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Estadísticas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">Pedidos Totales</p>
            <p className="text-2xl font-bold text-primary-600">{pedidos.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">Entregados</p>
            <p className="text-2xl font-bold text-green-600">
              {pedidos.filter(p => p.estado === 'entregado').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">En Proceso</p>
            <p className="text-2xl font-bold text-blue-600">
              {pedidos.filter(p => p.estado === 'en_preparacion' || p.estado === 'en_camino').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">Total Gastado</p>
            <p className="text-2xl font-bold text-purple-600">
              ${pedidos.reduce((sum, p) => sum + p.total, 0).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pedidos;