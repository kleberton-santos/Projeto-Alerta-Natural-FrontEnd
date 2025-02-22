import React from "react";
import "../../assets/Css/feed/secaoFeedPublicacao.css";
import ModalFeed from "./ModalFeed";
import imgUser from "../../assets/images/icon_user.png";

const SecaoFeedPublicacao = () => {
  // Recupera os dados do usuário do localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="secao-feed-publicacao">
      {/* Exibe a foto do usuário ou uma imagem padrão se não houver foto */}
      <img
        src={user?.foto ? `http://localhost:8080/fotos/${user.foto}` : imgUser}
        alt="Foto do usuário"
        className="img-user"
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