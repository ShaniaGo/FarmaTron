import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import { ShoppingCart, User, LogOut, Home, Pill, HouseHeart, Archive } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navLinkClass = (path, exact = false) => {
    const isActive = exact ? pathname === path : pathname.startsWith(path);
    const base = 'flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors';
    const active = 'text-primary-600 font-semibold bg-primary-50';
    const inactive = 'text-gray-700 hover:text-primary-600 hover:bg-gray-50';
    return `${base} ${isActive ? active : inactive}`;
  };

  const iconLinkClass = (path) => {
    const isActive = pathname.startsWith(path);
    const base = 'p-2 rounded-full transition-colors';
    const active = 'bg-primary-100 text-primary-600';
    const inactive = 'hover:bg-gray-100';
    return `${base} ${isActive ? active : inactive}`;
  };

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
          <div className="hidden md:flex space-x-2">
            <Link to="/" className={navLinkClass('/', true)}>
              <Home className="h-5 w-5" />
              <span>Inicio</span>
            </Link>
            <Link to="/medicamentos" className={navLinkClass('/medicamentos')}>
              <Pill className="h-5 w-5" />
              Medicamentos
            </Link>
            <Link to="/farmacias" className={navLinkClass('/farmacias')}>
              <HouseHeart className="h-5 w-5"/>
              Farmacias
            </Link>
            {user && (
              <Link to="/pedidos" className={navLinkClass('/pedidos')}>
                <Archive className="h-5 w-5"/>
                Mis Pedidos
              </Link>
            )}
          </div>

          {/* Iconos de usuario/carrito */}
          <div className="flex items-center space-x-4">
            <Tippy content="Carrito de compras" placement="bottom">
              <Link to="/carrito" className={iconLinkClass('/carrito')}>
                <ShoppingCart className="h-6 w-6" />
              </Link>
            </Tippy>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <Tippy content="Perfil" placement="bottom">
                  <Link to="/perfil" className={iconLinkClass('/perfil')}>
                    <User className="h-6 w-6" />
                  <span className="hidden md:inline">{user.nombre}</span>
                  </Link>
                </Tippy>
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