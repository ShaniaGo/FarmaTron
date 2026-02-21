import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Home, Pill } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo_farmatrom_recorte.png" alt="" 
                    className='rounded-full h-10 shadow-lg 
                        border-default rounded-base shadow-xs'/>
            <span className="text-2xl font-bold text-primary-700">FarmaTrom</span>
          </Link>

          {/* Menú de navegación */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="flex items-center space-x-1 hover:text-primary-600">
              <Home className="h-5 w-5" />
              <span>Inicio</span>
            </Link>
            <Link to="/medicamentos" className="hover:text-primary-600">
              Medicamentos
            </Link>
            <Link to="/farmacias" className="hover:text-primary-600">
              Farmacias
            </Link>
            {user && (
              <Link to="/pedidos" className="hover:text-primary-600">
                Mis Pedidos
              </Link>
            )}
          </div>

          {/* Iconos de usuario/carrito */}
          <div className="flex items-center space-x-4">
            <Link to="/carrito" className="p-2 hover:bg-gray-100 rounded-full">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <Link to="/perfil" className="flex items-center space-x-1">
                  <User className="h-6 w-6" />
                  <span className="hidden md:inline">{user.nombre}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-800"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden md:inline">Salir</span>
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="px-4 py-2 text-primary-600 hover:text-primary-800">
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;