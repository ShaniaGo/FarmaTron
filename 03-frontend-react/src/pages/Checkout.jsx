import React from 'react';
import { CreditCard, Wallet, Truck } from 'lucide-react';

const Checkout = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Finalizar Compra</h1>
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Página en construcción</h2>
        <p className="text-gray-600 mb-8">Próximamente podrás completar tus compras aquí</p>
        <div className="flex justify-center gap-8">
          <div className="text-center">
            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-700">Pago seguro</p>
          </div>
          <div className="text-center">
            <Wallet className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-700">Múltiples métodos</p>
          </div>
          <div className="text-center">
            <Truck className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-700">Entrega rápida</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;