import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../src/index.css";
import "../assets/Css/login/Login.css";
import HeaderLogin from "../components/header/HeaderLogin";
import FooterGlobal from "../components/footer/FooterGlobal";
import logo from "../assets/images/logo.webp";
import Secaonavbar from "../components/navbar/Secaonavbar";

const Login = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="home-principal">
      {/* Header */}
      <div className="header">
        <HeaderLogin />
      </div>

      {/* NavBar */}
      <div className="nav-bar">
        <Secaonavbar />
      </div>

      {/* Logo */}
      <div className="container mt-5">
        <div className="row">
          {/* Coluna do Logotipo */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div className="logo-login">
              <img
                src={logo}
                alt="Logotipo alerta natural"
                className="logo-login-principal"
              />
            </div>
          </div>

          {/* Coluna do Formulário */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <form className="w-75">
              <h3 className="label-login mb-5 text-center">Login</h3>
              <div className="label-name mb-3 text-center">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control form-control-sm mx-auto"
                  id="email"
                  placeholder="Digite seu email"
                />
              </div>
              <div className="label-name mb-3 text-center">
                <label htmlFor="password" className="form-label">
                  Senha
                </label>
                <input
                  type="password"
                  className="form-control form-control-sm mx-auto"
                  id="password"
                  placeholder="Digite sua senha"
                />
              </div>
              <button type="submit" className="btn btn-secondary w-100 mt-3">
                Entrar
              </button>
              <div className="text-center mt-3">
                <Link to="/cadastro">Cadastrar-se</Link>
              </div>
              <button
                type="button"
                className="btn btn-outline-secondary w-100 mt-3 d-flex align-items-center justify-content-center"
              >
                <i className="fab fa-google me-2"></i> {/* Ícone do Google */}
                Entrar com Google
              </button>
              <div className="text-center mt-3">
                <button
                  type="button"
                  className="btn btn-link"
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={handleOpenModal}
                >
                  Esqueceu sua senha?
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content text-center"
              style={{
                backgroundColor: "#27335C",
                color: "#D9D9D9",
                fontSize: "14px",
                fontWeight: "bolder",
              }}
            >
              <div
                className="modal-header"
                style={{
                  border: "none",
                }}
              >
                <h5 className="modal-title w-100">Esqueci minha senha</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <p
                  className="mt-4"
                  style={{
                    color: "#D9D9D9",
                    fontSize: "16px",
                  }}
                >
                  Digite seu email para recuperação
                </p>
                <input
                  type="email"
                  className="form-control mt-3"
                  id="recoverEmail"
                  style={{
                    backgroundColor: "#D9D9D9",
                    color: "#D9D9D9",
                    border: "1px solid #D9D9D9",
                  }}
                />
              </div>
              <div
                className="modal-footer justify-content-center"
                style={{
                  border: "none",
                }}
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#D9D9D9",
                    color: "#27335C",
                    fontWeight: "bold",
                  }}
                  onClick={handleCloseModal}
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="footer-login mt-5">
        <FooterGlobal />
      </div>
    </div>
  );
};

export default Login;
