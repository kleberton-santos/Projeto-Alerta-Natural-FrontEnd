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

  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showConfig, setShowConfig] = useState(true);
  const [searchedUser, setSearchedUser] = useState(null);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [amigos, setAmigos] = useState([]);

  useEffect(() => {
    const savedVisibility = localStorage.getItem("isContentVisible");
    if (savedVisibility !== null) {
      setIsContentVisible(JSON.parse(savedVisibility));
    }

    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Usuário do localStorage:", user);

    if (user) {
      setIsLoggedIn(true);
      setIsContentVisible(true);

      const userId = user.idusuario || user.id;
      setLoggedUserId(userId);
      console.log("ID do usuário logado:", userId);

      if (userId) {
        fetchAmigos(userId).then((amigosData) => {
          // Adiciona o campo `estaSeguindo` para cada amigo
          const amigosComEstado = amigosData.map(amigo => ({ ...amigo, estaSeguindo: true }));
          setAmigos(amigosComEstado);
        });
      } else {
        console.error("ID do usuário não está disponível no localStorage.");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isContentVisible", JSON.stringify(isContentVisible));
  }, [isContentVisible]);

  const fetchAmigos = async (idUsuario) => {
    try {
      const response = await fetch(`http://localhost:8080/amigos/seguindo/${idUsuario}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar amigos");
      }
      const amigosData = await response.json();
      return amigosData;
    } catch (error) {
      console.error("Erro ao buscar amigos:", error);
      return [];
    }
  };

  const handleSearch = async (searchValue) => {
    try {
      const response = await fetch(`http://localhost:8080/usuarios/buscarPorNome?nome=${searchValue}`);
      if (!response.ok) {
        throw new Error("Usuário não encontrado");
      }
      const userData = await response.json();
      if (userData.length > 0) {
        const usuarioBuscado = userData[0];

        // Verifica se o usuário buscado já está na lista de amigos
        const estaSeguindo = amigos.some(amigo => amigo.idAmigoUsuario === usuarioBuscado.idusuario);

        // Adiciona o campo `estaSeguindo` ao usuário buscado
        setSearchedUser({ ...usuarioBuscado, estaSeguindo });
        setShowConfig(false);

        // Busca os amigos do usuário buscado
        const amigosDoUsuarioBuscado = await fetchAmigos(usuarioBuscado.idusuario || usuarioBuscado.id);
        setAmigos(amigosDoUsuarioBuscado);
      } else {
        alert("Nenhum usuário encontrado com esse nome.");
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      alert("Erro ao buscar usuário");
    }
  };

  const handleFollow = async (idAmigoUsuario) => {
    try {
      if (!loggedUserId) {
        throw new Error("ID do usuário logado não está disponível.");
      }
  
      // Verifica se o usuário buscado já está sendo seguido
      const estaSeguindo = searchedUser?.estaSeguindo;
  
      const response = await fetch(
        estaSeguindo
          ? `http://localhost:8080/amigos/remover?idUsuario=${loggedUserId}&idAmigoUsuario=${idAmigoUsuario}`
          : `http://localhost:8080/amigos/adicionar?idUsuario=${loggedUserId}&idAmigoUsuario=${idAmigoUsuario}`,
        {
          method: estaSeguindo ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(estaSeguindo ? "Erro ao deixar de seguir usuário" : "Erro ao seguir usuário");
      }
  
      // Atualiza o estado `estaSeguindo` do usuário buscado
      setSearchedUser(prevUser => ({ ...prevUser, estaSeguindo: !estaSeguindo }));
  
      // Atualiza a lista de amigos
      const novosAmigos = await fetchAmigos(loggedUserId);
      setAmigos(novosAmigos);
  
      alert(estaSeguindo ? "Você deixou de seguir este usuário!" : "Agora você está seguindo este usuário!");
    } catch (error) {
      console.error("Erro ao seguir/deixar de seguir usuário:", error);
      alert("Erro ao seguir/deixar de seguir usuário");
    }
  };

  return (
    <div className="feed-principal container-fluid p-3">
      <div className="header">
        <HeaderFeed />
      </div>

      <div className="nav-bar">
        <Secaonavbar />
      </div>

      <div className="SecaoBar-container">
        <div className="SecaoBar">
          <SecaoBarAmigo onSearch={handleSearch} />
        </div>
      </div>

      <div className="container-principal container-fluid mt-1">
        <div className="row">
          {/* Coluna da esquerda (configurações/info do usuário) */}
          <div className="col-md-3 col-sm-12">
            {isLoggedIn && isContentVisible && (
              <div className="content-noticias" style={{ height: '300px', width: '100%' }}>
                {showConfig ? (
                  <SecaoFeedConfig />
                ) : (
                  <SecaoFeedInfo user={searchedUser} onFollow={handleFollow} />
                )}
              </div>
            )}
          </div>

          {/* Coluna central (publicações) */}
          <div className="col-md-6 col-sm-12">
            {isLoggedIn && isContentVisible && (
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
                idUsuario={isLoggedIn ? (showConfig ? loggedUserId : searchedUser?.idusuario) : null}
              />
            </div>
          </div>

          {/* Coluna da direita (fotos e amigos) */}
          <div className="col-md-3 col-sm-12">
            {isLoggedIn && isContentVisible && (
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

      <div className="footer-feed">
        <FooterGlobal />
      </div>
    </div>
  );
};

export default FeedPage;