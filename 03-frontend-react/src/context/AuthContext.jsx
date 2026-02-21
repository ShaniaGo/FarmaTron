/**
 * Contexto de autenticación: usuario, login, register, logout.
 * @module context/AuthContext
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import api from '../api';

const AuthContext = createContext({});

/**
 * Hook para acceder al contexto de autenticación.
 * @returns {{ user: object|null, login: Function, register: Function, logout: Function, loading: boolean }}
 */
export const useAuth = () => useContext(AuthContext);

/**
 * Proveedor de autenticación. Restaura usuario desde localStorage al montar.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  /**
   * Inicia sesión con email y clave. Guarda token y usuario en localStorage.
   * @param {{ email: string, clave: string }} formData
   * @returns {Promise<{ success: boolean, error?: string, errors?: object }>}
   */
  const login = async (formData) => {
    try {
      const response = await api.post('/auth/login', formData);
      console.log(response);
      const data = response.data;
      // Verificar si la respuesta es exitosa
      if (data.success) {
        const token = data.data?.token;
        const user = data.data?.usuario;

        if (token && user) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
          toast.success('Inicio de sesión exitoso');
          return { success: true };
        }
      }
      
      // Si llegamos aquí, hubo un error en la respuesta
      toast.error(data.message || 'Error al iniciar sesión');
      return { success: false, error: data.message };
      
    } catch (error) {
      console.error('Error en login:', error);
      
      // Manejar diferentes tipos de errores
      if (error.response) {
        // El servidor respondió con un código de error
        toast.error(error.response.data?.message || 'Credenciales incorrectas');
      } else if (error.request) {
        // La petición se hizo pero no se recibió respuesta
        toast.error('Error de conexión con el servidor');
      } else {
        // Error en la configuración de la petición
        toast.error('Error al procesar la solicitud');
      }

      if (error.response?.data?.errors) {
        // toast.error(error.response.data?.message || 'Errores en el formulario');
        // Errores de validación - mostrar cada error
        const errors = error.response.data.errors;
        // Object.keys(errors).forEach(field => {
        //   errors[field].forEach(errorMessage => {
        //     // toast.error(errorMessage);
        //   });
        // });
        console.log(errors)
        return { 
          success: false, 
          errors: errors 
        };
      }
      
      
      return { 
        success: false, 
        error: error.response?.data?.message || error.message 
      };
    }
  };

  /**
   * Registra un nuevo usuario. Guarda token y usuario en localStorage.
   * @param {Object} userData Datos del formulario (cedula, nombre_completo, email, clave, telefono, etc.)
   * @returns {Promise<{ success: boolean, error?: string, errors?: object }>}
   */
  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const data = response.data;
  
      if (data.success) {
        const token = data.data?.token;
        const user = data.data?.usuario;
  
        if (token && user) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
          toast.success('Registro exitoso');
          return { success: true };
        }
      }
      
      toast.error(data.message || 'Error en el registro');
      return { success: false, error: data.message };
      
    } catch (error) {
      console.error('Error en registro:', error);
      
      if (error.response?.data?.errors) {
        toast.error(error.response.data?.message || 'Errores en el formulario');
        // Errores de validación - mostrar cada error
        const errors = error.response.data.errors;
        // Object.keys(errors).forEach(field => {
        //   errors[field].forEach(errorMessage => {
        //     // toast.error(errorMessage);
        //   });
        // });
        console.log(errors)
        return { 
          success: false, 
          errors: errors 
        };
      }
      
      toast.error(error.response?.data?.message || 'Error de conexión');
      return { 
        success: false, 
        error: error.response?.data?.message || error.message 
      };
    }
  };

  /** Cierra sesión eliminando token y usuario de localStorage. */
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Sesión cerrada');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};