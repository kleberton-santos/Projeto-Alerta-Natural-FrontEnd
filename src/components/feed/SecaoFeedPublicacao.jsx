import React from "react";
import "../../assets/Css/feed/secaoFeedPublicacao.css";
import ModalFeed from "./ModalFeed";
import imgUser from "../../assets/images/icon_user.png"; // Imagem padrão embutida

const SecaoFeedPublicacao = () => {
  // Recupera os dados do usuário do localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Define a URL da foto do usuário ou a imagem padrão
  const userFoto = user?.foto
    ? `http://localhost:8080/fotos/${user.foto}` // Foto do usuário
    : "http://localhost:8080/fotos/padrao"; // Imagem padrão

  return (
    <div className="secao-feed-publicacao">
      {/* Exibe a foto do usuário ou a imagem padrão */}
      <img
        src={userFoto}
        alt="Foto do usuário"
        className="img-user"
        onError={(e) => {
          e.target.src = imgUser; // Fallback para imagem padrão embutida
          e.target.className = "img-user padrao-feed"; 
        }}
      />
      
      {/* Área de publicação com botão para abrir o modal */}
      <div className="secao-publicacao">
        <button
          type="button"
          className="texto-publicacao btn"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Faça sua Publicação Reporte um acontecimento
        </button>
      </div>

      {/* Inclusão do modal */}
      <ModalFeed />
    </div>
  );
};

export default SecaoFeedPublicacao;