import React from "react";
import "../../assets/Css/home/CarroselHome.css"; // Certifique-se que está importando o CSS corretamente

const CarroselHome = () => {
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{
        maxWidth: "800px",
        maxHeight: "400px",
        width: "100%",
        height: "auto",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
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

      <div className="carousel-inner" style={{ width: "100%", height: "100%" }}>
        <div className="carousel-item active">
          <img
            src="https://conhecerseguros.com.br/wp-content/uploads/2023/02/Imagem-Ilustrativa-de-post-2.jpg"
            className="d-block w-100"
            alt="Primeiro Slide"
            style={{ objectFit: "cover", height: "100%" }}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Primeiro Slide</h5>
            <p>Conteúdo representativo para o primeiro slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="https://media.investnews.com.br/uploads/2025/01/incendios_los_angeles_.jpg"
            className="d-block w-100"
            alt="Segundo Slide"
            style={{ objectFit: "cover", height: "100%" }}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Segundo Slide</h5>
            <p>Conteúdo representativo para o segundo slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="https://img.odcdn.com.br/wp-content/uploads/2024/06/Destaque-Enchente-no-Rio-Grande-do-Sul-1-1920x1080.jpg"
            className="d-block w-100"
            alt="Terceiro Slide"
            style={{ objectFit: "cover", height: "100%" }}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Terceiro Slide</h5>
            <p>Conteúdo representativo para o terceiro slide.</p>
          </div>
        </div>
      </div>

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
