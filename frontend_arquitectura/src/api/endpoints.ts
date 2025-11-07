/**
 * Definición de endpoints de la API
 * Corresponden a los endpoints del backend FastAPI
 */

/**
 * Endpoints de Productos
 */
export const PRODUCTOS_ENDPOINTS = {
  // GET /api/v1/productos - Listar todos los productos (RF3)
  LISTAR: '/api/v1/productos',

  // POST /api/v1/productos - Registrar nuevo producto (RF1)
  REGISTRAR: '/api/v1/productos',

  // GET /api/v1/productos/{id} - Obtener producto por ID
  OBTENER_POR_ID: (id: number) => `/api/v1/productos/${id}`,

  // PUT /api/v1/productos/{id} - Actualizar producto (RF2)
  ACTUALIZAR: (id: number) => `/api/v1/productos/${id}`,

  // DELETE /api/v1/productos/{id} - Eliminar producto
  ELIMINAR: (id: number) => `/api/v1/productos/${id}`,

  // GET /api/v1/productos/sku/{sku} - Buscar por SKU
  BUSCAR_POR_SKU: (sku: string) => `/api/v1/productos/sku/${sku}`,
} as const;

/**
 * Endpoints de Inventario
 */
export const INVENTARIO_ENDPOINTS = {
  // POST /api/v1/inventario/entrada - Registrar entrada (RF4)
  REGISTRAR_ENTRADA: '/api/v1/inventario/entrada',

  // POST /api/v1/inventario/salida - Registrar salida (RF5)
  REGISTRAR_SALIDA: '/api/v1/inventario/salida',

  // GET /api/v1/inventario/movimientos - Listar movimientos (RF8)
  LISTAR_MOVIMIENTOS: '/api/v1/inventario/movimientos',

  // GET /api/v1/inventario/movimientos/{producto_id} - Movimientos por producto
  MOVIMIENTOS_POR_PRODUCTO: (productoId: number) =>
    `/api/v1/inventario/movimientos/${productoId}`,
} as const;

/**
 * Endpoints de Dashboard
 */
export const DASHBOARD_ENDPOINTS = {
  // GET /api/v1/dashboard/productos-stock-bajo - Productos con stock bajo (RF6, RF7)
  PRODUCTOS_STOCK_BAJO: '/api/v1/dashboard/productos-stock-bajo',

  // GET /api/v1/dashboard/resumen - Resumen general
  RESUMEN: '/api/v1/dashboard/resumen',
} as const;

/**
 * Endpoints de Health Check
 */
export const HEALTH_ENDPOINTS = {
  // GET / - Información del sistema
  INFO: '/',

  // GET /health - Estado de salud
  HEALTH: '/health',
} as const;
