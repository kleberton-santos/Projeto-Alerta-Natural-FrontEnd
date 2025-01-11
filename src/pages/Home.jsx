import React from "react";
import "../../src/index.css";
import "../assets/Css/home/Home.css";
import HeaderHome from "../components/header/HeaderHome";
import FooterGlobal from "../components/footer/FooterGlobal";
import Secaonavbar from "../components/navbar/Secaonavbar";
import CarroselHome from "../components/home/CarroselHome";
import { Cards } from "../components/home/Cards";

const Home = () => {
  return (
    <div className="home-principal ">
      {/* Header */}
      <div className="header">
        <HeaderHome />
      </div>

      {/* NavBar */}
      <div className="nav-bar">
        <Secaonavbar />
      </div>

      {/* Banner */}
      <div className="banner-home">
        {/* Conteúdo do Banner */}
        <CarroselHome />
      </div>

      {/* Texto Centralizado */}
      <div>
        <Cards />
      </div>

      {/* Footer */}
      <div className="footer-home">
        <FooterGlobal />
      </div>
    </div>
  );
};

export default Home;
