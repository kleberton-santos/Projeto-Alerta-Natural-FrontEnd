import React from "react";
import "../../assets/Css/home/CarroselHome.css"; // Certifique-se que está importando o CSS corretamente

const CarroselHome = () => {
  return (
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>

      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://via.placeholder.com/800x400"
            className="d-block"
            alt="Primeiro Slide"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Primeiro Slide</h5>
            <p>Conteúdo representativo para o primeiro slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="https://via.placeholder.com/800x400"
            className="d-block"
            alt="Segundo Slide"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Segundo Slide</h5>
            <p>Conteúdo representativo para o segundo slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="https://via.placeholder.com/800x400"
            className="d-block"
            alt="Terceiro Slide"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Terceiro Slide</h5>
            <p>Conteúdo representativo para o terceiro slide.</p>
          </div>
        </div>
      </div>

      {/* Botões de controle */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Próximo</span>
      </button>
    </div>
  );
};

export default CarroselHome;
