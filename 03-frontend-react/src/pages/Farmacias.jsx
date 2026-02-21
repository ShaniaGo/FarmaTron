import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Phone, Clock, Star, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Coordenadas Caracas 1034, Distrito Capital - Farmacia FRS 23
const FARMACIA_FRS23 = {
  id: 1,
  nombre: 'Farmacia FRS 23',
  direccion: 'Caracas 1034, Distrito Capital',
  direccionCompleta: 'Caracas 1034, Distrito Capital, Farmacia FRS 23',
  telefono: '555-0101',
  horario: '24/7',
  calificacion: 4.8,
  distancia: '0 km',
  servicios: ['Delivery', 'Recetas', 'Emergencias'],
  lat: 10.4806,
  lng: -66.9036,
};

// Icono por defecto de Leaflet (evita icono roto)
const createIcon = () =>
  new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

const Farmacias = () => {
  const [farmacias] = useState([
    FARMACIA_FRS23,
    // {
    //   id: 2,
    //   nombre: 'Farmacia Central',
    //   direccion: 'Av. Principal 123, Centro',
    //   telefono: '555-0102',
    //   horario: '24/7',
    //   calificacion: 4.5,
    //   distancia: '1.2 km',
    //   servicios: ['Delivery', 'Recetas', 'Emergencias'],
    //   lat: 10.4850,
    //   lng: -66.9080,
    // },
    // {
    //   id: 3,
    //   nombre: 'Farmacia Salud',
    //   direccion: 'Calle Secundaria 456, Norte',
    //   telefono: '555-0103',
    //   horario: '6:00 AM - 12:00 AM',
    //   calificacion: 4.5,
    //   distancia: '2.5 km',
    //   servicios: ['Delivery', 'Asesoría'],
    //   lat: 10.4760,
    //   lng: -66.8980,
    // },
    // {
    //   id: 4,
    //   nombre: 'Farmacia 24 Horas',
    //   direccion: 'Boulevard 789, Sur',
    //   telefono: '555-0104',
    //   horario: '24/7',
    //   calificacion: 4.7,
    //   distancia: '3.0 km',
    //   servicios: ['Delivery', 'Emergencias', 'Vacunas'],
    //   lat: 10.4720,
    //   lng: -66.9150,
    // },
    // {
    //   id: 5,
    //   nombre: 'Farmacia Express',
    //   direccion: 'Plaza Comercial 101, Este',
    //   telefono: '555-0105',
    //   horario: '8:00 AM - 10:00 PM',
    //   calificacion: 4.3,
    //   distancia: '1.8 km',
    //   servicios: ['Delivery Express'],
    //   lat: 10.4920,
    //   lng: -66.8950,
    // },
  ]);

  const centerCaracas = useMemo(() => [10.4806, -66.9036], []);
  const defaultIcon = useMemo(() => createIcon(), []);

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
                <a
                  href={farmacia.lat != null ? `https://www.google.com/maps/dir/?api=1&destination=${farmacia.lat},${farmacia.lng}` : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  <Navigation className="h-4 w-4" />
                  Ruta
                </a>
              </div>

              {/* Información */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <span>{farmacia.direccionCompleta || farmacia.direccion}</span>
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

      {/* Mapa con geolocalización */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ubicación de Farmacias</h2>
        <p className="text-gray-600 mb-4">
          Caracas 1034, Distrito Capital — <strong>Farmacia FRS 23</strong> marcada en el mapa
        </p>
        <div className="rounded-lg overflow-hidden border border-gray-200 shadow-md" style={{ minHeight: '400px' }}>
          <MapContainer
            center={centerCaracas}
            zoom={14}
            scrollWheelZoom
            className="w-full h-[400px] z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {farmacias.filter((f) => f.lat != null && f.lng != null).map((f) => (
              <Marker key={f.id} position={[f.lat, f.lng]} icon={defaultIcon}>
                <Popup>
                  <strong>{f.nombre}</strong>
                  <br />
                  {f.direccionCompleta || f.direccion}
                  {f.telefono && (
                    <>
                      <br />
                      {f.telefono}
                    </>
                  )}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Farmacias;