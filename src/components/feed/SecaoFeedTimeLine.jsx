import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/Css/feed/SecaoFeedTimeLine.css";
import imgUser from "../../assets/images/icon_user.png";
import ModalFeed from "./ModalFeed";

const SecaoFeedTimeLine = () => {
  const [publicacoes, setPublicacoes] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  console.log("Renderizando SecaoFeedTimeLine..."); // Log de renderização

  // Função para buscar as publicações do backend
  const fetchPublicacoes = async () => {
    try {
      console.log("Buscando publicações...");
      const response = await axios.get("http://localhost:8080/publicacoes");
      console.log("Dados recebidos:", response.data); // Log dos dados recebidos
      setPublicacoes([...response.data]); // Força uma nova referência
    } catch (error) {
      console.error("Erro ao carregar as publicações:", error);
    }
  };

  // Função para adicionar uma nova publicação ao feed
  const handleNovaPublicacao = () => {
    console.log("handleNovaPublicacao chamada!"); // Log da função
    fetchPublicacoes();
  };

  useEffect(() => {
    fetchPublicacoes();
  }, []);

  return (
    <div className="secao-feed-time-line d-flex flex-column">
      {/* Modal para nova publicação */}
      <ModalFeed onPublicacaoCriada={handleNovaPublicacao} />

      {/* Lista de publicações */}
      {publicacoes.map((publicacao) => {
        console.log("Renderizando publicação:", publicacao.idPublicacao); // Log de cada publicação
        return (
          <div key={publicacao.idPublicacao} className="item w-100 p-3">
            <div className="topo-timeLine d-flex align-items-center justify-content-start">
              <img
                src={publicacao.fotoUsuario ? `http://localhost:8080/fotos/${publicacao.fotoUsuario}` : imgUser}
                alt="User"
                className="user-image me-2"
              />
              <p className="text-white mb-0">{publicacao.nomeUsuario || "Fulano de Tal"}</p>
            </div>
            <div className="info">
              <div className="texto-publicacao-timeline">
                {publicacao.texto}
              </div>
              <div className="galeria-feed d-flex justify-content-center">
                {publicacao.fotos?.map((caminhoFoto, index) => {
                  if (!caminhoFoto) return null;
                  const nomeArquivo = caminhoFoto.split("\\").pop();

                  return (
                    <img
                      key={index} // Use o índice como key para as imagens
                      src={`http://localhost:8080/fotos/${nomeArquivo}`}
                      alt={`Foto ${index}`}
                      style={{ maxWidth: "100%", height: "auto", margin: "5px" }}
                      onError={(e) => {
                        e.target.src = "caminho/para/imagem/padrao.jpg";
                      }}
                    />
                  );
                })}
                {publicacao.videos?.map((video, index) => (
                  <div key={index} className="video-feed">
                    <video width="320" height="240" controls>
                      <source src={`http://localhost:8080/videos/${video}`} type="video/mp4" />
                      Seu navegador não suporta o elemento de vídeo.
                    </video>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SecaoFeedTimeLine;
