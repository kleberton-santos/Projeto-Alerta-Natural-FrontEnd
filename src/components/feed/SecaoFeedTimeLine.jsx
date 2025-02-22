import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/Css/feed/SecaoFeedTimeLine.css";
import imgUser from "../../assets/images/icon_user.png";
import ModalFeed from "./ModalFeed";
import Carousel from "react-bootstrap/Carousel"; // Importe o Carousel do Bootstrap

const SecaoFeedTimeLine = ({ idUsuario }) => {
  const [publicacoes, setPublicacoes] = useState([]);
  const [editarPublicacao, setEditarPublicacao] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = idUsuario || user?.idusuario || user?.id;

  // Função para buscar as publicações
  const fetchPublicacoes = async () => {
    try {
      let todasPublicacoes = [];

      if (userId) {
        // Busca as publicações do usuário logado e dos amigos
        const responseUsuario = await axios.get(`http://localhost:8080/publicacoes/usuario/${userId}`);
        const responseAmigos = await axios.get(`http://localhost:8080/publicacoes/amigos/${userId}`);
        todasPublicacoes = [...responseUsuario.data, ...responseAmigos.data];
      } else {
        // Busca todas as publicações (quando o usuário não está logado)
        const responseTodas = await axios.get(`http://localhost:8080/publicacoes`);
        todasPublicacoes = responseTodas.data;
      }

      // Ordena as publicações pelo ID em ordem decrescente
      todasPublicacoes.sort((a, b) => {
        const idA = a.idPublicacao || 0;
        const idB = b.idPublicacao || 0;
        return idB - idA; // Ordenação decrescente
      });

      setPublicacoes(todasPublicacoes);
    } catch (error) {
      console.error("Erro ao carregar as publicações:", error);
    }
  };

  // Função para adicionar uma nova publicação ao feed
  const handleNovaPublicacao = (novaPublicacao) => {
    setPublicacoes((prevPublicacoes) => {
      const novasPublicacoes = [novaPublicacao, ...prevPublicacoes];
      return novasPublicacoes.sort((a, b) => {
        const idA = a.idPublicacao || 0;
        const idB = b.idPublicacao || 0;
        return idB - idA;
      });
    });
  };

  // Função para remover uma publicação com confirmação
  const handleRemoverPublicacao = async (idPublicacao) => {
    try {
      const confirmacao = window.confirm("Tem certeza que deseja remover a publicação?");
      if (!confirmacao) return;

      if (!idPublicacao || !userId) {
        console.error("ID da publicação ou do usuário é inválido.");
        return;
      }

      await axios.delete(`http://localhost:8080/publicacoes/usuario/${userId}/${idPublicacao}`);
      fetchPublicacoes();
    } catch (error) {
      console.error("Erro ao remover a publicação:", error);
    }
  };

  // Função para editar uma publicação
  const handleEditarPublicacao = async (idPublicacao, novoTexto) => {
    try {
      const publicacaoDTO = {
        texto: novoTexto,
      };

      await axios.put(`http://localhost:8080/publicacoes/${idPublicacao}`, publicacaoDTO);
      fetchPublicacoes();
    } catch (error) {
      console.error("Erro ao editar a publicação:", error);
    }
  };

  // Função para abrir o modal de edição
  const abrirModalEdicao = (publicacao) => {
    setEditarPublicacao(publicacao);
  };

  // Função para fechar o modal de edição
  const fecharModalEdicao = () => {
    setEditarPublicacao(null);
  };

  // Busca as publicações ao carregar o componente ou quando o idUsuario muda
  useEffect(() => {
    fetchPublicacoes();
  }, [idUsuario]);

  return (
    <div className="secao-feed-time-line">
      {/* Modal para nova publicação */}
      <ModalFeed onPublicacaoCriada={handleNovaPublicacao} />

      {/* Modal para editar publicação */}
      {editarPublicacao && (
        <div className="modal-edicao">
          <div className="modal-conteudo">
            <h3>Editar Publicação</h3>
            <textarea
              defaultValue={editarPublicacao.texto}
              onChange={(e) =>
                setEditarPublicacao({ ...editarPublicacao, texto: e.target.value })
              }
            />
            <div className="botoes-modal">
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleEditarPublicacao(editarPublicacao.idPublicacao, editarPublicacao.texto);
                  fecharModalEdicao();
                }}
              >
                Salvar
              </button>
              <button className="btn btn-secondary" onClick={fecharModalEdicao}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de publicações */}
      {publicacoes.map((publicacao) => {
        const isPublicacaoDoUsuario = publicacao.idUsuario === userId;

        return (
          <div key={publicacao.idPublicacao || publicacao.idUsuario} className="item">
            <div className="topo-timeLine">
              <img
                src={publicacao.fotoUsuario ? `http://localhost:8080/fotos/${publicacao.fotoUsuario}` : imgUser}
                alt="User"
                className="user-image"
              />
              <p>{publicacao.nomeUsuario || "Fulano de Tal"}</p>
              {isPublicacaoDoUsuario && (
                <div className="acoes-publicacao">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoverPublicacao(publicacao.idPublicacao)}
                  >
                    Remover
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => abrirModalEdicao(publicacao)}
                  >
                    Editar
                  </button>
                </div>
              )}
            </div>
            <div className="info">
              <div className="texto-publicacao-timeline">
                {publicacao.texto}
              </div>

              {/* Carrossel de fotos e vídeos */}
              {(publicacao.fotos?.length > 0 || publicacao.videos?.length > 0) && (
                <Carousel indicators={false}>
                  {publicacao.fotos?.map((caminhoFoto, index) => {
                    if (!caminhoFoto) return null;
                    const nomeArquivo = caminhoFoto.split("\\").pop();

                    return (
                      <Carousel.Item key={index}>
                        <img
                          src={`http://localhost:8080/fotos/${nomeArquivo}`}
                          alt={`Foto ${index}`}
                          className="d-block w-100"
                          onError={(e) => {
                            e.target.src = "caminho/para/imagem/padrao.jpg";
                          }}
                        />
                      </Carousel.Item>
                    );
                  })}
                  {publicacao.videos?.map((video, index) => (
                    <Carousel.Item key={index + publicacao.fotos?.length}>
                      <video controls className="d-block w-100">
                        <source src={`http://localhost:8080/videos/${video}`} type="video/mp4" />
                        Seu navegador não suporta o elemento de vídeo.
                      </video>
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SecaoFeedTimeLine;