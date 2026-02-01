import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="admin-page">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">🛠️</div>
          <div>
            <h1>Painel Administrativo</h1>
            <span>Liquigás Arcoverde</span>
          </div>
        </div>
      </header>
      <div className="admin-layout">
        <aside className="sidebar">
          <NavLink to="/admin" end>
            Dashboard
          </NavLink>
          <NavLink to="/admin/pedidos">Pedidos</NavLink>
          <NavLink to="/admin/estoque">Estoque</NavLink>
          <NavLink to="/admin/produtos">Produtos</NavLink>
          <NavLink to="/admin/brindes">Brindes</NavLink>
          <NavLink to="/admin/config">Configurações</NavLink>
        </aside>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
};

export default AdminShell;
