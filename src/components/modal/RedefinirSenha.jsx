import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../assets/Css/login/RedefinirSenha.css";

const RedefinirSenha = () => {
  const [novaSenha, setNovaSenha] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const token = new URLSearchParams(location.search).get("token"); // Extrai o token da URL

  const handleSubmit = async () => {
    try {
      // Cria o corpo da requisição no formato x-www-form-urlencoded
      const formData = new URLSearchParams();
      formData.append("token", token);
      formData.append("novaSenha", novaSenha);

      const response = await fetch("http://localhost:8080/api/auth/redefinir-senha", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      if (response.ok) {
        alert("Senha redefinida com sucesso.");
        navigate("/login"); // Redireciona para a página de login
      } else {
        const errorData = await response.text(); // Captura a mensagem de erro do backend
        alert(`Erro: ${errorData || "Erro ao redefinir senha."}`);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="content-senha-redefinir col-lg-4">
          <div className="card-redefinir-senha shadow">
            <div className="card-senha-redefinir card-body">
              <h1 className="card-title text-center">Redefinir Senha</h1>
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="form-redefinir-senha mb-3">
                  <label htmlFor="novaSenha" className="label-redefinir form-label">
                    Digite sua nova Senha
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="novaSenha"
                    placeholder="Digite sua nova senha"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-secondary">
                    Redefinir Senha
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedefinirSenha;