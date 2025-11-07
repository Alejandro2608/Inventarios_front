/**
 * DTOs para Productos - Coinciden con el backend FastAPI
 * Backend: app/application/dto/producto_dto.py
 */

/**
 * DTO para crear un nuevo producto (RF1)
 * Corresponde a ProductoCreateDTO del backend
 */
export interface ProductoCreateDTO {
  sku: string;
  nombre: string;
  tipo_licor: string;
  presentacion: string;
  proveedor: string;
  precio_compra: number;
  precio_venta: number;
  stock: number;
}

/**
 * DTO para actualizar un producto existente (RF2)
 * Corresponde a ProductoUpdateDTO del backend
 */
export interface ProductoUpdateDTO {
  nombre?: string;
  tipo_licor?: string;
  presentacion?: string;
  proveedor?: string;
  precio_compra?: number;
  precio_venta?: number;
  stock?: number;
  estado?: 'Activo' | 'Inactivo';
}

/**
 * DTO de respuesta del producto (RF3)
 * Corresponde a ProductoResponseDTO del backend
 */
export interface ProductoResponseDTO {
  id: number;
  sku: string;
  nombre: string;
  tipo_licor: string;
  presentacion: string;
  proveedor: string;
  precio_compra: number;
  precio_venta: number;
  stock: number;
  estado: 'Activo' | 'Inactivo';
  fecha_creacion: string;
  fecha_actualizacion: string;
}

/**
 * Tipo para los estados posibles de un producto
 */
export type EstadoProducto = 'Activo' | 'Inactivo';

/**
 * Tipo para las categorías de licores
 */
export type TipoLicor =
  | 'Ron'
  | 'Whisky'
  | 'Vodka'
  | 'Tequila'
  | 'Aguardiente'
  | 'Vino'
  | 'Cerveza'
  | 'Brandy'
  | 'Ginebra'
  | 'Licor'
  | 'Otro';
