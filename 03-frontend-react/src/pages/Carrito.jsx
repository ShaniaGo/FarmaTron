/**
 * Página del carrito: listado por farmacia, actualizar cantidad, eliminar ítem, resumen y enlace a pedidos.
 * @module pages/Carrito
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, Pill } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../api';
import { useAuth } from '../context/AuthContext';

/**
 * Carrito de compras del usuario autenticado. Agrupa ítems por farmacia y muestra total con envío.
 * @returns {JSX.Element}
 */
const Carrito = () => {
  const { user } = useAuth();
  const [itemsPorFarmacia, setItemsPorFarmacia] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(null);
  const [deleting, setDeleting] = useState(null);

  /** Obtiene el carrito del usuario desde la API y actualiza estado (items por farmacia, total). */
  const fetchCarrito = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/carrito');
      if (res.data?.success) {
        const data = res.data.data;
        // console.log(data.items_por_farmacia[0].items[0].stock_farmacia.medicamento.nombre_comercial);
        setItemsPorFarmacia(data.items_por_farmacia || []);
        setTotal(parseFloat(data.total) || 0);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setItemsPorFarmacia([]);
        setTotal(0);
      } else {
        setError(err.response?.data?.message || 'Error al cargar el carrito');
        setItemsPorFarmacia([]);
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCarrito();
  }, [fetchCarrito]);

  /**
   * Precio unitario de un ítem (con promoción si aplica).
   * @param {Object} item - Ítem del carrito con stockFarmacia
   * @returns {number}
   */
  const getPrecioItem = (item) => {
    const sf = item.stock_farmacia;
    if (!sf) return 0;
    if (sf.promocion && sf.precio_promocion) return parseFloat(sf.precio_promocion);
    return parseFloat(sf.precio_venta) || 0;
  };

  /**
   * Actualiza la cantidad de un ítem o lo elimina si newQuantity < 1.
   * @param {Object} item - Ítem del carrito
   * @param {number} newQuantity
   */
  const updateQuantity = async (item, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(item);
      return;
    }
    if (newQuantity > (item.stockFarmacia?.stock_actual || 99)) {
      toast.error('No hay suficiente stock');
      return;
    }
    setUpdating(item.id);
    try {
      await api.put(`/carrito/${item.id}`, { cantidad: newQuantity });
      toast.success('Cantidad actualizada');
      fetchCarrito();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al actualizar');
    } finally {
      setUpdating(null);
    }
  };

  /** Elimina un ítem del carrito y recarga la lista. */
  const removeItem = async (item) => {
    setDeleting(item.id);
    try {
      await api.delete(`/carrito/${item.id}`);
      toast.success('Producto eliminado');
      fetchCarrito();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al eliminar');
    } finally {
      setDeleting(null);
    }
  };

  const totalItems = itemsPorFarmacia.reduce((sum, g) => sum + (g.items?.length || 0), 0);
  const subtotal = itemsPorFarmacia.reduce((acc, g) => {
    let s = 0;
    (g.items || []).forEach((item) => {
      if (item.stockFarmacia?.disponible) {
        s += getPrecioItem(item) * item.cantidad;
      }
    });
    return acc + s;
  }, 0);
  const costoEnvio = total - subtotal;

  // No autenticado
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Inicia sesión para ver tu carrito</h2>
          <p className="text-gray-600 mb-6">Necesitas una cuenta para agregar medicamentos al carrito</p>
          <Link
            to="/login?redirect=/carrito"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  // Loading
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Cargando carrito...</p>
        </div>
      </div>
    );
  }

  // Carrito vacío
  if (!error && itemsPorFarmacia.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-6">Agrega medicamentos para continuar</p>
          <Link
            to="/medicamentos"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <ShoppingCart className="h-5 w-5" />
            Ver Catálogo
          </Link>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <Pill className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error al cargar</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchCarrito}
            className="text-primary-600 hover:underline"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Carrito de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de productos */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Productos ({totalItems})
              </h2>

              <div className="space-y-8">
                {itemsPorFarmacia.map((grupo) => (
                  <div key={grupo.farmacia?.id || Math.random()}>
                    {grupo.farmacia && (
                      <h3 className="text-sm font-medium text-gray-500 mb-4">
                        {grupo.farmacia.nombre}
                      </h3>
                    )}
                    <div className="space-y-6">
                      {(grupo.items || []).map((item) => {
                        const medicamento = item.stock_farmacia?.medicamento;
                        const farmacia = item.stockFarmacia?.farmacia;
                        const precio = getPrecioItem(item);
                        const isUpdating = updating === item.id;
                        const isDeleting = deleting === item.id;

                        return (
                          <div
                            key={item.id}
                            className={`flex items-center border-b pb-6 ${isDeleting ? 'opacity-50' : ''}`}
                          >
                            <div className="w-20 h-20 bg-primary-100 rounded-lg mr-4 flex items-center justify-center">
                              <Pill className="h-8 w-8 text-primary-600" />
                            </div>

                            <div className="flex-grow">
                              <h3 className="font-semibold text-gray-900">
                                {medicamento?.nombre_comercial || 'Medicamento'}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                {farmacia?.nombre || ''}
                              </p>
                              <p className="font-bold text-primary-600 mt-1">
                                ${precio.toFixed(2)}
                              </p>
                            </div>

                            <div className="flex items-center mr-6">
                              <button
                                onClick={() => updateQuantity(item, item.cantidad - 1)}
                                disabled={isUpdating || isDeleting || item.cantidad <= 1}
                                className="w-8 h-8 flex items-center justify-center border rounded-l hover:bg-gray-100 disabled:opacity-50"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="w-12 h-8 flex items-center justify-center border-t border-b">
                                {item.cantidad}
                              </span>
                              <button
                                onClick={() => updateQuantity(item, item.cantidad + 1)}
                                disabled={isUpdating || isDeleting || item.cantidad >= (item.stockFarmacia?.stock_actual || 99)}
                                className="w-8 h-8 flex items-center justify-center border rounded-r hover:bg-gray-100 disabled:opacity-50"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="text-right">
                              <p className="font-bold text-gray-900 mb-2">
                                ${(precio * item.cantidad).toFixed(2)}
                              </p>
                              <button
                                onClick={() => removeItem(item)}
                                disabled={isDeleting}
                                className="text-red-600 hover:text-red-800 disabled:opacity-50"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Resumen del pedido */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Resumen del Pedido</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Costo de envío</span>
                <span className="font-semibold">${costoEnvio.toFixed(2)}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Link
                to="/pedidos"
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
              >
                Continuar al Pago
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                to="/medicamentos"
                className="w-full border border-primary-600 text-primary-600 py-3 px-4 rounded-lg hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Agregar más productos
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t">
              <h3 className="font-semibold text-gray-900 mb-3">Información importante:</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Entrega en 45-60 minutos</li>
                <li>• Medicamentos con receta requieren validación</li>
                <li>• Pago seguro con tarjeta o efectivo</li>
                <li>• Cancelación gratuita hasta 30 min después del pedido</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
