import React from "react";
import "../../assets/Css/feed/SecaoFeedInfo.css";
import imgUser from "../../assets/images/icon_user.png";

const SecaoFeedInfo = ({ user }) => {
  return (
    <div className="seca-feed-noticia d-flex flex-column align-items-center rounded bg-custom" style={{ height: '300px', width: '100%', borderStyle: 'solid' }}>
      <p className="secao-feed-text-info text-white mt-2">Informações do usuário</p>
      <div className="topo d-flex align-items-center w-100">
        {/* Exibe a foto do usuário ou uma imagem padrão se não houver foto */}
        <img
          src={user?.foto ? `http://localhost:8080/fotos/${user.foto}` : imgUser}
          alt=""
          className="img-user"
        />
        {/* Exibe o nome do usuário ou "Fulano de Tal" se não houver nome */}
        <div className="info">
          <p>{user?.nome || "Fulano de Tal"}</p>
          <button className="btn-seguir">Seguir</button>
        </div>
      </div>
      
    </div>
  );
};

export default SecaoFeedInfo;