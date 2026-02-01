import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signInError) {
      setError('Falha ao autenticar. Verifique usuário e senha.');
    } else {
      navigate('/admin');
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <form className="card login-card" onSubmit={handleSubmit}>
        <h2>Login do Revendedor</h2>
        <p className="helper">Acesso exclusivo para a equipe de operações.</p>
        <label htmlFor="email">Usuário</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="admin@liquigas.com"
          required
        />
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••••"
          required
        />
        {error && <p className="helper error">{error}</p>}
        <button className="button" type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
