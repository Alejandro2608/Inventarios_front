/**
 * Select Component
 * Dropdown reutilizable
 */

import React from 'react';
import './Select.css';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  options: SelectOption[];
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  options,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  const classes = [
    'select__field',
    error ? 'select__field--error' : '',
    fullWidth ? 'select__field--full-width' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`select ${fullWidth ? 'select--full-width' : ''}`}>
      {label && (
        <label htmlFor={selectId} className="select__label">
          {label}
        </label>
      )}

      <select id={selectId} className={classes} {...props}>
        <option value="">Seleccionar...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <span className="select__error">{error}</span>}
      {helperText && !error && <span className="select__helper">{helperText}</span>}
    </div>
  );
};

export default Select;
