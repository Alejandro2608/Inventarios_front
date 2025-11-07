/**
 * Dashboard Page
 * Página principal con resumen del inventario
 */

import React, { useEffect, useState } from 'react';
import Card from '../components/common/Card';
import productosService from '../api/services/productosService';
import type { ProductoResponseDTO } from '../types/dtos/producto.dto';
import type { ApiError } from '../types/responses';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [productos, setProductos] = useState<ProductoResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productosService.obtenerTodos();
      setProductos(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.detail || 'Error al cargar datos');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calcular estadísticas
  const totalProductos = productos.length;
  const productosActivos = productos.filter((p) => p.estado === 'Activo').length;
  const stockTotal = productos.reduce((sum, p) => sum + p.stock, 0);
  const valorInventario = productos.reduce(
    (sum, p) => sum + p.stock * p.precio_compra,
    0
  );

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>Dashboard</h1>
        <p className="dashboard__subtitle">Resumen general del inventario</p>
      </div>

      {error && (
        <div className="dashboard__error">
          <p>⚠️ {error}</p>
        </div>
      )}

      <div className="dashboard__stats">
        <Card className="stat-card" hover padding="lg">
          <div className="stat-card__icon stat-card__icon--primary">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 2h8M9 2v5.5A3.5 3.5 0 0 1 5.5 11A3.5 3.5 0 0 1 2 7.5V2" />
              <path d="M15 2v5.5a3.5 3.5 0 0 0 3.5 3.5 3.5 3.5 0 0 0 3.5-3.5V2" />
              <path d="M5 11v9a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-9" />
            </svg>
          </div>
          <div className="stat-card__content">
            <p className="stat-card__label">Total Productos</p>
            <h2 className="stat-card__value">{loading ? '...' : totalProductos}</h2>
          </div>
        </Card>

        <Card className="stat-card" hover padding="lg">
          <div className="stat-card__icon stat-card__icon--success">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div className="stat-card__content">
            <p className="stat-card__label">Productos Activos</p>
            <h2 className="stat-card__value">{loading ? '...' : productosActivos}</h2>
          </div>
        </Card>

        <Card className="stat-card" hover padding="lg">
          <div className="stat-card__icon stat-card__icon--warning">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            </svg>
          </div>
          <div className="stat-card__content">
            <p className="stat-card__label">Stock Total</p>
            <h2 className="stat-card__value">{loading ? '...' : stockTotal.toLocaleString()}</h2>
          </div>
        </Card>

        <Card className="stat-card" hover padding="lg">
          <div className="stat-card__icon stat-card__icon--gold">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div className="stat-card__content">
            <p className="stat-card__label">Valor Inventario</p>
            <h2 className="stat-card__value">
              {loading ? '...' : `$${valorInventario.toLocaleString()}`}
            </h2>
          </div>
        </Card>
      </div>

      <Card title="Productos Recientes" className="dashboard__recent">
        {loading ? (
          <div className="dashboard__loading">
            <p>Cargando productos...</p>
          </div>
        ) : productos.length === 0 ? (
          <div className="dashboard__empty">
            <p>No hay productos registrados</p>
          </div>
        ) : (
          <div className="productos-table">
            <table>
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Stock</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {productos.slice(0, 5).map((producto) => (
                  <tr key={producto.id}>
                    <td><code>{producto.sku}</code></td>
                    <td>{producto.nombre}</td>
                    <td>{producto.tipo_licor}</td>
                    <td>{producto.stock}</td>
                    <td>
                      <span
                        className={`badge badge--${producto.estado === 'Activo' ? 'success' : 'inactive'}`}
                      >
                        {producto.estado}
                      </span>
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

export default Dashboard;
