import React from 'react';
import { MessageSquare, Send } from 'lucide-react';

const Chat = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Chat de Soporte</h1>
      <div className="text-center py-12">
        <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Soporte en tiempo real</h2>
        <p className="text-gray-600 mb-8">Próximamente: Chat con farmacias y soporte técnico</p>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary-100 p-2 rounded-full">
              <Send className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold">Mensajería instantánea</h3>
              <p className="text-sm text-gray-600">Comunicación directa</p>
            </div>
          </div>
          <p className="text-gray-700">
            Podrás comunicarte directamente con las farmacias para consultas sobre medicamentos, 
            pedidos especiales o seguimiento de entregas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;