import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/Css/navbar/Secaonavbar.css";

const Secaonavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar o menu hamburguer

  // Função para alternar o menu hamburguer
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="secao-navbar">
      {/* Menu hamburguer para telas pequenas */}
      <button className="hamburguer-button" onClick={toggleMenu}>
        ☰
      </button>

      {/* Links da navbar */}
      <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Início</Link>
        <Link to="/previsao" onClick={() => setIsMenuOpen(false)}>Previsão do Tempo</Link>
        <Link to="/feed" onClick={() => setIsMenuOpen(false)}>Feed</Link>
        <Link to="/contato" onClick={() => setIsMenuOpen(false)}>Contato</Link>
      </nav>
    </div>
  );
};

export default Secaonavbar;