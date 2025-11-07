/**
 * Servicio de Inventario
 * Maneja toda la comunicación con el backend relacionada a movimientos de inventario
 */

import api from '../axios.config';
import { INVENTARIO_ENDPOINTS } from '../endpoints';
import type {
  EntradaProductoDTO,
  SalidaProductoDTO,
  MovimientoInventarioDTO,
} from '../../types/dtos/inventario.dto';
import type { ApiError, SuccessResponse } from '../../types/responses';

/**
 * Servicio de Inventario
 * Implementa los requisitos funcionales RF4, RF5, RF8
 */
class InventarioService {
  /**
   * RF4: Registrar entrada de producto al inventario
   * @param datos - Datos de la entrada (producto_id, cantidad, proveedor, etc.)
   * @returns Confirmación de la operación
   */
  async registrarEntrada(
    datos: EntradaProductoDTO
  ): Promise<SuccessResponse> {
    try {
      const response = await api.post<SuccessResponse>(
        INVENTARIO_ENDPOINTS.REGISTRAR_ENTRADA,
        datos
      );
      console.log('✅ Entrada de inventario registrada:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al registrar entrada:', error);
      throw error as ApiError;
    }
  }

  /**
   * RF5: Registrar salida de producto del inventario
   * @param datos - Datos de la salida (producto_id, cantidad, motivo, etc.)
   * @returns Confirmación de la operación
   */
  async registrarSalida(datos: SalidaProductoDTO): Promise<SuccessResponse> {
    try {
      const response = await api.post<SuccessResponse>(
        INVENTARIO_ENDPOINTS.REGISTRAR_SALIDA,
        datos
      );
      console.log('✅ Salida de inventario registrada:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al registrar salida:', error);
      throw error as ApiError;
    }
  }

  /**
   * RF8: Obtener historial de movimientos de inventario
   * @param productoId - (Opcional) Filtrar por ID de producto
   * @returns Lista de movimientos
   */
  async obtenerMovimientos(
    productoId?: number
  ): Promise<MovimientoInventarioDTO[]> {
    try {
      const url = productoId
        ? INVENTARIO_ENDPOINTS.MOVIMIENTOS_POR_PRODUCTO(productoId)
        : INVENTARIO_ENDPOINTS.LISTAR_MOVIMIENTOS;

      const response = await api.get<{ items: MovimientoInventarioDTO[] }>(url);
      return response.data.items || response.data as any; // Manejar respuesta paginada o array directo
    } catch (error) {
      console.error('Error al obtener movimientos:', error);
      throw error as ApiError;
    }
  }

  /**
   * Obtener últimos movimientos (más recientes primero)
   * @param limite - Número máximo de movimientos a obtener
   * @returns Lista de movimientos recientes
   */
  async obtenerMovimientosRecientes(
    limite: number = 10
  ): Promise<MovimientoInventarioDTO[]> {
    try {
      const response = await api.get<{ items: MovimientoInventarioDTO[] }>(
        INVENTARIO_ENDPOINTS.LISTAR_MOVIMIENTOS,
        {
          params: { limit: limite, order: 'desc' },
        }
      );
      return response.data.items || response.data as any; // Manejar respuesta paginada o array directo
    } catch (error) {
      console.error('Error al obtener movimientos recientes:', error);
      throw error as ApiError;
    }
  }
}

// Exportar instancia única del servicio (Singleton)
export const inventarioService = new InventarioService();
export default inventarioService;
