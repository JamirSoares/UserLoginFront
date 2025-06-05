import '../App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ResetSenha() {
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/reset-senha`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, cpf, novaSenha }),
      });

      if (!resposta.ok) {
        const erro = await resposta.text();
        throw new Error(erro || 'Erro ao alterar a senha');
      }

      setMensagem('✅ Senha alterada com sucesso!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setMensagem(`❌ Erro: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: '2rem' }} className="container">
      <div className="centro">
        <h2>Redefinir Senha</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }} className="login">
            <label>
              Email:
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

          <div style={{ marginBottom: '1rem' }} className="login">
            <label>
              CPF:
              <input
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="Digite seu CPF"
                required
                style={{ marginLeft: '1rem' }}
              />
            </label>
          </div>

          <div style={{ marginBottom: '1rem' }} className="login">
            <label>
              Nova Senha:
              <input
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                placeholder="Digite a nova senha"
                required
                style={{ marginLeft: '1rem' }}
              />
            </label>
          </div>

          <button type="submit">Alterar Senha</button>
        </form>

        {mensagem && <p>{mensagem}</p>}
      </div>
    </div>
  );
}

export default ResetSenha;
