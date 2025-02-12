import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bannerHeader from "../../assets/images/banner-header.jpg";
import logo from "../../assets/images/logo.webp";
import "../../assets/Css/header/Header.css";
import "../../assets/Css/header/logo.css";
import imagemGenerica from "../../assets/images/img-default.png";
import PropTypes from "prop-types"; // Importando PropTypes

const Header = ({ label }) => {
  const [user, setUser] = useState(null);

  // Tenta recuperar os dados do usuário do localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  
    // 🚀 Ouve o evento de atualização do usuário
    const handleUserUpdate = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };
  
    window.addEventListener("userUpdate", handleUserUpdate);
  
    return () => {
      window.removeEventListener("userUpdate", handleUserUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove os dados do usuário
    setUser(null); // Atualiza o estado para refletir que o usuário saiu
  };

  return (
    <div className="header-principal position-relative">
      <img
        src={bannerHeader}
        alt="Banner Header"
        className="header-banner img-fluid w-100"
      />
      <div className="logo">
        <img src={logo} alt="Logotipo alerta natural" className="logo-banner" />
      </div>
      <div className="label-principal position-absolute top-50 start-50 translate-middle text-white text-center fs-1 fw-bold">
        <label htmlFor="">{label}</label>
      </div>
      <div className="login-principal position-absolute top-50 end-0 translate-middle-y d-flex align-items-center gap-2 me-3">
        {user ? (
          <>
            <span className="text-light fs-5">{user.nome}</span>
            <div
              className="login-circle"
              style={{
                backgroundImage: `url(${user.foto ? `http://localhost:8080/fotos/${user.foto}` : imagemGenerica})`,
                backgroundSize: "cover",
              }}
            ></div>
            <button onClick={handleLogout} className="btn btn-link text-light">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="login-text text-light text-decoration-none fs-5">
            Faça seu Login
            <div
              className="login-circle"
              style={{
                backgroundImage: `url(${imagemGenerica})`,
                backgroundSize: "cover",
              }}
            ></div>
            
          </Link>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Header;
