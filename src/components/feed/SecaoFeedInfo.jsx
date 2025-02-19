import React from "react";
import "../../assets/Css/feed/SecaoFeedInfo.css";
import imgUser from "../../assets/images/icon_user.png";

const SecaoFeedInfo = ({ user, onFollow }) => {
  const handleSeguir = () => {
    if (onFollow && user?.idusuario) {
      onFollow(user.idusuario); // Passa o ID do usuário a ser seguido/deixado de seguir
    }
  };

  return (
    <div className="seca-feed-noticia d-flex flex-column align-items-center rounded bg-custom" style={{ height: '300px', width: '100%', borderStyle: 'solid' }}>
      <p className="secao-feed-text-info text-white mt-2">Informações do usuário</p>
      <div className="topo d-flex align-items-center w-100">
        <img
          src={user?.foto ? `http://localhost:8080/fotos/${user.foto}` : imgUser}
          alt="Foto do usuário"
          className="img-user"
        />
        <div className="info">
          <p>{user?.nome || "Fulano de Tal"}</p>
          <button className="btn-seguir" onClick={handleSeguir}>
            {user?.estaSeguindo ? "Deixar de seguir" : "Seguir"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecaoFeedInfo;