/**
 * Cliente HTTP para la API del backend FarmaLink.
 *
 * Configura baseURL, headers JSON y un interceptor que añade el token
 * Bearer desde localStorage a todas las peticiones autenticadas.
 * @module api
 */

import axios from 'axios';
import { API_URL } from '../utils/constants';

/** Instancia de axios configurada para la API */
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

/** Interceptor que agrega Authorization: Bearer <token> si existe en localStorage */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;