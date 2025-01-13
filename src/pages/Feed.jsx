import React, { useState } from "react";
import SecaoFeedPublicacao from "../components/feed/SecaoFeedPublicacao";
import SecaoFeedAmigos from "../components/feed/SecaoFeedAmigos";
import SecaoFeedTimeLine from "../components/feed/SecaoFeedTimeLine";
import SecaoFeedInfo from "../components/feed/SecaoFeedInfo";
import HeaderFeed from "../components/header/HeaderFeed";
import FooterGlobal from "../components/footer/FooterGlobal";
import Secaonavbar from "../components/navbar/Secaonavbar";
import "../../src/assets/Css/feed/FeedPage.css";
import SecaoFeedFotos from "../components/feed/SecaoFeedFotos";

const FeedPage = () => {
  // Estado para controlar a visibilidade das seções
  const [isContentVisible, setIsContentVisible] = useState(true);

  // Função para alternar a visibilidade
  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
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
                <SecaoFeedInfo />
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

      {/* Botão para ocultar/mostrar as seções */}
      <button 
        onClick={toggleContentVisibility} 
        className="btn btn-primary"
        style={{ margin: '20px auto', display: 'block' }}
      >
        {isContentVisible ? "Ocultar Seções" : "Mostrar Seções"}
      </button>

      {/* Footer */}
      <div className="footer-feed">
        <FooterGlobal />
      </div>
    </div>
  );
};

export default FeedPage;
