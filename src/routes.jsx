import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Previsao from "./pages/Previsao";
import Feed from "./pages/feed";
import Contato from "./pages/Contato";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import { EditarPerfil } from "./pages/EditarPerfil";
import SecaoBarPrevisao from "./components/previsao/SecaoBarPrevisao";
import GaleriaFoto from "./pages/GaleriaFoto";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/previsao" element={<Previsao />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/EditarPerfil" element={<EditarPerfil />} />
        <Route path="/buscar" element={<SecaoBarPrevisao />} />
        <Route path="/galeriaFotos" element={<GaleriaFoto />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;