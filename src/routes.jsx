import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Previsao from "./pages/Previsao";
import Feed from "./pages/feed";
import Contato from "./pages/Contato";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import { EditarPerfil } from "./pages/EditarPerfil";
import SecaoBar from "./components/previsao/SecaoBar";
import GaleriaFoto from "./pages/GaleriaFoto";
import Mapa from './mapa/Mapa'; 


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
        <Route path="/buscar" element={<SecaoBar />} />
        <Route path="/galeriaFotos" element={<GaleriaFoto />} />
        <Route path="/mapa" element={<Mapa />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;