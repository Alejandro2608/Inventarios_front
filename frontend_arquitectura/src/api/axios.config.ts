/**
 * Configuración de Axios para comunicación con el backend
 * Backend URL: http://localhost:8000
 */

import axios, { AxiosError } from 'axios';
import type { AxiosInstance } from 'axios';
import type { ApiError } from '../types/responses';

/**
 * URL base del backend FastAPI
 * En producción, cambiar a la URL del servidor
 */
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Instancia de Axios configurada
 */
export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor de request
 * Aquí se pueden agregar tokens de autenticación en el futuro
 */
api.interceptors.request.use(
  (config) => {
    // Agregar token si existe (para autenticación futura)
    // const token = localStorage.getItem('auth_token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor de response
 * Maneja errores globalmente
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiError>) => {
    // Manejo de errores HTTP
    if (error.response) {
      // El servidor respondió con un código de error
      const apiError: ApiError = {
        detail: error.response.data?.detail || 'Error desconocido',
        status_code: error.response.status,
      };
      console.error('❌ Error de API:', apiError);
      return Promise.reject(apiError);
    } else if (error.request) {
      // La petición fue hecha pero no hubo respuesta
      console.error('❌ Error de conexión:', error.message);
      return Promise.reject({
        detail: 'No se pudo conectar con el servidor',
        status_code: 0,
      } as ApiError);
    } else {
      // Error al configurar la petición
      console.error('❌ Error:', error.message);
      return Promise.reject({
        detail: error.message,
        status_code: 0,
      } as ApiError);
    }
  }
);

export default api;
