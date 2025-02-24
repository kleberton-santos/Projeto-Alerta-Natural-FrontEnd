import React from "react";
import "../../assets/Css/login/ModalEsqueciSenha.css"; // Importação do arquivo CSS

const ModalEsqueciSenha = ({ show, onClose }) => {
  // Se "show" for false, o modal não será renderizado
  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* Cabeçalho do modal */}
          <div className="modal-header">
            <h5 className="modal-title">Esqueci minha senha</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose} // Fecha o modal ao clicar
            ></button>
          </div>

          {/* Corpo do modal */}
          <div className="modal-body">
            <p>Digite seu email para recuperação</p>
            <input
              type="email"
              className="form-control"
              placeholder="Seu email"
            />
          </div>

          {/* Rodapé do modal */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-publicar"
              onClick={onClose} // Fecha o modal ao clicar
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEsqueciSenha;