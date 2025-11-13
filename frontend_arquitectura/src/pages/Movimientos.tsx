/**
 * Movimientos Page
 * Página para ver el historial de movimientos de inventario
 */

import React, { useEffect, useState } from 'react';
import Card from '../components/common/Card';
import inventarioService from '../api/services/inventarioService';
import type { MovimientoInventarioDTO } from '../types/dtos/inventario.dto';
import type { ApiError } from '../types/responses';
import './Movimientos.css';

const Movimientos: React.FC = () => {
  const [movimientos, setMovimientos] = useState<MovimientoInventarioDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cargarMovimientos();
  }, []);

  const cargarMovimientos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await inventarioService.obtenerMovimientos();
      // Ordenar por fecha más reciente primero
      const ordenados = data.sort(
        (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      );
      setMovimientos(ordenados);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.detail || 'Error al cargar movimientos');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatearFecha = (fecha: string | null | undefined) => {
    if (!fecha) return '-';
    const date = new Date(fecha);
    if (isNaN(date.getTime())) return 'Fecha inválida';
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Calcular estadísticas
  const totalEntradas = movimientos
    .filter((m) => m.tipo === 'entrada')
    .reduce((sum, m) => sum + m.cantidad, 0);

  const totalSalidas = movimientos
    .filter((m) => m.tipo === 'salida')
    .reduce((sum, m) => sum + m.cantidad, 0);

  return (
    <div className="movimientos">
      <div className="movimientos__header">
        <div>
          <h1>Historial de Movimientos</h1>
          <p className="movimientos__subtitle">
            Registro completo de entradas y salidas de inventario
          </p>
        </div>
      </div>

      {error && (
        <div className="movimientos__error">
          <p>⚠️ {error}</p>
        </div>
      )}

      <div className="movimientos__stats">
        <Card className="stat-card" hover padding="md">
          <div className="stat-card__icon stat-card__icon--success">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </div>
          <div className="stat-card__content">
            <p className="stat-card__label">Total Entradas</p>
            <h3 className="stat-card__value">{totalEntradas.toLocaleString()}</h3>
          </div>
        </Card>

        <Card className="stat-card" hover padding="md">
          <div className="stat-card__icon stat-card__icon--danger">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </div>
          <div className="stat-card__content">
            <p className="stat-card__label">Total Salidas</p>
            <h3 className="stat-card__value">{totalSalidas.toLocaleString()}</h3>
          </div>
        </Card>

        <Card className="stat-card" hover padding="md">
          <div className="stat-card__icon stat-card__icon--primary">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <div className="stat-card__content">
            <p className="stat-card__label">Total Movimientos</p>
            <h3 className="stat-card__value">{movimientos.length}</h3>
          </div>
        </Card>
      </div>

      <Card>
        {loading ? (
          <div className="movimientos__loading">
            <p>Cargando movimientos...</p>
          </div>
        ) : movimientos.length === 0 ? (
          <div className="movimientos__empty">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            <p>No hay movimientos registrados</p>
          </div>
        ) : (
          <div className="movimientos-table">
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Tipo</th>
                  <th>Producto ID</th>
                  <th>Cantidad</th>
                  <th>Proveedor</th>
                  <th>Lote</th>
                  <th>Bodega</th>
                  <th>Motivo</th>
                </tr>
              </thead>
              <tbody>
                {movimientos.map((movimiento) => (
                  <tr key={movimiento.id}>
                    <td className="movimientos-table__date">
                      {formatearFecha(movimiento.fecha)}
                    </td>
                    <td>
                      <span
                        className={`badge badge--${
                          movimiento.tipo === 'entrada' ? 'success' : 'danger'
                        }`}
                      >
                        {movimiento.tipo === 'entrada' ? (
                          <>
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <line x1="12" y1="19" x2="12" y2="5"></line>
                              <polyline points="5 12 12 5 19 12"></polyline>
                            </svg>
                            Entrada
                          </>
                        ) : (
                          <>
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <polyline points="19 12 12 19 5 12"></polyline>
                            </svg>
                            Salida
                          </>
                        )}
                      </span>
                    </td>
                    <td>
                      <code>#{movimiento.producto_id}</code>
                    </td>
                    <td>
                      <span
                        className={`cantidad cantidad--${movimiento.tipo}`}
                      >
                        {movimiento.tipo === 'entrada' ? '+' : '-'}
                        {movimiento.cantidad}
                      </span>
                    </td>
                    <td>{movimiento.proveedor || '-'}</td>
                    <td>
                      {movimiento.lote ? (
                        <code>{movimiento.lote}</code>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td>{movimiento.bodega || '-'}</td>
                    <td className="movimientos-table__motivo">
                      {movimiento.motivo || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Movimientos;
