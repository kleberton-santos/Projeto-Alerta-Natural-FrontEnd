import "../../src/index.css";
import "../assets/Css/previsao/Previsao.css";
import HeaderPrevisao from "../components/header/HeaderPrevisao";
import FooterGlobal from "../components/footer/FooterGlobal";
import Secaonavbar from "../components/navbar/Secaonavbar";
import SecaoPrevisao from "../components/previsao/SecaoPrevisao";
import SecaoBarPrevisao from "../components/previsao/SecaoBarPrevisao";
import React, { useState } from "react";
import RedefinirSenha from "../components/modal/RedefinirSenha";

const NovaSenha = () => {

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

      {/* Conteudo da Pagina */}
      <div className="content-previsao">
        {/* Passa os dados da busca para o SecaoPrevisao */}
        <RedefinirSenha />
      </div>

      {/* Footer */}
      <div className="footer-previsao ">
        <FooterGlobal />
      </div>
    </div>
  );
};

export default NovaSenha;