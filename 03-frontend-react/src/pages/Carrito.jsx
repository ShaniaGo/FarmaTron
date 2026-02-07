import React, { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Carrito = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      nombre: 'Paracetamol 500mg',
      precio: 5.99,
      cantidad: 2,
      farmacia: 'Farmacia Central',
      imagen: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      nombre: 'Ibuprofeno 400mg',
      precio: 7.50,
      cantidad: 1,
      farmacia: 'Farmacia 24 Horas',
      imagen: 'https://via.placeholder.com/150'
    },
    {
      id: 3,
      nombre: 'Vitamina C 1000mg',
      precio: 9.99,
      cantidad: 3,
      farmacia: 'Farmacia Salud',
      imagen: 'https://via.placeholder.com/150'
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    
    setItems(items.map(item => 
      item.id === id ? { ...item, cantidad: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const envio = 2.99;
  const total = subtotal + envio;

  if (items.length === 0) {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Carrito de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de productos */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Productos ({items.length})</h2>
              
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center border-b pb-6">
                    {/* Imagen */}
                    <div className="w-20 h-20 bg-gray-100 rounded-lg mr-4 flex items-center justify-center">
                      <div className="text-primary-600 font-bold text-lg">M</div>
                    </div>
                    
                    {/* Info */}
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900">{item.nombre}</h3>
                      <p className="text-gray-600 text-sm">{item.farmacia}</p>
                      <p className="font-bold text-primary-600 mt-1">${item.precio.toFixed(2)}</p>
                    </div>
                    
                    {/* Cantidad */}
                    <div className="flex items-center mr-6">
                      <button
                        onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                        className="w-8 h-8 flex items-center justify-center border rounded-l hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 h-8 flex items-center justify-center border-t border-b">
                        {item.cantidad}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                        className="w-8 h-8 flex items-center justify-center border rounded-r hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    {/* Subtotal y eliminar */}
                    <div className="text-right">
                      <p className="font-bold text-gray-900 mb-2">
                        ${(item.precio * item.cantidad).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
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
                <span className="font-semibold">${envio.toFixed(2)}</span>
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
                to="/checkout"
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

            {/* Información adicional */}
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