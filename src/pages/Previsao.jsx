import "../../src/index.css";
import "../assets/Css/previsao/Previsao.css";
import HeaderPrevisao from "../components/header/HeaderPrevisao";
import FooterGlobal from "../components/footer/FooterGlobal";
import Secaonavbar from "../components/navbar/Secaonavbar";
import SecaoPrevisao from "../components/previsao/SecaoPrevisao";
import SecaoBarPrevisao from "../components/previsao/SecaoBarPrevisao";
import React, { useState } from "react";

const Previsao = () => {
  const [infosHoje, setInfosHoje] = useState();

  // Função que será passada para o SecaoBarPrevisao
  const handleSearch = (data) => {
    setInfosHoje(data);
  };

  return (
    <div className="previsao-principal ">
      {/* Header */}
      <div className="header">
        <HeaderPrevisao />
      </div>

      {/* NavBar */}
      <div className="nav-bar">
        <Secaonavbar />
      </div>

      {/* Barra de Busca */}
      <div className="busca-previsao">
        <SecaoBarPrevisao onSearch={handleSearch} />
      </div>

      {/* Conteudo da Pagina */}
      <div className="content-previsao">
        {/* Passa os dados da busca para o SecaoPrevisao */}
        <SecaoPrevisao infosHoje={infosHoje} />
      </div>

      {/* Footer */}
      <div className="footer-previsao ">
        <FooterGlobal />
      </div>
    </div>
  );
};

export default Previsao;