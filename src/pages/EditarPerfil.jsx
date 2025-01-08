import React from "react";

import { HeaderEditarPerfil } from "../components/header/HeaderEditarPerfil";
import FooterGlobal from "../components/footer/FooterGlobal";
import { SecaoEditarPerfil } from "../components/editarPerfil/SecaoEditarPerfil";

export const EditarPerfil = () => {
  return (
    <div className="home-principal d-flex flex-column min-vh-100">
      {/* Header */}
      <div className="header">
        <HeaderEditarPerfil />
      </div>

      {/* NavBar */}
      <div
        className="nav-bar d-flex justify-content-center align-items-center border border-primary"
        style={{ height: "55px" }}
      >
        <h2>NavBar</h2>
      </div>

      {/* Conteudo da Pagina*/}
      <div className="flex-grow-1">
        <SecaoEditarPerfil />
      </div>

      {/* Footer */}
      <div>
        <FooterGlobal />
      </div>
    </div>
  );
};
