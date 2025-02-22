import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/Css/feed/SecaoFeedTimeLine.css";
import imgUser from "../../assets/images/icon_user.png";
import ModalFeed from "./ModalFeed";

const SecaoFeedTimeLine = ({ idUsuario }) => {
  const [publicacoes, setPublicacoes] = useState([]);
  const [editarPublicacao, setEditarPublicacao] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = idUsuario || user?.idusuario || user?.id;

  console.log("Renderizando SecaoFeedTimeLine...");

  // Função para buscar as publicações
  const fetchPublicacoes = async () => {
    try {
      console.log("Buscando publicações...");
      console.log("ID do usuário:", userId);

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

      // Log das publicações antes da ordenação
      console.log("Publicações antes da ordenação:", todasPublicacoes);

      // Ordena as publicações pelo ID em ordem decrescente
      todasPublicacoes.sort((a, b) => {
        // Se o idPublicacao for null, atribui um valor temporário (ex: 0)
        const idA = a.idPublicacao || 0;
        const idB = b.idPublicacao || 0;
        return idB - idA; // Ordenação decrescente
      });

      // Log das publicações após a ordenação
      console.log("Publicações após a ordenação:", todasPublicacoes);

      // Atualiza o estado com as publicações ordenadas
      setPublicacoes(todasPublicacoes);
    } catch (error) {
      console.error("Erro ao carregar as publicações:", error);
    }
  };

  // Função para adicionar uma nova publicação ao feed
  const handleNovaPublicacao = (novaPublicacao) => {
    console.log("Nova publicação recebida:", novaPublicacao);

    // Adiciona a nova publicação ao topo da lista
    setPublicacoes((prevPublicacoes) => {
      const novasPublicacoes = [novaPublicacao, ...prevPublicacoes];
      // Ordena as publicações pelo ID em ordem decrescente
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

      console.log("ID da publicação a ser removida:", idPublicacao);

      if (!idPublicacao) {
        console.error("ID da publicação é inválido:", idPublicacao);
        return;
      }

      if (!userId) {
        console.error("ID do usuário não encontrado no localStorage.");
        return;
      }

      await axios.delete(`http://localhost:8080/publicacoes/usuario/${userId}/${idPublicacao}`);
      console.log("Publicação removida com sucesso!");

      fetchPublicacoes();
    } catch (error) {
      console.error("Erro ao remover a publicação:", error);
    }
  };

  // Função para editar uma publicação
  const handleEditarPublicacao = async (idPublicacao, novoTexto) => {
    try {
      console.log("Editando publicação com ID:", idPublicacao);

      const publicacaoDTO = {
        texto: novoTexto,
      };

      await axios.put(`http://localhost:8080/publicacoes/${idPublicacao}`, publicacaoDTO);
      console.log("Publicação editada com sucesso!");

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

  useEffect(() => {
    fetchPublicacoes();
  }, [idUsuario]);

  // Log do estado publicacoes
  useEffect(() => {
    console.log("Publicações atualizadas:", publicacoes);
  }, [publicacoes]);

  return (
    <div className="secao-feed-time-line d-flex flex-column">
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
        console.log("Publicação completa:", publicacao);

        const isPublicacaoDoUsuario = publicacao.idUsuario === userId;

        return (
          <div key={publicacao.idPublicacao || publicacao.idUsuario} className="item w-100 p-3">
            <div className="topo-timeLine d-flex align-items-center justify-content-start">
              <img
                src={publicacao.fotoUsuario ? `http://localhost:8080/fotos/${publicacao.fotoUsuario}` : imgUser}
                alt="User"
                className="user-image me-2"
              />
              <p className="text-white mb-0">{publicacao.nomeUsuario || "Fulano de Tal"}</p>
              {isPublicacaoDoUsuario && (
                <div className="ms-auto">
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleRemoverPublicacao(publicacao.idPublicacao)}
                  >
                    Remover
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
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
              <div className="galeria-feed d-flex justify-content-center">
                {publicacao.fotos?.map((caminhoFoto, index) => {
                  if (!caminhoFoto) return null;
                  const nomeArquivo = caminhoFoto.split("\\").pop();

                  return (
                    <img
                      key={index}
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