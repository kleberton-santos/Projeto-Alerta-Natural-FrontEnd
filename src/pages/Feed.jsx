import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Para redirecionar o usuário
import SecaoFeedPublicacao from "../components/feed/SecaoFeedPublicacao";
import SecaoFeedAmigos from "../components/feed/SecaoFeedAmigos";
import SecaoFeedTimeLine from "../components/feed/SecaoFeedTimeLine";
import SecaoFeedInfo from "../components/feed/SecaoFeedInfo";
import HeaderFeed from "../components/header/HeaderFeed";
import FooterGlobal from "../components/footer/FooterGlobal";
import Secaonavbar from "../components/navbar/Secaonavbar";
import "../../src/assets/Css/feed/FeedPage.css";
import SecaoFeedFotos from "../components/feed/SecaoFeedFotos";
import SecaoFeedConfig from "../components/feed/SecaoFeedConfig";

const FeedPage = () => {
  const navigate = useNavigate(); // Hook para redirecionamento

  // Estado para controlar a visibilidade das seções (inicialmente false)
  const [isContentVisible, setIsContentVisible] = useState(false);

  // Estado para verificar se o usuário está logado
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Efeito para carregar o estado do localStorage ao montar o componente
  useEffect(() => {
    const savedVisibility = localStorage.getItem("isContentVisible");
    if (savedVisibility !== null) {
      setIsContentVisible(JSON.parse(savedVisibility));
    }

    // Verificar se o usuário está logado
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
      setIsContentVisible(true); // Mostrar as seções automaticamente ao logar
    }
  }, []);

  // Efeito para salvar o estado no localStorage sempre que ele mudar
  useEffect(() => {
    localStorage.setItem("isContentVisible", JSON.stringify(isContentVisible));
  }, [isContentVisible]);

  // Função para redirecionar para a tela de login
  const redirectToLogin = () => {
    navigate("/login"); // Redireciona para a rota de login
  };

  // Função para recarregar a página ao fazer logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload(); // Recarrega a página
  };

  return (
    <div className="feed-principal container-fluid p-3">
      {/* Header */}
      <div className="header">
        <HeaderFeed />
      </div>

      {/* NavBar */}
      <div className="nav-bar">
        <Secaonavbar />
      </div>

      {/* Grade com 3 colunas */}
      <div className="container-principal container-fluid mt-1">
        <div className="row">
          {/* Coluna da esquerda (SecaoFeedInfo) */}
          <div className="col-md-3 col-sm-12">
            {isContentVisible && (
              <div className="content-noticias" style={{ height: '300px', width: '100%' }}>
                <SecaoFeedConfig />
              </div>
            )}
          </div>

          {/* Coluna do meio (SecaoFeedPublicacao e SecaoFeedTimeLine) */}
          <div className="col-md-6 col-sm-12">
            {isContentVisible && (
              <div className="content-fazer-publicacao" style={{ height: '100px' }}>
                <SecaoFeedPublicacao />
              </div>
            )}
            <div className="publicacoes-titulo"
              style={{
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Publicações
            </div>
            <div className="content-pubicacoes mt-2" style={{ height: '600px', width: '100%' }}>
              <SecaoFeedTimeLine />
            </div>
          </div>

          {/* Coluna da direita (SecaoFeedFotos e SecaoFeedAmigos) */}
          <div className="col-md-3 col-sm-12">
            {isContentVisible && (
              <>
                <div className="content-amigos" style={{ height: '400px', width: '100%' }}>
                  <SecaoFeedFotos />
                </div>
                <div className="content-amigos mt-3" style={{ height: '400px', width: '100%' }}>
                  <SecaoFeedAmigos />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mensagem para fazer login (só aparece se não estiver logado) */}
      {!isLoggedIn && (
        <div style={{ textAlign: "center", margin: "20px" }}>
          <p style={{ color: "white", fontSize: "18px" }}>
            Faça login para publicar.{" "}
            <span
              onClick={redirectToLogin}
              style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
            >
              Clique aqui para fazer login.
            </span>
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="footer-feed">
        <FooterGlobal />
      </div>
    </div>
  );
};

export default FeedPage;