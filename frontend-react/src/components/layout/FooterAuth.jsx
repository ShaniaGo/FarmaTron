/**
 * Componente Footer profesional para páginas de autenticación
 * @module components/FooterAuth
 */

import React from 'react';

const FooterAuth = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 py-6 mt-auto">
      <div className="container mx-auto px-4">
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
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-center text-xs text-gray-400">
            © {currentYear} FarmaTrom - Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterAuth;