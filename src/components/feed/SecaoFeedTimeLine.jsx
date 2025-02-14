import React from "react";
import "../../assets/Css/feed/SecaoFeedTimeLine.css";
import imgUser from "../../assets/images/icon_user.png";
import imgDefault from "../../assets/images/img-default.png";

const SecaoFeedTimeLine = () => {
  // Recupera os dados do usuário do localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="secao-feed-time-line d-flex rounded bg-custom-timeline">
      <div className="item w-100 p-3">
        <div className="topo-timeLine d-flex align-items-center justify-content-start">
          {/* Exibe a foto do usuário ou uma imagem padrão se não houver foto */}
          <img
            src={user?.foto ? `http://localhost:8080/fotos/${user.foto}` : imgUser}
            alt="User"
            className="user-image me-2"
          />
          {/* Exibe o nome do usuário ou "Fulano de Tal" se não houver nome */}
          <p className="text-white mb-0">{user?.nome || "Fulano de Tal"}</p>
        </div>
        <div className="info">
          <div className="texto-publicacao-timeline">
            Lorem Ipsum is simplyse of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </div>
          <div className="galeria-feed d-flex justify-content-center">
            <img src={imgDefault} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecaoFeedTimeLine;