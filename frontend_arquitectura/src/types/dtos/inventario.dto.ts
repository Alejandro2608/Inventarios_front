/**
 * DTOs para Inventario - Coinciden con el backend FastAPI
 * Backend: app/application/dto/inventario_dto.py
 */

/**
 * DTO para registrar entrada de producto (RF4)
 */
export interface EntradaProductoDTO {
  producto_id: number;
  cantidad: number;
  proveedor: string;
  lote?: string;
  bodega?: string;
}

/**
 * DTO para registrar salida de producto (RF5)
 */
export interface SalidaProductoDTO {
  producto_id: number;
  cantidad: number;
  motivo: string;
  bodega?: string;
}

/**
 * DTO de respuesta de movimiento de inventario
 */
export interface MovimientoInventarioDTO {
  id: number;
  producto_id: number;
  cantidad: number;
  tipo: 'entrada' | 'salida';
  fecha: string;
  proveedor?: string;
  lote?: string;
  bodega?: string;
  motivo?: string;
}

/**
 * Tipo para el tipo de movimiento
 */
export type TipoMovimiento = 'entrada' | 'salida';
