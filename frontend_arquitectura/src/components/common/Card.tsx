/**
 * Card Component
 * Tarjeta contenedora reutilizable
 */

import React from 'react';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerActions?: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  headerActions,
  className = '',
  padding = 'md',
  hover = false,
}) => {
  const classes = [
    'card',
    `card--padding-${padding}`,
    hover ? 'card--hover' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {(title || headerActions) && (
        <div className="card__header">
          <div className="card__header-content">
            {title && <h3 className="card__title">{title}</h3>}
            {subtitle && <p className="card__subtitle">{subtitle}</p>}
          </div>
          {headerActions && <div className="card__actions">{headerActions}</div>}
        </div>
      )}

      <div className="card__body">{children}</div>
    </div>
  );
};

export default Card;
