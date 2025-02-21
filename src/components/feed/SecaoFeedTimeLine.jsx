import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/Css/feed/SecaoFeedTimeLine.css";
import imgUser from "../../assets/images/icon_user.png";
import ModalFeed from "./ModalFeed";

const SecaoFeedTimeLine = ({ idUsuario }) => {
  const [publicacoes, setPublicacoes] = useState([]);
  const [editarPublicacao, setEditarPublicacao] = useState(null); // Estado para controlar a edição
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = idUsuario || user?.idusuario || user?.id; // ID do usuário logado

  console.log("Renderizando SecaoFeedTimeLine..."); // Log de renderização

  // Função para buscar as publicações do usuário e dos amigos
  const fetchPublicacoes = async () => {
    try {
      console.log("Buscando publicações do usuário e dos amigos...");
      console.log("ID do usuário:", userId); // Log do ID do usuário

      if (!userId) {
        console.error("ID do usuário não encontrado no localStorage.");
        return;
      }

      // Busca as publicações do usuário logado
      const responseUsuario = await axios.get(`http://localhost:8080/publicacoes/usuario/${userId}`);
      console.log("Publicações do usuário:", responseUsuario.data);

      // Busca as publicações dos amigos
      const responseAmigos = await axios.get(`http://localhost:8080/publicacoes/amigos/${userId}`);
      console.log("Publicações dos amigos:", responseAmigos.data);

      // Combina as publicações do usuário e dos amigos
      const todasPublicacoes = [...responseUsuario.data, ...responseAmigos.data];

      // Ordena as publicações por data (se necessário)
      todasPublicacoes.sort((a, b) => new Date(b.dataPublicacao) - new Date(a.dataPublicacao));

      setPublicacoes(todasPublicacoes);
    } catch (error) {
      console.error("Erro ao carregar as publicações:", error);
    }
  };

  // Função para adicionar uma nova publicação ao feed
  const handleNovaPublicacao = () => {
    console.log("handleNovaPublicacao chamada!"); // Log da função
    fetchPublicacoes();
  };

  // Função para remover uma publicação com confirmação
  const handleRemoverPublicacao = async (idPublicacao) => {
    try {
      // Confirmação antes de remover
      const confirmacao = window.confirm("Tem certeza que deseja remover a publicação?");
      if (!confirmacao) return;

      console.log("ID da publicação a ser removida:", idPublicacao); // Verifique o valor aqui

      // Verifica se o ID da publicação é válido
      if (!idPublicacao) {
        console.error("ID da publicação é inválido:", idPublicacao);
        return;
      }

      if (!userId) {
        console.error("ID do usuário não encontrado no localStorage.");
        return;
      }

      // Faz a requisição DELETE para o endpoint
      await axios.delete(`http://localhost:8080/publicacoes/usuario/${userId}/${idPublicacao}`);
      console.log("Publicação removida com sucesso!");

      // Atualiza a lista de publicações após a remoção
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
        texto: novoTexto, // Novo texto da publicação
      };

      // Faz a requisição PUT para o endpoint de edição
      await axios.put(`http://localhost:8080/publicacoes/${idPublicacao}`, publicacaoDTO);
      console.log("Publicação editada com sucesso!");

      // Atualiza a lista de publicações após a edição
      fetchPublicacoes();
    } catch (error) {
      console.error("Erro ao editar a publicação:", error);
    }
  };

  // Função para abrir o modal de edição
  const abrirModalEdicao = (publicacao) => {
    setEditarPublicacao(publicacao); // Define a publicação a ser editada
  };

  // Função para fechar o modal de edição
  const fecharModalEdicao = () => {
    setEditarPublicacao(null); // Limpa a publicação em edição
  };

  useEffect(() => {
    fetchPublicacoes();
  }, [idUsuario]); // Atualiza as publicações quando o idUsuario muda

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
        console.log("Publicação completa:", publicacao); // Inspecione o objeto completo

        // Verifica se a publicação pertence ao usuário logado
        const isPublicacaoDoUsuario = publicacao.idUsuario === userId;

        return (
          <div key={publicacao.idPublicacao} className="item w-100 p-3">
            <div className="topo-timeLine d-flex align-items-center justify-content-start">
              <img
                src={publicacao.fotoUsuario ? `http://localhost:8080/fotos/${publicacao.fotoUsuario}` : imgUser}
                alt="User"
                className="user-image me-2"
              />
              <p className="text-white mb-0">{publicacao.nomeUsuario || "Fulano de Tal"}</p>
              {/* Exibe os botões apenas se a publicação for do usuário logado */}
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