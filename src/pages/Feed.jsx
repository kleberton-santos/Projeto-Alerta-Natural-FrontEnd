import React, { useState } from "react";
import SecaoFeedPublicacao from "../components/feed/SecaoFeedPublicacao";
import SecaoFeedAmigos from "../components/feed/SecaoFeedAmigos";
import SecaoFeedTimeLine from "../components/feed/SecaoFeedTimeLine";
import SecaoFeedNoticias from "../components/feed/SecaoFeedNoticias";
import HeaderFeed from "../components/header/HeaderFeed";
import FooterGlobal from "../components/footer/FooterGlobal";
import Secaonavbar from "../components/navbar/Secaonavbar";
import "../../src/assets/Css/feed/FeedPage.css";

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

      {/* Grade com 2 colunas e 2 linhas */}
      <div className="container-principal container-fluid mt-1">
        <div className="row">
          {/* Primeira linha */}
          <div className="container-left col-8">
            {isContentVisible && (
              <div className="content-fazer-publicacao w-full" style={{ height: '100px' }}>
                <SecaoFeedPublicacao />
              </div>
            )}
            {/* Título Publicações centralizado */}
              <div
                className="publicacoes-titulo"
                style={{
                  color: 'white',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  width: !isContentVisible ? '80%' : '100%', // Para manter a centralização da largura
                  marginLeft: !isContentVisible ? '34%' : '', // Para centralizar horizontalmente
                  marginRight: !isContentVisible ? 'auto' : '', // Para garantir que não haja espaçamento à direita
                  textAlign: 'center', // Garantir que o texto fique centralizado
                  
                }}
              >
                Publicações
              </div>
            <div
              className={`content-pubicacoes w-full mt-2 ${!isContentVisible ? 'd-flex justify-content-center' : ''}`}
              style={{
                height: '600px',
                width: !isContentVisible ? '80%' : '100%', // Ajuste da largura para centralizar
                marginLeft: !isContentVisible ? '35%' : '', // Centralizar horizontalmente
              }}
            >
              <SecaoFeedTimeLine />
            </div>
          </div>

          <div className="container-right col-4">
            {isContentVisible && (
              <>
                <div className="content-amigos col-md-6 col-sm-12 me-5 ms-3" style={{ height: '400px', width: '95%' }}>
                  <SecaoFeedAmigos />
                </div>
                <div className="content-noticias col-md-6 col-sm-12 me-5 ms-3 mt-5" style={{ height: '300px', width: '95%' }}>
                  <SecaoFeedNoticias />
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
