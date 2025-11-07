/**
 * Tipos genéricos para respuestas de la API
 */

/**
 * Respuesta estándar de la API
 */
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

/**
 * Respuesta paginada de la API
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

/**
 * Error de la API
 */
export interface ApiError {
  detail: string;
  status_code: number;
}

/**
 * Respuesta de operaciones exitosas
 */
export interface SuccessResponse {
  mensaje: string;
  producto_id?: number;
}
