import React, { useState } from 'react';
import { MapPin, Phone, Clock, Star, Navigation } from 'lucide-react';

const Farmacias = () => {
  const [farmacias] = useState([
    {
      id: 1,
      nombre: 'Farmacia Central',
      direccion: 'Av. Principal 123, Centro',
      telefono: '555-0101',
      horario: '24/7',
      calificacion: 4.8,
      distancia: '1.2 km',
      servicios: ['Delivery', 'Recetas', 'Emergencias']
    },
    {
      id: 2,
      nombre: 'Farmacia Salud',
      direccion: 'Calle Secundaria 456, Norte',
      telefono: '555-0102',
      horario: '6:00 AM - 12:00 AM',
      calificacion: 4.5,
      distancia: '2.5 km',
      servicios: ['Delivery', 'Asesoría']
    },
    {
      id: 3,
      nombre: 'Farmacia 24 Horas',
      direccion: 'Boulevard 789, Sur',
      telefono: '555-0103',
      horario: '24/7',
      calificacion: 4.7,
      distancia: '3.0 km',
      servicios: ['Delivery', 'Emergencias', 'Vacunas']
    },
    {
      id: 4,
      nombre: 'Farmacia Express',
      direccion: 'Plaza Comercial 101, Este',
      telefono: '555-0104',
      horario: '8:00 AM - 10:00 PM',
      calificacion: 4.3,
      distancia: '1.8 km',
      servicios: ['Delivery Express']
    }
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Farmacias Asociadas</h1>
        <p className="text-gray-600">Encuentra la farmacia más cercana a ti</p>
      </div>

      {/* Grid de farmacias */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {farmacias.map((farmacia) => (
          <div key={farmacia.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              {/* Header de la farmacia */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{farmacia.nombre}</h3>
                  <div className="flex items-center mt-1">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="ml-1 font-semibold">{farmacia.calificacion}</span>
                    <span className="ml-2 text-gray-600">{farmacia.distancia}</span>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  <Navigation className="h-4 w-4" />
                  Ruta
                </button>
              </div>

              {/* Información */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <span>{farmacia.direccion}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <span>{farmacia.telefono}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="h-5 w-5 text-gray-400 mr-3" />
                  <span>{farmacia.horario}</span>
                </div>
              </div>

              {/* Servicios */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Servicios:</h4>
                <div className="flex flex-wrap gap-2">
                  {farmacia.servicios.map((servicio, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                    >
                      {servicio}
                    </span>
                  ))}
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3">
                <button className="flex-1 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50">
                  Ver Medicamentos
                </button>
                <button className="flex-1 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Pedir Delivery
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mapa (placeholder) */}
      <div className="mt-12 bg-gray-100 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ubicación de Farmacias</h2>
        <p className="text-gray-600 mb-6">Próximamente: Mapa interactivo con ubicaciones en tiempo real</p>
        <div className="h-64 bg-gray-300 rounded-lg flex items-center justify-center">
          <MapPin className="h-12 w-12 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default Farmacias;