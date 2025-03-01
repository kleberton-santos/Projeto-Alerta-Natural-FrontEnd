import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import SecaoFeedPublicacao from "../components/feed/SecaoFeedPublicacao";
import SecaoFeedAmigos from "../components/feed/SecaoFeedAmigos";
import SecaoFeedTimeLine from "../components/feed/SecaoFeedTimeLine";
import SecaoFeedInfo from "../components/feed/SecaoFeedInfo";
import HeaderFeed from "../components/header/HeaderFeed";
import FooterGlobal from "../components/footer/FooterGlobal";
import Secaonavbar from "../components/navbar/Secaonavbar";
import SecaoFeedFotos from "../components/feed/SecaoFeedFotos";
import SecaoFeedConfig from "../components/feed/SecaoFeedConfig";
import SecaoBarAmigo from "../components/previsao/SecaoBarAmigo";
import "../../src/assets/Css/feed/FeedPage.css";

const FeedPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isContentVisible, setIsContentVisible] = useState(false); // Controla a visibilidade do conteúdo
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Verifica se o usuário está logado
  const [showConfig, setShowConfig] = useState(true); // Controla a exibição da seção de configurações
  const [searchedUser, setSearchedUser] = useState(null); // Armazena o usuário buscado
  const [loggedUserId, setLoggedUserId] = useState(null); // Armazena o ID do usuário logado
  const [amigos, setAmigos] = useState([]); // Armazena a lista de amigos

  // Verifica se o usuário está logado ao carregar a página
  useEffect(() => {
    // Captura o token e os dados do usuário da URL (se existirem)
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const userData = queryParams.get("user");

    if (token && userData) {
      // Armazena o token no localStorage
      localStorage.setItem("token", token);

      // Armazena os dados do usuário no localStorage
      const user = JSON.parse(decodeURIComponent(userData));
      localStorage.setItem("user", JSON.stringify(user));

      // Remove o token e os dados do usuário da URL para evitar exposição
      navigate("/feed", { replace: true });

      // Dispara o evento para atualizar o Header
      window.dispatchEvent(new Event("userUpdate"));

      // Recarrega a página para garantir que os dados sejam atualizados
      window.location.reload();
    }

    // Verifica se o usuário já está autenticado
    checkAuthentication();
  }, [location, navigate]);

  // Função para verificar se o usuário está autenticado
  const checkAuthentication = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      setIsLoggedIn(true);
      setIsContentVisible(true);

      const userId = user.idusuario || user.id;
      setLoggedUserId(userId);

      if (userId) {
        fetchAmigos(userId).then((amigosData) => {
          const amigosComEstado = amigosData.map(amigo => ({ ...amigo, estaSeguindo: true }));
          setAmigos(amigosComEstado);
        });
      } else {
        console.error("ID do usuário não está disponível no localStorage.");
      }
    } else {
      setIsLoggedIn(false);
      setIsContentVisible(false);
    }
  };

  // Salva o estado de visibilidade no localStorage
  useEffect(() => {
    localStorage.setItem("isContentVisible", JSON.stringify(isContentVisible));
  }, [isContentVisible]);

  // Busca a lista de amigos do usuário
  const fetchAmigos = async (idUsuario) => {
    try {
      const response = await axios.get(`http://localhost:8080/amigos/seguindo/${idUsuario}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar amigos:", error);
      return [];
    }
  };

  // Busca um usuário pelo nome
  const handleSearch = async (searchValue) => {
    try {
      const response = await axios.get(`http://localhost:8080/usuarios/buscarPorNome?nome=${searchValue}`);
      const userData = response.data;

      if (userData.length > 0) {
        const usuarioBuscado = userData[0];
        const estaSeguindo = amigos.some(amigo => amigo.idAmigoUsuario === usuarioBuscado.idusuario);

        setSearchedUser({ ...usuarioBuscado, estaSeguindo });
        setShowConfig(false);

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

  // Segue ou deixa de seguir um usuário
  const handleFollow = async (idAmigoUsuario) => {
    try {
      if (!loggedUserId) {
        throw new Error("ID do usuário logado não está disponível.");
      }

      const estaSeguindo = searchedUser?.estaSeguindo;
      const url = estaSeguindo
        ? `http://localhost:8080/amigos/remover?idUsuario=${loggedUserId}&idAmigoUsuario=${idAmigoUsuario}`
        : `http://localhost:8080/amigos/adicionar?idUsuario=${loggedUserId}&idAmigoUsuario=${idAmigoUsuario}`;

      const method = estaSeguindo ? "delete" : "post";
      await axios({ method, url });

      setSearchedUser(prevUser => ({ ...prevUser, estaSeguindo: !estaSeguindo }));
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
          <SecaoBarAmigo onSearch={handleSearch} isLoggedIn={isLoggedIn} />
        </div>
      </div>

      <div className="container-principal container-fluid mt-1">
        <div className="row">
          {/* Coluna da esquerda (configurações/info do usuário) */}
          <div className="col-md-3 col-sm-12">
            {isLoggedIn && isContentVisible && (
              <div className="content-noticias">
                {showConfig ? <SecaoFeedConfig /> : <SecaoFeedInfo user={searchedUser} onFollow={handleFollow} />}
              </div>
            )}
          </div>

          {/* Coluna central (publicações) */}
          <div className="col-md-6 col-sm-12">
            {isLoggedIn && isContentVisible && (
              <div className="content-fazer-publicacao">
                <SecaoFeedPublicacao />
              </div>
            )}
            <div className="publicacoes-titulo">Publicações</div>
            <div className="content-pubicacoes mt-3">
              <SecaoFeedTimeLine
                idUsuario={isLoggedIn ? (showConfig ? loggedUserId : searchedUser?.idusuario) : null}
              />
            </div>
          </div>

          {/* Coluna da direita (fotos e amigos) */}
          <div className="col-md-3 col-sm-12">
            {isLoggedIn && isContentVisible && (
              <>
                <div className="content-amigos">
                  <SecaoFeedFotos idUsuario={showConfig ? loggedUserId : searchedUser?.idusuario} />
                </div>
                <div className="content-amigos mt-3">
                  <SecaoFeedAmigos amigos={amigos} onAmigoClick={handleSearch}/>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {!isLoggedIn && (
        <div className="login-prompt">
          <p>
            Faça login para publicar.{" "}
            <span onClick={() => navigate("/login")}>Clique aqui para fazer login.</span>
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