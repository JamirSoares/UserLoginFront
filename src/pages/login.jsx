import '../App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate(); // ← aqui

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!resposta.ok) {
        const erro = await resposta.text();
        throw new Error(erro || 'Erro no login');
      }

      const dados = await resposta.json();
    } catch (err) {
      setMensagem(`❌ Erro: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: '2rem' }} className='container'>
      <div className='centro'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }} className='login'>
            <label>Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                required
                style={{ marginLeft: '1rem' }}
              />
            </label>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Senha:
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
                required
                style={{ marginLeft: '1rem' }}
              />
            </label>
          </div>

          <button type="submit">Entrar</button>
        </form>
        <button
          className='botao-link'
          type="submit"
          style={{ marginTop: '1rem', background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
          onClick={() => navigate('/ResetSenha')}
        >
          Esqueci minha senha
        </button>
        {mensagem && <p>{mensagem}</p>}
      </div>
    </div>
  );
}

export default App;
