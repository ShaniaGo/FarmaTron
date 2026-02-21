/**
 * Página de registro: formulario con cédula, nombre, email, teléfono, dirección y contraseña (con confirmación).
 * Usa AuthContext.register; redirige a "/" en éxito o muestra errores de validación del backend.
 * @module pages/auth/Register
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Pill, User, Mail, Lock, Phone } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

/**
 * Formulario de registro con validación y enlace a login.
 * @returns {JSX.Element}
 */
const Register = () => {
  const [formData, setFormData] = useState({
    cedula: '',
    nombre_completo: '',
    email: '',
    clave: '',
    clave_confirmation: '',
    telefono: '',
    direccion: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  /**
   * Actualiza el campo del formulario y limpia el error de ese campo.
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null
      });
    }
  };

  /**
   * Envía los datos al registro del contexto; redirige a "/" si success o guarda result.errors.
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    const result = await register(formData);
    
    if (result.success) {
      navigate('/');
    } else if (result.errors) {
      setErrors(result.errors); // Guardar errores para mostrarlos
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <img src="/logo_farmatrom_recorte.png" alt="" 
                    className='rounded-full h-20 shadow-lg 
                        border-default rounded-base shadow-xs'/>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crear cuenta en FarmaTrom
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Cédula */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="cedula"
                type="text"
                className={`appearance-none relative block w-full px-3 py-3 pl-10 border ${
                  errors.cedula ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                placeholder="Cédula (ej: V12345678)"
                value={formData.cedula}
                onChange={handleChange}
                disabled={isSubmitting}

              />
              {errors.cedula && (
                <p className="mt-1 text-sm text-red-600">{errors.cedula[0]}</p>
              )}
            </div>

            {/* Nombre completo */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="nombre_completo"
                type="text"
                className={`appearance-none relative block w-full px-3 py-3 pl-10 border ${
                  errors.nombre_completo ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                placeholder="Nombre completo"
                value={formData.nombre_completo}
                onChange={handleChange}
                disabled={isSubmitting} 
              />
              {errors.nombre_completo && (
                <p className="mt-1 text-sm text-red-600">{errors.nombre_completo[0]}</p>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="email"
                type="email"
                className={`appearance-none relative block w-full px-3 py-3 pl-10 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email[0]}</p>
              )}
            </div>

            {/* Teléfono */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="telefono"
                type="tel"
                className={`appearance-none relative block w-full px-3 py-3 pl-10 border ${
                  errors.telefono ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {errors.telefono && (
                <p className="mt-1 text-sm text-red-600">{errors.telefono[0]}</p>
              )}
            </div>

            {/* Dirección */}
            <div>
              <input
                name="direccion"
                type="text"
                className={`appearance-none relative block w-full px-3 py-3 pl-10 border ${
                  errors.direccion ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                placeholder="Dirección (opcional)"
                value={formData.direccion}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {errors.direccion && (
                <p className="mt-1 text-sm text-red-600">{errors.direccion[0]}</p>
              )}
            </div>

            {/* Contraseña (mín. 8 caracteres) */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="clave"
                type="password"
                minLength={8}
                className={`appearance-none relative block w-full px-3 py-3 pl-10 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                placeholder="Contraseña (mín. 8 caracteres)"
                value={formData.clave}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {errors.clave && (
                <p className="mt-1 text-sm text-red-600">{errors.clave[0]}</p>
              )}
            </div>

            {/* Confirmar contraseña */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="clave_confirmation"
                type="password"
                minLength={8}
                className={`appearance-none relative block w-full px-3 py-3 pl-10 border ${
                  errors.clave_confirmation ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                placeholder="Confirmar contraseña"
                value={formData.clave_confirmation}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {errors.clave_confirmation && (
                <p className="mt-1 text-sm text-red-600">{errors.email[0]}</p>
              )}
            </div>
          </div>

          <div>
            {/* <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Registrarse
            </button> */}

            <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                    isSubmitting 
                    ? 'bg-primary-400 cursor-not-allowed' 
                    : 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                }`}
                >
                {isSubmitting ? 'Registrando...' : 'Registrarse'}
                </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;