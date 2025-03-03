import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
    <div>
      <h1>Redefinir Senha</h1>
      <input
        type="password"
        placeholder="Nova Senha"
        value={novaSenha}
        onChange={(e) => setNovaSenha(e.target.value)}
      />
      <button onClick={handleSubmit}>Redefinir Senha</button>
    </div>
  );
};

export default RedefinirSenha;