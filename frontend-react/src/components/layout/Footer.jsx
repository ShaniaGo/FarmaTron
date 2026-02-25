import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Pill } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo y descripción */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/logo_farmatrom_recorte.png" alt="" 
                    className='rounded-full h-6 shadow-lg 
                        border-default rounded-base shadow-xs'/>
              <span className="text-2xl font-bold">FarmaTrom</span>
            </div>
            <p className="text-gray-400">
              Tu plataforma confiable para la entrega de medicamentos a domicilio.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="/medicamentos" className="text-gray-400 hover:text-white">
                  Medicamentos
                </a>
              </li>
              <li>
                <a href="/farmacias" className="text-gray-400 hover:text-white">
                  Farmacias
                </a>
              </li>
              <li>
                <a href="/pedidos" className="text-gray-400 hover:text-white">
                  Mis Pedidos
                </a>
              </li>
              <li>
                <a href="/perfil" className="text-gray-400 hover:text-white">
                  Mi Perfil
                </a>
              </li>
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nuestros Servicios</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Delivery 24/7</li>
              <li className="text-gray-400">Medicamentos con receta</li>
              <li className="text-gray-400">Seguimiento en tiempo real</li>
              <li className="text-gray-400">Asesoría farmacéutica</li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-5 w-5" />
                <span>0212 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-5 w-5" />
                <span>info@farmaTron.com</span>
              </li>
              <li className="flex items-start space-x-2 text-gray-400">
                <MapPin className="h-5 w-5 mt-1" />
                <span>Av. Principal 123, Ciudad, País</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          {/* Logo de la universidad y créditos */}
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                
                {/* Logo UNEXCA y descripción */}
                <div className="flex items-center space-x-3">
                <img 
                    src="/logo_unexca.jpg" 
                    alt="Logo UNEXCA" 
                    className="h-12 w-auto object-contain rounded-md"
                />
                <div className="flex flex-col">
                    <span className='text-xs text-gray-500 mt-1'>Profesor: Walter Carrasquero</span>
                    <span className='text-xs text-gray-500'>Correo: waltercarrasquero66@gmail.com</span>
                    <span className='text-xs text-gray-500'>Teléfono: 0424-193-8899</span>
                </div>
                </div>

                {/* Créditos de desarrollo */}
                <div className="text-center md:text-right">
                <p className="text-xs text-gray-400 mb-1">Desarrollado por:</p>
                <div className="flex flex-wrap justify-center md:justify-end gap-3">
                    <a 
                    href="#" 
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200"
                    >
                    Ing. Shania Gómez
                    </a>
                    <span className="text-gray-300 hidden md:inline">|</span>
                    <a 
                    href="#" 
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200"
                    >
                    Ing. Zorayet Zamora
                    </a>
                    <span className="text-gray-300 hidden md:inline">|</span>
                    <a 
                    href="#" 
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200"
                    >
                    Ing. Jeferson Oramas
                    </a>
                </div>
                </div>
            </div>

            {/* Línea divisoria y copyright */}
            <div className="mt-4 pt-4 border-t border-gray-800">
                <p className="text-center text-xs text-gray-400">
                © {new Date().getFullYear()} FarmaTrom - Todos los derechos reservados
                </p>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;