/**
 * Productos Page
 * Página de gestión de productos del inventario
 */

import React, { useEffect, useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import ProductoForm from '../components/productos/ProductoForm';
import productosService from '../api/services/productosService';
import type { ProductoResponseDTO, ProductoCreateDTO, ProductoUpdateDTO } from '../types/dtos/producto.dto';
import type { ApiError } from '../types/responses';
import './Productos.css';

const Productos: React.FC = () => {
  const [productos, setProductos] = useState<ProductoResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [soloActivos, setSoloActivos] = useState(false);

  // Estados para modales
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<ProductoResponseDTO | null>(null);

  useEffect(() => {
    cargarProductos();
  }, [soloActivos]);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productosService.obtenerTodos(soloActivos);
      setProductos(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.detail || 'Error al cargar productos');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCrearProducto = async (data: ProductoCreateDTO) => {
    try {
      await productosService.registrar(data);
      setShowCreateModal(false);
      await cargarProductos();
      // Aquí podrías mostrar un mensaje de éxito
    } catch (err) {
      const apiError = err as ApiError;
      alert(`Error: ${apiError.detail}`);
      throw err;
    }
  };

  const handleEditarProducto = async (data: ProductoCreateDTO) => {
    if (!productoSeleccionado) return;

    try {
      const updateData: ProductoUpdateDTO = {
        nombre: data.nombre,
        tipo_licor: data.tipo_licor,
        presentacion: data.presentacion,
        proveedor: data.proveedor,
        precio_compra: data.precio_compra,
        precio_venta: data.precio_venta,
        // El stock NO se actualiza aquí, solo con movimientos
      };

      await productosService.actualizar(productoSeleccionado.id, updateData);
      setShowEditModal(false);
      setProductoSeleccionado(null);
      await cargarProductos();
      // Aquí podrías mostrar un mensaje de éxito
    } catch (err) {
      const apiError = err as ApiError;
      alert(`Error: ${apiError.detail}`);
      throw err;
    }
  };

  const handleEliminarProducto = async (producto: ProductoResponseDTO) => {
    if (!window.confirm(`¿Está seguro de eliminar el producto "${producto.nombre}"?`)) {
      return;
    }

    try {
      await productosService.eliminar(producto.id);
      await cargarProductos();
    } catch (err) {
      const apiError = err as ApiError;
      alert(`Error: ${apiError.detail}`);
    }
  };

  const abrirModalEdicion = (producto: ProductoResponseDTO) => {
    setProductoSeleccionado(producto);
    setShowEditModal(true);
  };

  const formatearFecha = (fecha: string | null | undefined) => {
    if (!fecha) return '-';
    const date = new Date(fecha);
    if (isNaN(date.getTime())) return 'Fecha inválida';
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatearPrecio = (precio: number) => {
    return `$${precio.toLocaleString('es-CO')}`;
  };

  return (
    <div className="productos">
      <div className="productos__header">
        <div>
          <h1>Productos</h1>
          <p className="productos__subtitle">Gestión del catálogo de productos</p>
        </div>
        <div className="productos__actions">
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Nuevo Producto
          </Button>
        </div>
      </div>

      {error && (
        <div className="productos__error">
          <p>⚠️ {error}</p>
        </div>
      )}

      <Card className="productos__filters">
        <div className="filters">
          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={soloActivos}
              onChange={(e) => setSoloActivos(e.target.checked)}
            />
            <span>Solo productos activos</span>
          </label>

          <div className="filters__info">
            {loading ? 'Cargando...' : `${productos.length} productos`}
          </div>
        </div>
      </Card>

      <Card>
        {loading ? (
          <div className="productos__loading">
            <p>Cargando productos...</p>
          </div>
        ) : productos.length === 0 ? (
          <div className="productos__empty">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M8 2h8M9 2v5.5A3.5 3.5 0 0 1 5.5 11A3.5 3.5 0 0 1 2 7.5V2" />
              <path d="M15 2v5.5a3.5 3.5 0 0 0 3.5 3.5 3.5 3.5 0 0 0 3.5-3.5V2" />
              <path d="M5 11v9a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-9" />
            </svg>
            <p>No hay productos registrados</p>
            <Button variant="primary" size="lg" onClick={() => setShowCreateModal(true)}>
              Registrar Primer Producto
            </Button>
          </div>
        ) : (
          <div className="productos-table">
            <table>
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Presentación</th>
                  <th>Stock</th>
                  <th>Precio Compra</th>
                  <th>Precio Venta</th>
                  <th>Estado</th>
                  <th>Actualizado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>
                      <code>{producto.sku}</code>
                    </td>
                    <td className="productos-table__name">{producto.nombre}</td>
                    <td>{producto.tipo_licor}</td>
                    <td>{producto.presentacion}</td>
                    <td>
                      <span className={`stock ${producto.stock < 10 ? 'stock--low' : ''}`}>
                        {producto.stock}
                      </span>
                    </td>
                    <td>{formatearPrecio(producto.precio_compra)}</td>
                    <td>{formatearPrecio(producto.precio_venta)}</td>
                    <td>
                      <span className={`badge badge--${producto.estado === 'Activo' ? 'success' : 'inactive'}`}>
                        {producto.estado}
                      </span>
                    </td>
                    <td className="productos-table__date">
                      {formatearFecha(producto.fecha_actualizacion)}
                    </td>
                    <td>
                      <div className="productos-table__actions">
                        <button
                          className="btn-icon"
                          title="Editar"
                          onClick={() => abrirModalEdicion(producto)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                        <button
                          className="btn-icon btn-icon--danger"
                          title="Eliminar"
                          onClick={() => handleEliminarProducto(producto)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Modal de Creación */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Registrar Nuevo Producto"
        size="lg"
      >
        <ProductoForm
          onSubmit={handleCrearProducto}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>

      {/* Modal de Edición */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setProductoSeleccionado(null);
        }}
        title="Editar Producto"
        size="lg"
      >
        {productoSeleccionado && (
          <ProductoForm
            producto={productoSeleccionado}
            onSubmit={handleEditarProducto}
            onCancel={() => {
              setShowEditModal(false);
              setProductoSeleccionado(null);
            }}
            isEdit
          />
        )}
      </Modal>
    </div>
  );
};

export default Productos;
