import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Pill, Mail, Lock } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const Login = () => {
    const [errors, setErrors] = useState({}); // Estado para errores
    const [formData, setFormData] = useState({
        email: '',
        clave: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false); // Para evitar múltiples envíos
    const { login } = useAuth();
    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault(); // Esto PREVIENE la recarga de página
        
        if (isSubmitting) return; // Evitar envíos múltiples
        
        setIsSubmitting(true);
        setErrors({});
        
        try {
        const result = await login(formData);
        
        if (result?.success) {
            navigate('/'); // O la ruta a donde quieras redirigir
        } else if (result.errors) {
            setErrors(result.errors); // Guardar errores para mostrarlos
        }
        // Si hay error, NO redirigimos y mostramos el toast desde AuthContext
        } catch (error) {
            console.error('Error en login:', error);
        } finally {
        setIsSubmitting(false);
        }
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Toaster position="top-right" />
        <div className="max-w-md w-full space-y-8">
            <div>
            <div className="flex justify-center">
                <Pill className="h-12 w-12 text-primary-600" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Iniciar Sesión en Farmacia FRS23
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                ¿No tienes una cuenta?{' '}
                <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                Regístrate aquí
                </Link>
            </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm ">
                <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                    id="email"
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
                </div>
                <div>
                <label htmlFor="clave" className="sr-only">Contraseña</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                    id="clave"
                    name="clave"
                    type="password"
                    className={`appearance-none relative block w-full px-3 py-3 pl-10 border ${
                        errors.clave ? 'border-red-500' : 'border-gray-300'
                        } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                    placeholder="Contraseña"
                    value={formData.clave}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    />
                    {errors.clave && (
                        <p className="mt-1 text-sm text-red-600">{errors.clave[0]}</p>
                    )}
                </div>
                </div>
            </div>

            <div>
                <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                    isSubmitting 
                    ? 'bg-primary-400 cursor-not-allowed' 
                    : 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                }`}
                >
                {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>
            </div>
            </form>
        </div>
        </div>
    );
};

export default Login;