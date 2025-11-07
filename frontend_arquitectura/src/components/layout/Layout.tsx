/**
 * Layout Principal
 * Componente que contiene la estructura base de la aplicación
 */

import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="layout">
      <Header onMenuClick={toggleSidebar} />

      <div className="layout__container">
        <Sidebar isOpen={sidebarOpen} />

        <main className={`layout__main ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <div className="layout__content">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
