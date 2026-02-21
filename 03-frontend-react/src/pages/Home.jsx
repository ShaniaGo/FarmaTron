/**
 * Página de inicio (landing): hero, características y CTA al catálogo.
 * @module pages/Home
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Shield, Clock, Search } from 'lucide-react';

/**
 * @returns {JSX.Element} Página principal con hero y enlace a medicamentos
 */
const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Encuentra tus medicamentos con FarmaTron
          </h1>
          <p className="text-xl mb-8">
            Delivery rápido y seguro de medicamentos a tu domicilio
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar medicamentos..."
                className="w-full px-6 py-4 rounded-full text-gray-900"
              />
              <button className="absolute right-2 top-2 bg-primary-600 text-white p-3 rounded-full">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Delivery Rápido</h3>
            <p className="text-gray-600">Entrega en menos de 60 minutos</p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Medicamentos Originales</h3>
            <p className="text-gray-600">Garantía de autenticidad</p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">24/7 Disponible</h3>
            <p className="text-gray-600">Servicio las 24 horas del día</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para ordenar?</h2>
          <Link
            to="/medicamentos"
            className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg text-lg font-semibold hover:bg-primary-700"
          >
            Ver Catálogo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;