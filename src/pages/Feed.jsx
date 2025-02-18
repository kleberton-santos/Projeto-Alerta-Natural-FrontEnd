import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import SecaoBarAmigo from "../components/previsao/SecaoBarAmigo";

const FeedPage = () => {
  const navigate = useNavigate();

  // Estado para controlar a visibilidade das seções
  const [isContentVisible, setIsContentVisible] = useState(false);

  // Estado para verificar se o usuário está logado
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Estado para controlar qual componente deve ser exibido
  const [showConfig, setShowConfig] = useState(true);

  // Estado para armazenar os dados do usuário buscado
  const [searchedUser, setSearchedUser] = useState(null);

  // Estado para armazenar o ID do usuário logado
  const [loggedUserId, setLoggedUserId] = useState(null);

  // Estado para armazenar a lista de amigos
  const [amigos, setAmigos] = useState([]);

  // Efeito para carregar o estado do localStorage ao montar o componente
  useEffect(() => {
    const savedVisibility = localStorage.getItem("isContentVisible");
    if (savedVisibility !== null) {
      setIsContentVisible(JSON.parse(savedVisibility));
    }

    // Verificar se o usuário está logado
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Usuário do localStorage:", user); // Depuração

    if (user) {
      setIsLoggedIn(true);
      setIsContentVisible(true); // Mostrar as seções automaticamente ao logar

      // Verifica se o campo é `idusuario` ou `id`
      const userId = user.idusuario || user.id;
      setLoggedUserId(userId); // Armazena o ID do usuário logado
      console.log("ID do usuário logado:", userId); // Depuração

      if (userId) {
        fetchAmigos(userId); // Carrega a lista de amigos ao logar
      } else {
        console.error("ID do usuário não está disponível no localStorage.");
      }
    }
  }, []);

  // Efeito para salvar o estado no localStorage sempre que ele mudar
  useEffect(() => {
    localStorage.setItem("isContentVisible", JSON.stringify(isContentVisible));
  }, [isContentVisible]);

  // Função para buscar usuários pelo nome
  const handleSearch = async (searchValue) => {
    try {
      const response = await fetch(`http://localhost:8080/usuarios/buscarPorNome?nome=${searchValue}`);
      if (!response.ok) {
        throw new Error("Usuário não encontrado");
      }
      const userData = await response.json();
      if (userData.length > 0) {
        setSearchedUser(userData[0]); // Armazena o primeiro usuário encontrado
        setShowConfig(false); // Exibe as informações do usuário buscado automaticamente
      } else {
        alert("Nenhum usuário encontrado com esse nome.");
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      alert("Erro ao buscar usuário");
    }
  };

  // Função para buscar a lista de amigos
  const fetchAmigos = async (idUsuario) => {
    try {
      const response = await fetch(`http://localhost:8080/amigos/seguindo/${idUsuario}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar amigos");
      }
      const amigosData = await response.json();
      setAmigos(amigosData);
    } catch (error) {
      console.error("Erro ao buscar amigos:", error);
    }
  };

  // Função para adicionar um amigo
  const handleFollow = async (idAmigoUsuario) => {
    try {
      console.log("ID do usuário logado:", loggedUserId); // Depuração
      console.log("ID do amigo a seguir:", idAmigoUsuario); // Depuração

      if (!loggedUserId) {
        throw new Error("ID do usuário logado não está disponível.");
      }

      const response = await fetch(
        `http://localhost:8080/amigos/adicionar?idUsuario=${loggedUserId}&idAmigoUsuario=${idAmigoUsuario}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao seguir usuário");
      }

      // Atualiza a lista de amigos após seguir
      const newAmigo = await response.json();
      setAmigos((prevAmigos) => [...prevAmigos, newAmigo]);

      alert("Agora você está seguindo este usuário!"); // Feedback para o usuário
    } catch (error) {
      console.error("Erro ao seguir usuário:", error);
      alert("Erro ao seguir usuário");
    }
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

      {/* Buscar */}
      <div className="SecaoBar-container">
        <div className="SecaoBar">
          <SecaoBarAmigo onSearch={handleSearch} />
        </div>
      </div>

      {/* Grade com 3 colunas */}
      <div className="container-principal container-fluid mt-1">
        <div className="row">
          {/* Coluna da esquerda (SecaoFeedInfo ou SecaoFeedConfig) */}
          <div className="col-md-3 col-sm-12">
            {isContentVisible && (
              <div className="content-noticias" style={{ height: '300px', width: '100%' }}>
                {showConfig ? (
                  <SecaoFeedConfig />
                ) : (
                  <SecaoFeedInfo user={searchedUser} onFollow={handleFollow} />
                )}
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
            <div className="content-pubicacoes mt-2">
              <SecaoFeedTimeLine
                idUsuario={showConfig ? loggedUserId : searchedUser?.idusuario}
              />
            </div>
          </div>

          {/* Coluna da direita (SecaoFeedFotos e SecaoFeedAmigos) */}
          <div className="col-md-3 col-sm-12">
            {isContentVisible && (
              <>
                <div className="content-amigos" style={{ height: '400px', width: '100%' }}>
                  <SecaoFeedFotos idUsuario={showConfig ? loggedUserId : searchedUser?.idusuario} />
                </div>
                <div className="content-amigos mt-3" style={{ height: '400px', width: '100%' }}>
                  <SecaoFeedAmigos amigos={amigos} />
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
              onClick={() => navigate("/login")}
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