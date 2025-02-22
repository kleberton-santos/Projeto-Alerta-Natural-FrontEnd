import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/Css/feed/SecaoFeedFotos.css";
import imgDefault from "../../assets/images/img-default.png";

const SecaoFeedFotos = ({ idUsuario }) => {
  const [fotos, setFotos] = useState([]);
  
  // Fallback: Pega o user do localStorage caso a prop idUsuario não esteja disponível
  const user = JSON.parse(localStorage.getItem("user"));
  const usuarioId = idUsuario || user?.id;

  // Efeito para buscar as fotos do usuário quando o componente é montado ou o ID do usuário muda
  useEffect(() => {
    console.log("Renderizando SecaoFeedFotos... ID Usuário:", usuarioId);
    
    if (usuarioId) {
      fetchFotos(usuarioId);
    }
  }, [usuarioId]);

  // Função para buscar as fotos do usuário na API
  const fetchFotos = async (usuarioId) => {
    try {
      console.log("Buscando fotos para o usuário:", usuarioId);
      const response = await axios.get(`http://localhost:8080/fotos/usuario/${usuarioId}`);
      setFotos(response.data);
    } catch (error) {
      console.error("Erro ao carregar as fotos:", error);
    }
  };

  return (
    <div className="seca-feed-time-line">
      <p className="secao-feed-text-foto">Galeria de fotos</p>
      <div className="galeria-fotos">
        {fotos.length > 0 ? (
          fotos.map((foto) => {
            const nomeArquivo = foto.caminhoFoto.split("\\").pop();
            return (
              <div key={foto.idFoto} className="foto-item">
                <img
                  src={`http://localhost:8080/fotos/${nomeArquivo}`}
                  alt={`Foto ${foto.idFoto}`}
                  onError={(e) => {
                    e.target.src = imgDefault;
                  }}
                />
              </div>
            );
          })
        ) : (
          // Exibe placeholders caso não haja fotos
          [...Array(9)].map((_, index) => (
            <div key={index} className="foto-item">
              <img src={imgDefault} alt="User" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SecaoFeedFotos;