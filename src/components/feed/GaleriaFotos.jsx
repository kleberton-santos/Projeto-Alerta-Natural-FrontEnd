import React, { useState } from "react";
import "../../assets/Css/feed/GaleriaFotos.css";
import imgDefault from "../../assets/images/img-default.png"; // Imagem padrão

const GaleriaFotos = () => {
  // Substituindo todas as URLs de miniaturas pela imagem padrão
  const imagens = [
    imgDefault, // Foto principal inicial
    imgDefault,
    imgDefault,
    imgDefault,
    imgDefault,
    imgDefault,
    imgDefault,
    imgDefault,
    imgDefault,
    imgDefault,
    imgDefault,
    imgDefault,
    imgDefault,
    imgDefault,
    imgDefault,
   
  ];

  const [fotoPrincipal, setFotoPrincipal] = useState(imagens[0]);

  return (
    <div className="conteudo-galeria">
      {/* Foto Principal */}
      <div className="foto-principal">
        <img
          src={fotoPrincipal}
          alt="Foto Principal"
          className="img-fluid rounded"
        />
      </div>

      {/* Miniaturas */}
      <div className="miniaturas">
        {imagens.slice(1).map((imagem, index) => (
          <div key={index} className="miniatura">
            <img
              src={imagem} // Agora todas as miniaturas são imgDefault
              alt={`Miniatura ${index + 1}`}
              onClick={() => setFotoPrincipal(imagem)} // Ao clicar, muda a foto principal
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GaleriaFotos;
