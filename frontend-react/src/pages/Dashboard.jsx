import React from 'react';
import { BarChart3, TrendingUp, Users, Package } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Panel de Control</h2>
        <p className="text-gray-600 mb-8">Próximamente: Estadísticas y métricas de uso</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow">
            <BarChart3 className="h-8 w-8 text-primary-600 mx-auto mb-3" />
            <h3 className="font-bold text-lg">Ventas</h3>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-bold text-lg">Crecimiento</h3>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-bold text-lg">Usuarios</h3>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Package className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-bold text-lg">Pedidos</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;