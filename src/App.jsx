import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/ResetSenha";
import NovaSenha from "./pages/NovaSenha";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/ResetSenha" element={<Dashboard />} />
      <Route path="/NovaSenha" element={<NovaSenha />} />
    </Routes>
  );
}

export default App;