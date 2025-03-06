import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import bannerHeader from "../../assets/images/banner-header.jpg";
import logo from "../../assets/images/logo.webp";
import "../../assets/Css/header/Header.css";
import "../../assets/Css/header/logo.css";
import PropTypes from "prop-types";

const Header = ({ label }) => {
  const [user, setUser] = useState(null); // Estado para armazenar os dados do usuário
  const navigate = useNavigate();

  // Efeito para carregar os dados do usuário do localStorage e configurar o listener de atualização
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    const handleUserUpdate = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };

    window.addEventListener("userUpdate", handleUserUpdate);

    return () => {
      window.removeEventListener("userUpdate", handleUserUpdate);
    };
  }, []);

  // Função para fazer logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.dispatchEvent(new Event("userUpdate"));
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  // Define a URL da foto do usuário ou a imagem padrão
  const userFoto = user?.foto
    ? `http://localhost:8080/fotos/${user.foto}` // Foto do usuário
    : "http://localhost:8080/fotos/padrao"; // Imagem padrão

  return (
    <div className="header-principal position-relative">
      {/* Banner do header */}
      <img
        src={bannerHeader}
        alt="Banner Header"
        className="header-banner img-fluid w-100"
      />

      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="Logotipo alerta natural" className="logo-banner" />
      </div>

      {/* Label principal */}
      <div className="label-principal position-absolute top-50 start-50 translate-middle text-white text-center fs-1 fw-bold">
        <label htmlFor="">{label}</label>
      </div>

      {/* Área de login e perfil do usuário */}
      <div className="login-principal position-absolute top-50 end-0 translate-middle-y d-flex align-items-center gap-2 me-3">
        {user ? (
          <>
            {/* Foto do usuário ou imagem padrão */}
            <img
              src={userFoto}
              alt="Foto do usuário"
              className="login-circle"
              onError={(e) => {
                e.target.src = "http://localhost:8080/fotos/padrao";
                e.target.classList.add("foto-padrao"); // Adiciona classe para imagem padrão
              }}
              onLoad={(e) => {
                if (e.target.src.includes("padrao")) {
                  e.target.classList.add("foto-padrao");
                } else {
                  e.target.classList.remove("foto-padrao");
                }
              }}
            />

            {/* Nome do usuário */}
            <span className="text-light fs-5">{user.nome}</span>

            {/* Dropdown para editar perfil e logout */}
            <Dropdown>
              <Dropdown.Toggle variant="link" className="text-light border-0">
                {/* Ícone do dropdown (pode ser adicionado aqui) */}
              </Dropdown.Toggle>
              <Dropdown.Menu
                style={{
                  zIndex: 9999,
                  position: "absolute",
                  right: 0,
                  left: "auto",
                }}
                popperConfig={{
                  modifiers: [
                    {
                      name: "preventOverflow",
                      options: {
                        boundary: "viewport",
                      },
                    },
                  ],
                }}
              >
                <Dropdown.Item as={Link} to="/EditarPerfil">
                  Editar Perfil
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        ) : (
          // Link para a página de login
          <Link to="/login" className="login-text text-light text-decoration-none fs-5">
            Faça seu Login
          </Link>
        )}
      </div>
    </div>
  );
};

// Validação das props
Header.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Header;