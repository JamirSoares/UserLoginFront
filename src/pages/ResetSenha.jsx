import '../App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ResetSenha() {
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [CodigoRecuperacao, setCodigoRecuperacao] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [etapa, setEtapa] = useState(1); // 1 = Enviar código, 2 = Verificar, 3 = Redefinir senha
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (etapa === 1) {
        // Etapa 1: Enviar código
        const resposta = await fetch(`${import.meta.env.VITE_API_URL}/recuperacao-senha/recovery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, cpf }),
        });

        if (!resposta.ok) throw new Error(await resposta.text());
        setMensagem('✅ Código enviado para seu email!');
        setEtapa(2);
      } else if (etapa === 2) {
        // Etapa 2: Verificar código
        const resposta = await fetch(`${import.meta.env.VITE_API_URL}/recuperacao-senha/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, cpf, CodigoRecuperacao }),
        });

        if (!resposta.ok) throw new Error(await resposta.text());
        setMensagem('✅ Código verificado com sucesso!');
        setEtapa(3);
      } else if (etapa === 3) {
        // Etapa 3: Redefinir senha
        if (senha !== confirmarSenha) {
          setMensagem('❌ As senhas não coincidem.');
          return;
        }

        const resposta = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/reset-senha`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, cpf, senha, confirmarSenha }),
        });

        if (!resposta.ok) throw new Error(await resposta.text());
        setMensagem('✅ Senha redefinida com sucesso!');
        setTimeout(() => navigate('/'), 2000);
      }
    } catch (err) {
      setMensagem(`❌ Erro: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: '2rem' }} className="container">
      <div className="centro">
        <h2>Redefinir Senha</h2>
        <form onSubmit={handleSubmit}>
          {/* Email e CPF sempre visíveis */}
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

          {/* Etapa 2: Código */}
          {etapa >= 2 && (
            <div style={{ marginBottom: '1rem' }} className="login">
              <label>
                Código:
                <input
                  type="text"
                  value={CodigoRecuperacao}
                  onChange={(e) => setCodigoRecuperacao(e.target.value)}
                  placeholder="Digite o código enviado por email"
                  required
                  style={{ marginLeft: '1rem' }}
                />
              </label>
            </div>
          )}

          {/* Etapa 3: Nova senha */}
          {etapa === 3 && (
            <>
              <div style={{ marginBottom: '1rem' }} className="login">
                <label>
                  Nova senha:
                  <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Digite sua nova senha"
                    required
                    style={{ marginLeft: '1rem' }}
                  />
                </label>
              </div>
              <div style={{ marginBottom: '1rem' }} className="login">
                <label>
                  Confirmar senha:
                  <input
                    type="password"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    placeholder="Confirme sua nova senha"
                    required
                    style={{ marginLeft: '1rem' }}
                  />
                </label>
              </div>
            </>
          )}

          <button type="submit">
            {etapa === 1
              ? 'Enviar Código'
              : etapa === 2
                ? 'Verificar Código'
                : 'Redefinir Senha'}
          </button>
        </form>

        {mensagem && <p>{mensagem}</p>}
      </div>
    </div>
  );
}

export default ResetSenha;
