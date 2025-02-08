import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../src/index.css";
import "../assets/Css/login/Login.css";
import HeaderLogin from "../components/header/HeaderLogin";
import FooterGlobal from "../components/footer/FooterGlobal";
import logo from "../assets/images/logo.webp";
import Secaonavbar from "../components/navbar/Secaonavbar";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const [error, setError] = useState(""); // Para exibir erros
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpa erros anteriores

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", formData);
      
      // Salva o token JWT no localStorage
      localStorage.setItem("token", response.data.token);
      
      // Redireciona para a Home
      navigate("/");
    } catch (error) {
      setError("Email ou senha inválidos. Tente novamente.");
    }
  };

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
            <form className="w-75" onSubmit={handleSubmit}>
              <h3 className="label-login mb-5 text-center">Login</h3>
              
              {error && <p className="text-danger text-center">{error}</p>}

              <div className="label-name mb-3 text-center">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control form-control-sm mx-auto"
                  placeholder="Digite seu email"
                  required
                />
              </div>
              
              <div className="label-name mb-3 text-center">
                <label htmlFor="senha" className="form-label">Senha</label>
                <input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className="form-control form-control-sm mx-auto"
                  placeholder="Digite sua senha"
                  required
                />
              </div>

              <button type="submit" className="btn btn-secondary w-100 mt-3">Entrar</button>

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
                <button type="button" className="btn btn-link" style={{ textDecoration: "none", color: "inherit" }}>
                  Esqueceu sua senha?
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer-login mt-5">
        <FooterGlobal />
      </div>
    </div>
  );
};

export default Login;
