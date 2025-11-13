/**
 * Inventario Page
 * Página para registrar entradas y salidas de productos
 */

import React, { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import productosService from '../api/services/productosService';
import inventarioService from '../api/services/inventarioService';
import type { ProductoResponseDTO } from '../types/dtos/producto.dto';
import type { EntradaProductoDTO, SalidaProductoDTO } from '../types/dtos/inventario.dto';
import type { ApiError } from '../types/responses';
import './Inventario.css';

const Inventario: React.FC = () => {
  const [productos, setProductos] = useState<ProductoResponseDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [tipoMovimiento, setTipoMovimiento] = useState<'entrada' | 'salida'>('entrada');

  // Estados para entrada
  const [entradaForm, setEntradaForm] = useState<EntradaProductoDTO>({
    producto_id: 0,
    cantidad: 0,
    proveedor: '',
    lote: '',
    bodega: '',
  });

  // Estados para salida
  const [salidaForm, setSalidaForm] = useState<SalidaProductoDTO>({
    producto_id: 0,
    cantidad: 0,
    motivo: '',
    bodega: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      // Cargar TODOS los productos (incluidos inactivos) para permitir entradas
      // que reactiven productos que llegaron a stock=0
      const data = await productosService.obtenerTodos(false);
      setProductos(data);
    } catch (err) {
      console.error('Error al cargar productos:', err);
    }
  };

  const limpiarMensajes = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
    setErrors({});
  };

  const handleEntradaChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEntradaForm((prev) => ({
      ...prev,
      [name]: name === 'producto_id' || name === 'cantidad'
        ? value === '' ? 0 : parseInt(value)
        : value,
    }));
    limpiarMensajes();
  };

  const handleSalidaChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSalidaForm((prev) => ({
      ...prev,
      [name]: name === 'producto_id' || name === 'cantidad'
        ? value === '' ? 0 : parseInt(value)
        : value,
    }));
    limpiarMensajes();
  };

  // Seleccionar todo el texto al hacer focus
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const validateEntrada = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!entradaForm.producto_id) {
      newErrors.producto_id = 'Debe seleccionar un producto';
    }

    if (entradaForm.cantidad <= 0) {
      newErrors.cantidad = 'La cantidad debe ser mayor a 0';
    }

    if (!entradaForm.proveedor.trim()) {
      newErrors.proveedor = 'El proveedor es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSalida = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!salidaForm.producto_id) {
      newErrors.producto_id = 'Debe seleccionar un producto';
    }

    if (salidaForm.cantidad <= 0) {
      newErrors.cantidad = 'La cantidad debe ser mayor a 0';
    }

    if (!salidaForm.motivo.trim()) {
      newErrors.motivo = 'El motivo es obligatorio';
    }

    // Validar stock disponible
    const producto = productos.find((p) => p.id === salidaForm.producto_id);
    if (producto && salidaForm.cantidad > producto.stock) {
      newErrors.cantidad = `Stock insuficiente. Disponible: ${producto.stock}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegistrarEntrada = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEntrada()) {
      return;
    }

    try {
      setLoading(true);
      await inventarioService.registrarEntrada(entradaForm);
      setSuccessMessage('✅ Entrada registrada exitosamente');
      setEntradaForm({
        producto_id: 0,
        cantidad: 0,
        proveedor: '',
        lote: '',
        bodega: '',
      });
      await cargarProductos(); // Recargar para actualizar stocks
    } catch (err) {
      const apiError = err as ApiError;
      setErrorMessage(apiError.detail || 'Error al registrar entrada');
    } finally {
      setLoading(false);
    }
  };

  const handleRegistrarSalida = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateSalida()) {
      return;
    }

    try {
      setLoading(true);
      await inventarioService.registrarSalida(salidaForm);
      setSuccessMessage('✅ Salida registrada exitosamente');
      setSalidaForm({
        producto_id: 0,
        cantidad: 0,
        motivo: '',
        bodega: '',
      });
      await cargarProductos(); // Recargar para actualizar stocks
    } catch (err) {
      const apiError = err as ApiError;
      setErrorMessage(apiError.detail || 'Error al registrar salida');
    } finally {
      setLoading(false);
    }
  };

  const productoSeleccionado = productos.find(
    (p) => p.id === (tipoMovimiento === 'entrada' ? entradaForm.producto_id : salidaForm.producto_id)
  );

  return (
    <div className="inventario">
      <div className="inventario__header">
        <div>
          <h1>Gestión de Inventario</h1>
          <p className="inventario__subtitle">Registrar entradas y salidas de productos</p>
        </div>
      </div>

      {successMessage && (
        <div className="inventario__success">
          <p>{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="inventario__error">
          <p>⚠️ {errorMessage}</p>
        </div>
      )}

      <div className="inventario__tabs">
        <button
          className={`tab ${tipoMovimiento === 'entrada' ? 'tab--active' : ''}`}
          onClick={() => {
            setTipoMovimiento('entrada');
            limpiarMensajes();
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
          Entrada de Productos
        </button>
        <button
          className={`tab ${tipoMovimiento === 'salida' ? 'tab--active' : ''}`}
          onClick={() => {
            setTipoMovimiento('salida');
            limpiarMensajes();
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
          Salida de Productos
        </button>
      </div>

      {tipoMovimiento === 'entrada' ? (
        <Card>
          <form onSubmit={handleRegistrarEntrada} className="inventario-form">
            <div className="inventario-form__grid">
              <div className="inventario-form__field inventario-form__field--full">
                <Select
                  label="Producto *"
                  name="producto_id"
                  value={entradaForm.producto_id.toString()}
                  onChange={handleEntradaChange}
                  error={errors.producto_id}
                  options={productos.map((p) => ({
                    value: p.id.toString(),
                    label: `${p.sku} - ${p.nombre} ${p.estado === 'Inactivo' ? '(Inactivo - Stock: 0)' : ''}`,
                  }))}
                  fullWidth
                />
              </div>

              {productoSeleccionado && (
                <div className="inventario-form__field inventario-form__field--full">
                  <div className="producto-info">
                    <div className="producto-info__item">
                      <span className="producto-info__label">Stock Actual:</span>
                      <span className="producto-info__value">{productoSeleccionado.stock}</span>
                    </div>
                    <div className="producto-info__item">
                      <span className="producto-info__label">Tipo:</span>
                      <span className="producto-info__value">{productoSeleccionado.tipo_licor}</span>
                    </div>
                    <div className="producto-info__item">
                      <span className="producto-info__label">Presentación:</span>
                      <span className="producto-info__value">{productoSeleccionado.presentacion}</span>
                    </div>
                  </div>
                </div>
              )}

              <Input
                label="Cantidad *"
                name="cantidad"
                type="number"
                value={entradaForm.cantidad || ''}
                onChange={handleEntradaChange}
                onFocus={handleFocus}
                error={errors.cantidad}
                placeholder="Ej: 50"
                min="1"
                fullWidth
              />

              <Input
                label="Proveedor *"
                name="proveedor"
                value={entradaForm.proveedor}
                onChange={handleEntradaChange}
                error={errors.proveedor}
                placeholder="Ej: Licores Nacionales S.A."
                fullWidth
              />

              <Input
                label="Lote"
                name="lote"
                value={entradaForm.lote}
                onChange={handleEntradaChange}
                placeholder="Ej: LT-2024-001"
                fullWidth
              />

              <Input
                label="Bodega"
                name="bodega"
                value={entradaForm.bodega}
                onChange={handleEntradaChange}
                placeholder="Ej: Bodega Principal"
                fullWidth
              />
            </div>

            <div className="inventario-form__actions">
              <Button type="submit" variant="success" loading={loading} fullWidth>
                Registrar Entrada
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Card>
          <form onSubmit={handleRegistrarSalida} className="inventario-form">
            <div className="inventario-form__grid">
              <div className="inventario-form__field inventario-form__field--full">
                <Select
                  label="Producto *"
                  name="producto_id"
                  value={salidaForm.producto_id.toString()}
                  onChange={handleSalidaChange}
                  error={errors.producto_id}
                  options={productos
                    .filter((p) => p.estado === 'Activo') // Solo mostrar activos para salidas
                    .map((p) => ({
                      value: p.id.toString(),
                      label: `${p.sku} - ${p.nombre} (Stock: ${p.stock})`,
                    }))}
                  fullWidth
                />
              </div>

              {productoSeleccionado && (
                <div className="inventario-form__field inventario-form__field--full">
                  <div className="producto-info">
                    <div className="producto-info__item">
                      <span className="producto-info__label">Stock Disponible:</span>
                      <span className={`producto-info__value ${productoSeleccionado.stock < 10 ? 'producto-info__value--low' : ''}`}>
                        {productoSeleccionado.stock}
                      </span>
                    </div>
                    <div className="producto-info__item">
                      <span className="producto-info__label">Tipo:</span>
                      <span className="producto-info__value">{productoSeleccionado.tipo_licor}</span>
                    </div>
                    <div className="producto-info__item">
                      <span className="producto-info__label">Presentación:</span>
                      <span className="producto-info__value">{productoSeleccionado.presentacion}</span>
                    </div>
                  </div>
                </div>
              )}

              <Input
                label="Cantidad *"
                name="cantidad"
                type="number"
                value={salidaForm.cantidad || ''}
                onChange={handleSalidaChange}
                onFocus={handleFocus}
                error={errors.cantidad}
                placeholder="Ej: 10"
                min="1"
                fullWidth
              />

              <Input
                label="Motivo *"
                name="motivo"
                value={salidaForm.motivo}
                onChange={handleSalidaChange}
                error={errors.motivo}
                placeholder="Ej: Venta al cliente, Merma, Devolución"
                fullWidth
              />

              <Input
                label="Bodega"
                name="bodega"
                value={salidaForm.bodega}
                onChange={handleSalidaChange}
                placeholder="Ej: Bodega Principal"
                fullWidth
              />
            </div>

            <div className="inventario-form__actions">
              <Button type="submit" variant="danger" loading={loading} fullWidth>
                Registrar Salida
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};

export default Inventario;
