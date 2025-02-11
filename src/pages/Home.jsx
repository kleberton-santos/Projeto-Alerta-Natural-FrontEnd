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
      <div className="my-4">
        {/* Conteúdo do Banner */}
        <CarroselHome />
      </div>

      {/* Texto Centralizado */}
      <div className="text-center-home">
        <p>
          Fique Informado. Esteja Preparado.<br></br>
          Explore as condições climáticas em tempo real e tome medidas para
          enfrentar desastres <br></br>naturais.
        </p>
      </div>
      <div className="card-home container mt-4 mb-4">
        <div className="row">
           {/* Primeira coluna: Previsão do Tempo */}
          <div className="col-md-4">
            <div className="card">
                              {/* Imagem representando a previsão do tempo */}
              <img src="./src/assets/images/Previsao_Tempo.webp" alt="Previsão do Tempo" id="previsaoCard" />
            </div>
            <div className="card-body">
                              {/* Título e descrição da previsão do tempo */}
              <h5 className="card-title text-white">Previsão do Tempo</h5>
              <h6 className="card-text mb-2 text-white">Informações atualizadas sobre o clima em sua região.</h6>
            </div>
          </div>

                  {/* Segunda coluna: Alerta de Desastres Naturais */}
          <div className="col-md-4">
            <div className="card">
                              {/* Imagem representando alertas de desastres naturais */}
              <img src="./src/assets/images/DESASTRES_EDIT.jpg" alt="Alerta de Desastres Naturais" id="desastreCard" />
            </div>
            <div className="card-body">
                              {/* Título e descrição sobre alertas de desastres */}
              <h5 className="card-title text-white">Alerta de Desastres</h5>
              <p className="card-text text-white">Receba alerta de desastres, furacões e mais.</p>
            </div>

          </div>

                  {/* Terceira coluna: Busca por Localização */}
          <div className="col-md-4">
            <div className="card">
                            {/* Imagem representando a funcionalidade de busca por localização */}
              <img src="./src/assets/images/Localização.jpg" alt="Busca por Localização" id="LocalCard" />
            </div>
            <div className="card-body">
                              {/* Título e descrição sobre a busca por localização */}
              <h5 className="card-title text-white">Busca por localização</h5>
              <p className="card-text text-white">Encontre dados climáticos usando seu CEP ou coordenadas.</p>
            </div>
           
          </div>
        </div>
      </div>

      

      {/* Footer */}
      <div className="footer-home">
        <FooterGlobal />
      </div>
    </div>
  );
};

export default Home;
