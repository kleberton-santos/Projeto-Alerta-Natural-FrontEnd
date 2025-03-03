import React from "react";
import "../../assets/Css/feed/SecaoFeedConfig.css";
import imgUser from "../../assets/images/icon_user.png"; // Imagem padrão embutida

const SecaoFeedConfig = () => {
  // Recupera os dados do usuário do localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Define a URL da foto do usuário ou a imagem padrão
  const userFoto = user?.foto
    ? `http://localhost:8080/fotos/${user.foto}` // Foto do usuário
    : "http://localhost:8080/fotos/padrao"; // Imagem padrão

  // Define a classe CSS com base na condição
  const imgClass = user?.foto ? "img-user" : "img-user padrao";

  return (
    <div className="seca-feed-config">
      {/* Título da seção */}
      <p className="secao-feed-text-amigo">Configurações</p>
      
      {/* Topo da seção com a foto e nome do usuário */}
      <div className="topo-config">
        {/* Exibe a foto do usuário ou a imagem padrão */}
        <img
          src={userFoto}
          alt="Foto do usuário"
          className={imgClass} // Aplica a classe condicional
          onError={(e) => {
            e.target.src = imgUser; // Fallback para imagem padrão embutida
            e.target.className = "img-user padrao"; // Aplica o estilo da imagem padrão
          }}
        />
        {/* Exibe o nome do usuário ou "User" se não houver nome */}
        <span className="login-config">{user?.nome || "User"}</span>
      </div>

      {/* Links para editar perfil e galeria de fotos */}
      <div className="config-fotos">
        <a href="/EditarPerfil" className="link-custom">Editar Perfil</a>
        <a href="/galeriaFotos" className="link-custom">Fotos</a>
      </div>
    </div>
  );
};

export default SecaoFeedConfig;