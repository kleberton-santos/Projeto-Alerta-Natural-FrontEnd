import React from "react";
import "../../assets/Css/feed/SecaoFeedConfig.css";
import imgUser from "../../assets/images/icon_user.png";

const SecaoFeedConfig = () => {
  // Recupera os dados do usuário do localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="seca-feed-config">
      {/* Título da seção */}
      <p className="secao-feed-text-amigo">Configurações</p>
      
      {/* Topo da seção com a foto e nome do usuário */}
      <div className="topo-config">
        {/* Exibe a foto do usuário ou uma imagem padrão se não houver foto */}
        <img
          src={user?.foto ? `http://localhost:8080/fotos/${user.foto}` : imgUser}
          alt="Foto do usuário"
          className="img-user"
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