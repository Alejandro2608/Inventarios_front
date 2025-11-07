/**
 * ProductoForm Component
 * Formulario para crear y editar productos
 */

import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import type { ProductoCreateDTO, ProductoResponseDTO, TipoLicor } from '../../types/dtos/producto.dto';
import './ProductoForm.css';

interface ProductoFormProps {
  producto?: ProductoResponseDTO;
  onSubmit: (data: ProductoCreateDTO) => Promise<void>;
  onCancel: () => void;
  isEdit?: boolean;
}

const tiposLicor: TipoLicor[] = [
  'Ron',
  'Whisky',
  'Vodka',
  'Tequila',
  'Aguardiente',
  'Vino',
  'Cerveza',
  'Brandy',
  'Ginebra',
  'Licor',
  'Otro',
];

const ProductoForm: React.FC<ProductoFormProps> = ({
  producto,
  onSubmit,
  onCancel,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState<ProductoCreateDTO>({
    sku: '',
    nombre: '',
    tipo_licor: '',
    presentacion: '',
    proveedor: '',
    precio_compra: 0,
    precio_venta: 0,
    stock: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Cargar datos si es edición
  useEffect(() => {
    if (isEdit && producto) {
      setFormData({
        sku: producto.sku,
        nombre: producto.nombre,
        tipo_licor: producto.tipo_licor,
        presentacion: producto.presentacion,
        proveedor: producto.proveedor,
        precio_compra: producto.precio_compra,
        precio_venta: producto.precio_venta,
        stock: producto.stock,
      });
    }
  }, [isEdit, producto]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name.includes('precio') || name === 'stock'
          ? value === '' ? 0 : parseFloat(value)
          : value,
    }));

    // Limpiar error del campo
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Seleccionar todo el texto cuando el campo tiene valor 0
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.sku.trim()) {
      newErrors.sku = 'El SKU es obligatorio';
    }

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!formData.tipo_licor) {
      newErrors.tipo_licor = 'El tipo de licor es obligatorio';
    }

    if (!formData.presentacion.trim()) {
      newErrors.presentacion = 'La presentación es obligatoria';
    }

    if (!formData.proveedor.trim()) {
      newErrors.proveedor = 'El proveedor es obligatorio';
    }

    if (formData.precio_compra <= 0) {
      newErrors.precio_compra = 'El precio de compra debe ser mayor a 0';
    }

    if (formData.precio_venta <= 0) {
      newErrors.precio_venta = 'El precio de venta debe ser mayor a 0';
    }

    if (formData.precio_venta < formData.precio_compra) {
      newErrors.precio_venta = 'El precio de venta debe ser mayor al de compra';
    }

    if (formData.stock < 0) {
      newErrors.stock = 'El stock no puede ser negativo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);
      await onSubmit(formData);
    } catch (error) {
      console.error('Error al guardar producto:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="producto-form" onSubmit={handleSubmit}>
      <div className="producto-form__grid">
        <Input
          label="SKU *"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          error={errors.sku}
          placeholder="Ej: RON-001"
          disabled={isEdit} // No se puede cambiar el SKU en edición
          fullWidth
        />

        <Input
          label="Nombre del Producto *"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          error={errors.nombre}
          placeholder="Ej: Ron Viejo de Caldas 8 Años"
          fullWidth
        />

        <Select
          label="Tipo de Licor *"
          name="tipo_licor"
          value={formData.tipo_licor}
          onChange={handleChange}
          error={errors.tipo_licor}
          options={tiposLicor.map((tipo) => ({ value: tipo, label: tipo }))}
          fullWidth
        />

        <Input
          label="Presentación *"
          name="presentacion"
          value={formData.presentacion}
          onChange={handleChange}
          error={errors.presentacion}
          placeholder="Ej: Botella 750ml"
          fullWidth
        />

        <Input
          label="Proveedor *"
          name="proveedor"
          value={formData.proveedor}
          onChange={handleChange}
          error={errors.proveedor}
          placeholder="Ej: Licores Nacionales S.A."
          fullWidth
        />

        <Input
          label="Precio de Compra (COP) *"
          name="precio_compra"
          type="number"
          value={formData.precio_compra || ''}
          onChange={handleChange}
          onFocus={handleFocus}
          error={errors.precio_compra}
          placeholder="Ej: 25000"
          min="0"
          step="1"
          fullWidth
        />

        <Input
          label="Precio de Venta (COP) *"
          name="precio_venta"
          type="number"
          value={formData.precio_venta || ''}
          onChange={handleChange}
          onFocus={handleFocus}
          error={errors.precio_venta}
          placeholder="Ej: 35000"
          min="0"
          step="1"
          fullWidth
        />

        <Input
          label="Stock Inicial *"
          name="stock"
          type="number"
          value={formData.stock || ''}
          onChange={handleChange}
          onFocus={handleFocus}
          error={errors.stock}
          placeholder="Ej: 100"
          min="0"
          disabled={isEdit} // En edición, el stock se maneja con movimientos
          helperText={
            isEdit
              ? 'El stock se modifica mediante entradas y salidas'
              : undefined
          }
          fullWidth
        />
      </div>

      <div className="producto-form__actions">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" loading={loading}>
          {isEdit ? 'Actualizar Producto' : 'Registrar Producto'}
        </Button>
      </div>
    </form>
  );
};

export default ProductoForm;
