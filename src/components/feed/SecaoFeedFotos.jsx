import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/Css/feed/SecaoFeedLine.css";
import imgDefault from "../../assets/images/img-default.png";

const SecaoFeedFotos = ({ idUsuario }) => {
  const [fotos, setFotos] = useState([]);

  // Função para buscar as fotos do usuário
  const fetchFotos = async () => {
    if (!idUsuario) {
      console.error("ID do usuário não fornecido.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/fotos/usuario/${idUsuario}`);
      setFotos(response.data);
    } catch (error) {
      console.error("Erro ao carregar as fotos:", error);
    }
  };

  // Carrega as fotos ao montar o componente ou quando o idUsuario muda
  useEffect(() => {
    fetchFotos();
  }, [idUsuario]); // Atualiza as fotos quando o idUsuario muda

  return (
    <div className="seca-feed-time-line d-flex flex-column align-items-center rounded bg-custom-foto-line" style={{ height: '400px', width: '100%', borderStyle: 'solid' }}>
      <p className="secao-feed-text-foto text-white">Galeria de fotos</p>
      <div
        className="galeria-fotos d-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          padding: '10px',
          overflowY: 'auto', // Adiciona barra de rolagem vertical
          maxHeight: '300px', // Define uma altura máxima para o contêiner
        }}
      >
        {fotos.length > 0 ? (
          fotos.map((foto) => {
            // Extrai o nome do arquivo do caminho da foto
            const nomeArquivo = foto.caminhoFoto.split("\\").pop();
            return (
              <div key={foto.idFoto} className="foto-item d-flex justify-content-center align-items-center" style={{ height: '100px', border: '1px solid white' }}>
                <img
                  src={`http://localhost:8080/fotos/${nomeArquivo}`}
                  alt={`Foto ${foto.idFoto}`}
                  className="img-fluid"
                  style={{ maxHeight: '80%', maxWidth: '80%' }}
                  onError={(e) => {
                    e.target.src = imgDefault; // Exibe uma imagem padrão em caso de erro
                  }}
                />
              </div>
            );
          })
        ) : (
          [...Array(9)].map((_, index) => (
            <div key={index} className="foto-item d-flex justify-content-center align-items-center" style={{ height: '100px', border: '1px solid white' }}>
              <img src={imgDefault} alt="User" className="img-fluid" style={{ maxHeight: '80%', maxWidth: '80%' }} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SecaoFeedFotos;