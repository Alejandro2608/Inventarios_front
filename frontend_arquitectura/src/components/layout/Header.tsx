/**
 * Header Component
 * Barra superior de navegación de la aplicación
 */

import React from 'react';
import './Header.css';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const appName = import.meta.env.VITE_APP_NAME || 'LicoCastillo';

  return (
    <header className="header">
      <div className="header__left">
        <button
          className="header__menu-btn"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <div className="header__logo">
          <svg
            className="header__logo-icon"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M8 2h8M9 2v5.5A3.5 3.5 0 0 1 5.5 11A3.5 3.5 0 0 1 2 7.5V2" />
            <path d="M15 2v5.5a3.5 3.5 0 0 0 3.5 3.5 3.5 3.5 0 0 0 3.5-3.5V2" />
            <path d="M5 11v9a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-9" />
          </svg>
          <h1 className="header__title">{appName}</h1>
        </div>
      </div>

      <div className="header__right">
        <span className="header__subtitle">Sistema de Inventarios</span>
      </div>
    </header>
  );
};

export default Header;
