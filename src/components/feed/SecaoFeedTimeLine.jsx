import React, { useEffect, useState, useRef } from "react";
import axios from "../../config/axiosConfig"; // Importa o Axios configurado
import "../../assets/Css/feed/SecaoFeedTimeLine.css";
import imgUser from "../../assets/images/icon_user.png";
import ModalFeed from "./ModalFeed";
import Carousel from "react-bootstrap/Carousel"; // Importe o Carousel do Bootstrap

const SecaoFeedTimeLine = ({ idUsuario }) => {
  const [publicacoes, setPublicacoes] = useState([]);
  const [editarPublicacao, setEditarPublicacao] = useState(null);
  const [showModalEdicao, setShowModalEdicao] = useState(false); // Estado para controlar a visibilidade do modal de edição
  const [previewFotos, setPreviewFotos] = useState([]); // URLs temporários para pré-visualização de fotos
  const [previewVideos, setPreviewVideos] = useState([]); // URLs temporários para pré-visualização de vídeos
  const [novasFotos, setNovasFotos] = useState([]); // Novas fotos adicionadas durante a edição
  const [novosVideos, setNovosVideos] = useState([]); // Novos vídeos adicionados durante a edição
  const [textoEditado, setTextoEditado] = useState(""); // Estado para o texto editado
  const textareaRef = useRef(null); // Referência para o textarea
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

      // Atualiza o texto da publicação
      await axios.put(`http://localhost:8080/publicacoes/${idPublicacao}`, publicacaoDTO);

      // Se houver novas fotos ou vídeos, faz o upload
      if (novasFotos.length > 0 || novosVideos.length > 0) {
        const formData = new FormData();
        novasFotos.forEach((foto) => formData.append("fotos", foto));
        novosVideos.forEach((video) => formData.append("videos", video));

        const uploadResponse = await axios.post(
          `http://localhost:8080/publicacoes/${idPublicacao}/arquivos`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (uploadResponse.status === 200) {
          console.log("Fotos e vídeos adicionados com sucesso!");
        }
      }

      fetchPublicacoes();
    } catch (error) {
      console.error("Erro ao editar a publicação:", error);
    }
  };

  // Função para abrir o modal de edição
  const abrirModalEdicao = (publicacao) => {
    setEditarPublicacao(publicacao);
    setTextoEditado(publicacao.texto); // Define o texto da publicação no estado
    setShowModalEdicao(true); // Abre o modal de edição

    // Gera URLs temporários para pré-visualização das fotos e vídeos existentes
    const fotosPreviews = publicacao.fotos?.map((foto) => `http://localhost:8080/fotos/${foto.split("\\").pop()}`) || [];
    const videosPreviews = publicacao.videos?.map((video) => `http://localhost:8080/videos/${video}`) || [];

    setPreviewFotos(fotosPreviews);
    setPreviewVideos(videosPreviews);

    // Foca no textarea ao abrir o modal
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 0);
  };

  // Função para fechar o modal de edição
  const fecharModalEdicao = () => {
    setEditarPublicacao(null);
    setShowModalEdicao(false); // Fecha o modal de edição
    setPreviewFotos([]); // Limpa as pré-visualizações
    setPreviewVideos([]); // Limpa as pré-visualizações
    setNovasFotos([]); // Limpa as novas fotos
    setNovosVideos([]); // Limpa os novos vídeos
    setTextoEditado(""); // Limpa o texto editado
  };

  // Função para lidar com o upload de arquivos (imagens e vídeos)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const videoFiles = files.filter((file) => file.type.startsWith("video/"));

    // Atualiza os estados das novas fotos e vídeos
    setNovasFotos((prevFotos) => [...prevFotos, ...imageFiles]);
    setNovosVideos((prevVideos) => [...prevVideos, ...videoFiles]);

    // Gera URLs temporários para pré-visualização
    const imagePreviews = imageFiles.map((file) => URL.createObjectURL(file));
    const videoPreviews = videoFiles.map((file) => URL.createObjectURL(file));

    setPreviewFotos((prevPreviews) => [...prevPreviews, ...imagePreviews]);
    setPreviewVideos((prevPreviews) => [...prevPreviews, ...videoPreviews]);
  };

  // Função para renderizar o texto com quebras de linha
  const renderizarTextoComQuebras = (texto) => {
    return texto.split("\n").map((linha, index) => (
      <React.Fragment key={index}>
        {linha}
        <br />
      </React.Fragment>
    ));
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
      {showModalEdicao && editarPublicacao && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" aria-labelledby="modalEdicaoLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalEdicaoLabel">Editar Publicação</h5>
                <button type="button" className="btn-close" onClick={fecharModalEdicao} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <textarea
                  ref={textareaRef}
                  className="form-control"
                  rows="3"
                  placeholder="Escreva seu comentário aqui..."
                  value={textoEditado}
                  onChange={(e) => setTextoEditado(e.target.value)}
                  autoFocus // Foca automaticamente no textarea
                ></textarea>

                {/* Área de upload */}
                <div className="upload-buttons-right">
                  <label htmlFor="uploadImage" className="upload-label">
                    <div className="upload-icon-container">
                      <i className="fas fa-image upload-icon"></i> {/* Ícone de imagem */}
                    </div>
                    <span className="upload-text">Imagem</span>
                  </label>
                  <label htmlFor="uploadVideo" className="upload-label">
                    <div className="upload-icon-container">
                      <i className="fas fa-video upload-icon"></i> {/* Ícone de vídeo */}
                    </div>
                    <span className="upload-text">Vídeo</span>
                  </label>
                  <input type="file" id="uploadImage" accept="image/*" onChange={handleFileChange} multiple />
                  <input type="file" id="uploadVideo" accept="video/*" onChange={handleFileChange} multiple />
                </div>

                {/* Carrossel de fotos e vídeos */}
                {(previewFotos.length > 0 || previewVideos.length > 0) && (
                  <Carousel indicators={false}>
                    {previewFotos.map((preview, index) => (
                      <Carousel.Item key={index}>
                        <img
                          src={preview}
                          alt={`Preview ${index}`}
                          className="d-block w-100"
                        />
                      </Carousel.Item>
                    ))}
                    {previewVideos.map((preview, index) => (
                      <Carousel.Item key={index + previewFotos.length}>
                        <video controls className="d-block w-100">
                          <source src={preview} type="video/mp4" />
                          Seu navegador não suporta o elemento de vídeo.
                        </video>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    handleEditarPublicacao(editarPublicacao.idPublicacao, textoEditado);
                    fecharModalEdicao();
                  }}
                >
                  Salvar
                </button>
                <button type="button" className="btn btn-secondary" onClick={fecharModalEdicao}>
                  Cancelar
                </button>
              </div>
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
            </div>
            <div className="info">
              <div className="texto-publicacao-timeline">
                {renderizarTextoComQuebras(publicacao.texto)}
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

              {/* Linha divisória */}
              <div className="linha-divisoria"></div>

            {/* Botões de ação na parte inferior */}
            <div className="acoes-publicacao">
              {/* Ícones de curtir e comentar (sem funcionalidade) */}
              {userId && (
                <div className="upload-buttons-left">
                  <div className="upload-label">
                    <div className="upload-icon-container-line">
                      <i className="fas fa-heart upload-icon-line"></i> {/* Ícone de curtir */}
                    </div>
                    <span className="upload-text">Curtir</span>
                  </div>
                  <div className="upload-label">
                    <div className="upload-icon-container-line">
                      <i className="fas fa-comment upload-icon-line"></i> {/* Ícone de comentar */}
                    </div>
                    <span className="upload-text">Comentar</span>
                  </div>
                </div>
              )}

              {/* Botões de editar e remover (apenas para o dono da publicação) */}
              {isPublicacaoDoUsuario && (
                <div className="upload-buttons">
                  <div className="upload-label" onClick={() => handleRemoverPublicacao(publicacao.idPublicacao)}>
                    <div className="upload-icon-container-line">
                      <i className="fas fa-trash upload-icon-line"></i> {/* Ícone de lixeira */}
                    </div>
                    <span className="upload-text">Remover</span>
                  </div>
                  <div className="upload-label" onClick={() => abrirModalEdicao(publicacao)}>
                    <div className="upload-icon-container-line">
                      <i className="fas fa-edit upload-icon-line"></i> {/* Ícone de edição */}
                    </div>
                    <span className="upload-text">Editar</span>
                  </div>
                </div>
              )}
            </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SecaoFeedTimeLine;