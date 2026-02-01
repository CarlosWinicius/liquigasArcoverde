import React from 'react';
import { Link } from 'react-router-dom';

type PageShellProps = {
  title?: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
};

const PageShell: React.FC<PageShellProps> = ({ title, subtitle, badge, children }) => {
  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">🛢️</div>
          <div>
            <h1>Liquigás Arcoverde</h1>
            <span>Entrega rápida e segura</span>
          </div>
        </div>
        <Link className="admin-link" to="/admin/login">
          Área Admin
        </Link>
      </header>
      <section className="hero">
        {badge && <span className="badge">{badge}</span>}
        {title && <h2>{title}</h2>}
        {subtitle && <p>{subtitle}</p>}
      </section>
      <main className="content">{children}</main>
      <footer className="footer">
        <div>
          <strong>Liquigás Arcoverde</strong> • Rua das Palmeiras, 123 • (87) 9 9999-9999
        </div>
        <span>Horário: 08h às 20h • Segunda a sábado</span>
      </footer>
    </div>
  );
};

export default PageShell;
