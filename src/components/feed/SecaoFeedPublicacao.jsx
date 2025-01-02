import React from "react";
import "../../assets/Css/feed/secaoFeedPublicacao.css";
import ModalFeed from "./ModalFeed";

const SecaoFeedPublicacao = () => {
  return (
    <div className="secao-feed-publicacao d-flex rounded bg-custom" style={{ height: "100px", width: "100%" }}>
      

      <div className="foto-Perfil rounded-circle bg-secondary ms-3" style={{ height: "40px", width: "40px" }} >
        {/* Conteúdo da foto */}
      </div>
      <div className="secao-publicacao m-auto ms-4 me-5 rounded bg-custom-publicacao d-flex justify-content-center align-items-center">
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
