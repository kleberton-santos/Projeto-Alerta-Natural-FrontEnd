import React, { useState } from "react";
import "../../assets/Css/login/ModalEsqueciSenha.css";

const ModalEsqueciSenha = ({ show, onClose }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      // Cria o corpo da requisição no formato x-www-form-urlencoded
      const formData = new URLSearchParams();
      formData.append("email", email);

      const response = await fetch("http://localhost:8080/api/auth/esqueci-senha", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      if (response.ok) {
        alert("E-mail de redefinição de senha enviado com sucesso.");
        setEmail(""); // Limpa o campo de e-mail
        onClose();
      } else {
        const errorData = await response.text(); // Captura a mensagem de erro do backend
        alert(`Erro: ${errorData || "Erro ao enviar e-mail de redefinição de senha."}`);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Esqueci minha senha</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>Digite seu email para recuperação</p>
            <input
              type="email"
              className="form-control text-center" // Centraliza o texto
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-publicar" onClick={handleSubmit}>
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEsqueciSenha;