import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Adicione useNavigate
import { Dropdown } from "react-bootstrap";
import bannerHeader from "../../assets/images/banner-header.jpg";
import logo from "../../assets/images/logo.webp";
import "../../assets/Css/header/Header.css";
import "../../assets/Css/header/logo.css";
import imagemGenerica from "../../assets/images/img-default.png";
import PropTypes from "prop-types";

const Header = ({ label }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Adicione useNavigate

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

  const handleLogout = () => {
    // Remove os dados do usuário e o token do localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  
    // Atualiza o estado do usuário para null
    setUser(null);
  
    // Dispara o evento userUpdate para atualizar outros componentes
    window.dispatchEvent(new Event("userUpdate"));
  
  
    // Redireciona o usuário para a página de login após o logout do Google
    setTimeout(() => {
      navigate("/login");
    }, 1000); // 1 segundo de atraso
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
            <div
              className="login-circle"
              style={{
                backgroundImage: `url(${user.foto ? `http://localhost:8080/fotos/${user.foto}` : imagemGenerica})`,
                backgroundSize: "cover",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
              }}
            ></div>
            <span className="text-light fs-5">{user.nome}</span>
            <Dropdown>
              <Dropdown.Toggle variant="link" className="text-light border-0">
                {/* Removida a seta extra */}
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
          <Link to="/login" className="login-text text-light text-decoration-none fs-5">
            Faça seu Login
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