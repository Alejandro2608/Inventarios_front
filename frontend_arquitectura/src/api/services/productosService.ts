/**
 * Servicio de Productos
 * Maneja toda la comunicación con el backend relacionada a productos
 */

import api from '../axios.config';
import { PRODUCTOS_ENDPOINTS } from '../endpoints';
import type {
  ProductoCreateDTO,
  ProductoUpdateDTO,
  ProductoResponseDTO,
} from '../../types/dtos/producto.dto';
import type { ApiError } from '../../types/responses';

/**
 * Servicio de Productos
 * Implementa los requisitos funcionales RF1, RF2, RF3
 */
class ProductosService {
  /**
   * RF3: Obtener todos los productos del inventario
   * @param soloActivos - Filtrar solo productos activos
   * @returns Lista de productos
   */
  async obtenerTodos(
    soloActivos: boolean = false
  ): Promise<ProductoResponseDTO[]> {
    try {
      const params = soloActivos ? { solo_activos: true } : {};
      const response = await api.get<{ items: ProductoResponseDTO[] }>(
        PRODUCTOS_ENDPOINTS.LISTAR,
        { params }
      );
      return response.data.items; // Extraer solo el array items de la respuesta paginada
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error as ApiError;
    }
  }

  /**
   * Obtener un producto por su ID
   * @param id - ID del producto
   * @returns Producto encontrado
   */
  async obtenerPorId(id: number): Promise<ProductoResponseDTO> {
    try {
      const response = await api.get<ProductoResponseDTO>(
        PRODUCTOS_ENDPOINTS.OBTENER_POR_ID(id)
      );
      return response.data;
    } catch (error) {
      console.error(`Error al obtener producto ${id}:`, error);
      throw error as ApiError;
    }
  }

  /**
   * Buscar un producto por su SKU
   * @param sku - Código SKU del producto
   * @returns Producto encontrado
   */
  async buscarPorSKU(sku: string): Promise<ProductoResponseDTO> {
    try {
      const response = await api.get<ProductoResponseDTO>(
        PRODUCTOS_ENDPOINTS.BUSCAR_POR_SKU(sku)
      );
      return response.data;
    } catch (error) {
      console.error(`Error al buscar producto con SKU ${sku}:`, error);
      throw error as ApiError;
    }
  }

  /**
   * RF1: Registrar un nuevo producto en el inventario
   * @param datos - Datos del nuevo producto
   * @returns Producto creado con su ID
   */
  async registrar(datos: ProductoCreateDTO): Promise<ProductoResponseDTO> {
    try {
      const response = await api.post<ProductoResponseDTO>(
        PRODUCTOS_ENDPOINTS.REGISTRAR,
        datos
      );
      console.log('✅ Producto registrado exitosamente:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al registrar producto:', error);
      throw error as ApiError;
    }
  }

  /**
   * RF2: Actualizar un producto existente
   * @param id - ID del producto a actualizar
   * @param datos - Datos a actualizar (parciales)
   * @returns Producto actualizado
   */
  async actualizar(
    id: number,
    datos: ProductoUpdateDTO
  ): Promise<ProductoResponseDTO> {
    try {
      const response = await api.put<ProductoResponseDTO>(
        PRODUCTOS_ENDPOINTS.ACTUALIZAR(id),
        datos
      );
      console.log('✅ Producto actualizado exitosamente:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar producto ${id}:`, error);
      throw error as ApiError;
    }
  }

  /**
   * Eliminar un producto
   * @param id - ID del producto a eliminar
   */
  async eliminar(id: number): Promise<void> {
    try {
      await api.delete(PRODUCTOS_ENDPOINTS.ELIMINAR(id));
      console.log(`✅ Producto ${id} eliminado exitosamente`);
    } catch (error) {
      console.error(`Error al eliminar producto ${id}:`, error);
      throw error as ApiError;
    }
  }

  /**
   * Activar un producto (cambiar estado a Activo)
   * @param id - ID del producto
   */
  async activar(id: number): Promise<ProductoResponseDTO> {
    return this.actualizar(id, { estado: 'Activo' });
  }

  /**
   * Desactivar un producto (cambiar estado a Inactivo)
   * @param id - ID del producto
   */
  async desactivar(id: number): Promise<ProductoResponseDTO> {
    return this.actualizar(id, { estado: 'Inactivo' });
  }
}

// Exportar instancia única del servicio (Singleton)
export const productosService = new ProductosService();
export default productosService;
