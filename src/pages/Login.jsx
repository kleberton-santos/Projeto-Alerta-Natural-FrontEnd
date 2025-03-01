import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axiosConfig"; // Importa o Axios configurado
import "../../src/index.css";
import "../assets/Css/login/Login.css";
import HeaderLogin from "../components/header/HeaderLogin";
import FooterGlobal from "../components/footer/FooterGlobal";
import logo from "../assets/images/logo.webp";
import Secaonavbar from "../components/navbar/Secaonavbar";
import ModalEsqueciSenha from "../components/modal/ModalEsqueciSenha";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Função para abrir o modal
  const handleShowModal = () => setShowModal(true);

  // Função para fechar o modal
  const handleCloseModal = () => setShowModal(false);

  // Função para atualizar o estado do formulário
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpa erros anteriores

    try {
      // Faz a requisição POST para a API de login
      const response = await axios.post("http://localhost:8080/api/auth/login", formData, {
        headers: {
          "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
        },
        withCredentials: true, // Envia credenciais (cookies, tokens)
      });

      console.log("Resposta completa da API:", response);

      // Salva o token JWT no localStorage
      localStorage.setItem("token", response.data.accessToken);

      // Armazena os dados do usuário no localStorage
      const userData = {
        nome: response.data.nome,
        foto: response.data.foto || "url-da-foto-generica.jpg",
        id: response.data.id,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Dados do usuário no localStorage:", userData);

      // Dispara um evento personalizado para atualizar o header
      window.dispatchEvent(new Event("userUpdate"));

      // Redireciona para a página de feed
      navigate("/feed");
    } catch (error) {
      setError("Email ou senha inválidos. Tente novamente.");
      console.error("Erro ao fazer login:", error);
    }
  };

  // Função para redirecionar para o login com Google
  const handleGoogleLogin = () => {
    // Redireciona para o endpoint de autenticação do Google com o parâmetro prompt=select_account
    window.location.href = "http://localhost:8080/oauth2/authorization/google?prompt=select_account";
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

      {/* Logo e Formulário */}
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

              {/* Exibe mensagem de erro, se houver */}
              {error && <p className="text-danger text-center">{error}</p>}

              {/* Campo de Email */}
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

              {/* Campo de Senha */}
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

              {/* Botão de Entrar */}
              <button type="submit" className="btn btn-secondary w-100 mt-3">Entrar</button>

              {/* Link para Cadastro */}
              <div className="text-center mt-3">
                <Link to="/cadastro">Cadastrar-se</Link>
              </div>

              {/* Botão de Entrar com Google */}
              <button
                type="button"
                className="btn btn-outline-secondary w-100 mt-3 d-flex align-items-center justify-content-center"
                onClick={handleGoogleLogin}
              >
                <i className="fab fa-google me-2"></i>
                Entrar com Google
              </button>

              {/* Link para Recuperação de Senha */}
              <div className="text-esqueceu-senha text-center mt-3">
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={handleShowModal}
                >
                  Esqueceu sua senha?
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal de "Esqueci minha senha" */}
      <ModalEsqueciSenha show={showModal} onClose={handleCloseModal} />

      {/* Footer */}
      <div className="footer-login mt-5">
        <FooterGlobal />
      </div>
    </div>
  );
};

export default Login;