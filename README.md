# UserLoginFront

Front-end React para o projeto UserRouteAPI, oferecendo interface para login, recuperação e redefinição de senha.

## 📌 Descrição

Este projeto React utiliza React Router para navegação entre as páginas de login, recuperação de senha (envio e verificação de código) e redefinição de senha.

Ele se comunica com o backend UserRouteAPI para autenticação e gerenciamento seguro de usuários.

---

## 🚀 Como rodar o projeto

### 1. Garanta que o backend (UserRouteAPI) esteja rodando

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure a URL do backend

Crie um arquivo `.env` na raiz do projeto React com a variável:

```env
VITE_API_URL=http://localhost:3000
```

> Substitua o valor acima pela URL onde seu backend está rodando.

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O projeto estará disponível por padrão em:  
📍 `http://localhost:5173`

---

## 🧠 Tecnologias utilizadas

- React 18+
- React Router Dom
- Vite (ferramenta de build e dev server)
- Fetch API para chamadas HTTP
- CSS básico para estilos simples

---

## 📁 Estrutura das principais rotas/páginas

- `/` — Tela de Login
- `/ResetSenha` — Tela para iniciar recuperação de senha (envio e verificação de código)
- `/NovaSenha` — Tela para redefinir senha após verificação

---

## 👨‍💻 Autor

**Jamir Soares Rodrigues**