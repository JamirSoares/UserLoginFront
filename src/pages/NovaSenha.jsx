import '../App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [confirmarSenha, setconfirmarSenha] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (senha !== confirmarSenha) {
        setMensagem('❌ As senhas não coincidem!');
        return;
      }
      const resposta = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/reset-senha`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ confirmarSenha, senha }),
      });

      if (!resposta.ok) {
        const erro = await resposta.text();
        throw new Error(erro || 'Errorr no login');
      }

      const dados = await resposta.json();
      setMensagem(`✅ Senha alterada com sucesso! Bem-vindo(a), ${dados.nome}!`);
    } catch (err) {
      setMensagem(`❌ Erro: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: '2rem' }} className='container'>
      <div className='centro'>
        <h2>Redefinir Senha</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }} className='login'>
            <label>confirmarSenha:
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setconfirmarSenha(e.target.value)}
                placeholder="Digite sua senha"
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
                placeholder="Confirme sua senha"
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
