import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/Css/feed/SecaoFeedLine.css";
import imgDefault from "../../assets/images/img-default.png";

const SecaoFeedFotos = ({ idUsuario }) => {
  const [fotos, setFotos] = useState([]);
  
  // Fallback: Pega o user do localStorage caso a prop idUsuario não esteja disponível
  const user = JSON.parse(localStorage.getItem("user"));
  const usuarioId = idUsuario || user?.id;

  useEffect(() => {
    console.log("Renderizando SecaoFeedFotos... ID Usuário:", usuarioId);
    
    if (usuarioId) {
      fetchFotos(usuarioId);
    }
  }, [usuarioId]);

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
    <div className="seca-feed-time-line d-flex flex-column align-items-center rounded bg-custom-foto-line" 
         style={{ height: '400px', width: '100%', borderStyle: 'solid' }}>
      <p className="secao-feed-text-foto text-white">Galeria de fotos</p>
      <div className="galeria-fotos d-grid"
           style={{
             display: 'grid',
             gridTemplateColumns: 'repeat(3, 1fr)',
             gap: '10px',
             padding: '10px',
             overflowY: 'auto',
             maxHeight: '300px',
           }}>
        {fotos.length > 0 ? (
          fotos.map((foto) => {
            const nomeArquivo = foto.caminhoFoto.split("\\").pop();
            return (
              <div key={foto.idFoto} className="foto-item d-flex justify-content-center align-items-center" 
                   style={{ height: '100px', border: '1px solid white' }}>
                <img
                  src={`http://localhost:8080/fotos/${nomeArquivo}`}
                  alt={`Foto ${foto.idFoto}`}
                  className="img-fluid"
                  style={{ maxHeight: '80%', maxWidth: '80%' }}
                  onError={(e) => {
                    e.target.src = imgDefault;
                  }}
                />
              </div>
            );
          })
        ) : (
          [...Array(9)].map((_, index) => (
            <div key={index} className="foto-item d-flex justify-content-center align-items-center" 
                 style={{ height: '100px', border: '1px solid white' }}>
              <img src={imgDefault} alt="User" className="img-fluid" style={{ maxHeight: '80%', maxWidth: '80%' }} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SecaoFeedFotos;
