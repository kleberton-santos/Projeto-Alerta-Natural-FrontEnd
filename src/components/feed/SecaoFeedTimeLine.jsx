import React, { useEffect, useState, useRef } from "react";
import axios from "../../config/axiosConfig";
import "../../assets/Css/feed/SecaoFeedTimeLine.css";
import imgUser from "../../assets/images/icon_user.png";
import ModalFeed from "./ModalFeed";
import Carousel from "react-bootstrap/Carousel";

const SecaoFeedTimeLine = ({ idUsuario }) => {
  const [publicacoes, setPublicacoes] = useState([]);
  const [editarPublicacao, setEditarPublicacao] = useState(null);
  const [showModalEdicao, setShowModalEdicao] = useState(false);
  const [previewFotos, setPreviewFotos] = useState([]);
  const [previewVideos, setPreviewVideos] = useState([]);
  const [novasFotos, setNovasFotos] = useState([]);
  const [novosVideos, setNovosVideos] = useState([]);
  const [textoEditado, setTextoEditado] = useState("");
  const [comentarios, setComentarios] = useState({});
  const [novoComentario, setNovoComentario] = useState("");
  const [mostrarCaixaComentario, setMostrarCaixaComentario] = useState({});
  const [mostrarListaComentarios, setMostrarListaComentarios] = useState({});
  const [editarComentarioId, setEditarComentarioId] = useState(null);
  const [textoComentarioEditado, setTextoComentarioEditado] = useState("");
  const [curtidas, setCurtidas] = useState({});
  const textareaRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = idUsuario || user?.idusuario || user?.id;

  // Função para buscar as publicações
  const fetchPublicacoes = async () => {
    try {
      let todasPublicacoes = [];

      if (userId) {
        const responseUsuario = await axios.get(`http://localhost:8080/publicacoes/usuario/${userId}`);
        const responseAmigos = await axios.get(`http://localhost:8080/publicacoes/amigos/${userId}`);
        todasPublicacoes = [...responseUsuario.data, ...responseAmigos.data];
      } else {
        const responseTodas = await axios.get(`http://localhost:8080/publicacoes`);
        todasPublicacoes = responseTodas.data;
      }

      todasPublicacoes.sort((a, b) => {
        const idA = a.idPublicacao || 0;
        const idB = b.idPublicacao || 0;
        return idB - idA;
      });

      setPublicacoes(todasPublicacoes);

      // Buscar a quantidade de curtidas para cada publicação
      todasPublicacoes.forEach(async (publicacao) => {
        const responseCurtidas = await axios.get(`http://localhost:8080/publicacoes/${publicacao.idPublicacao}/curtidas`);
        setCurtidas((prevCurtidas) => ({
          ...prevCurtidas,
          [publicacao.idPublicacao]: responseCurtidas.data,
        }));
      });
    } catch (error) {
      console.error("Erro ao carregar as publicações:", error);
    }
  };

  // Função para curtir uma publicação
  const handleCurtirPublicacao = async (idPublicacao) => {
    try {
      await axios.post(`http://localhost:8080/publicacoes/${idPublicacao}/curtir`, null, {
        params: {
          idUsuario: userId,
        },
      });

      // Atualizar a quantidade de curtidas
      const responseCurtidas = await axios.get(`http://localhost:8080/publicacoes/${idPublicacao}/curtidas`);
      setCurtidas((prevCurtidas) => ({
        ...prevCurtidas,
        [idPublicacao]: responseCurtidas.data,
      }));
    } catch (error) {
      console.error("Erro ao curtir a publicação:", error);
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
    setTextoEditado(publicacao.texto);
    setShowModalEdicao(true);

    const fotosPreviews = publicacao.fotos?.map((foto) => `http://localhost:8080/fotos/${foto.split("\\").pop()}`) || [];
    const videosPreviews = publicacao.videos?.map((video) => `http://localhost:8080/fotos/video/${video}`) || [];

    setPreviewFotos(fotosPreviews);
    setPreviewVideos(videosPreviews);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 0);
  };

  // Função para fechar o modal de edição
  const fecharModalEdicao = () => {
    setEditarPublicacao(null);
    setShowModalEdicao(false);
    setPreviewFotos([]);
    setPreviewVideos([]);
    setNovasFotos([]);
    setNovosVideos([]);
    setTextoEditado("");
  };

  // Função para lidar com o upload de arquivos (imagens e vídeos)
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const videoFiles = files.filter((file) => file.type.startsWith("video/"));

    setNovasFotos((prevFotos) => [...prevFotos, ...imageFiles]);
    setNovosVideos((prevVideos) => [...prevVideos, ...videoFiles]);

    const imagePreviews = imageFiles.map((file) => URL.createObjectURL(file));
    const videoPreviews = videoFiles.map((file) => URL.createObjectURL(file));

    setPreviewFotos((prevPreviews) => [...prevPreviews, ...imagePreviews]);
    setPreviewVideos((prevPreviews) => [...prevPreviews, ...videoPreviews]);

    try {
      if (imageFiles.length > 0) {
        const formDataImages = new FormData();
        imageFiles.forEach((image) => formDataImages.append("file", image));

        const responseImages = await axios.post(
          "http://localhost:8080/fotos/upload",
          formDataImages,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Imagens enviadas com sucesso:", responseImages.data);
      }

      if (videoFiles.length > 0) {
        const formDataVideos = new FormData();
        videoFiles.forEach((video) => formDataVideos.append("file", video));

        const responseVideos = await axios.post(
          "http://localhost:8080/fotos/upload-video",
          formDataVideos,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Vídeos enviados com sucesso:", responseVideos.data);
      }
    } catch (error) {
      console.error("Erro ao enviar arquivos para o backend:", error);
    }
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

  // Função para adicionar um comentário
  const adicionarComentario = async (idPublicacao) => {
    try {
      if (!novoComentario.trim()) {
        alert("O comentário não pode estar vazio.");
        return;
      }

      const response = await axios.post(
        `http://localhost:8080/publicacoes/${idPublicacao}/comentarios`,
        null,
        {
          params: {
            idUsuario: userId,
            texto: novoComentario,
          },
        }
      );

      if (response.status === 201) {
        setNovoComentario("");
        fetchComentarios(idPublicacao);
        setMostrarCaixaComentario((prevState) => ({
          ...prevState,
          [idPublicacao]: false,
        }));
      }
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
    }
  };

  // Função para buscar comentários de uma publicação
  const fetchComentarios = async (idPublicacao) => {
    try {
      const response = await axios.get(`http://localhost:8080/publicacoes/${idPublicacao}/comentarios`);
      setComentarios((prevComentarios) => ({
        ...prevComentarios,
        [idPublicacao]: response.data,
      }));
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
    }
  };

  // Função para editar um comentário
  const editarComentario = async (idPublicacao, idComentario) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/publicacoes/${idPublicacao}/comentarios/${idComentario}`,
        null,
        {
          params: {
            novoTexto: textoComentarioEditado,
            idUsuario: userId,
          },
        }
      );

      if (response.status === 200) {
        fetchComentarios(idPublicacao);
        setEditarComentarioId(null);
        setTextoComentarioEditado("");
      }
    } catch (error) {
      console.error("Erro ao editar o comentário:", error);
    }
  };

  // Função para remover um comentário
  const removerComentario = async (idPublicacao, idComentario) => {
    try {
      const confirmacao = window.confirm("Tem certeza que deseja remover o comentário?");
      if (!confirmacao) return;

      await axios.delete(
        `http://localhost:8080/publicacoes/${idPublicacao}/comentarios/${idComentario}`,
        {
          params: {
            idUsuario: userId,
          },
        }
      );

      window.location.reload();
    } catch (error) {
      console.error("Erro ao remover o comentário:", error);
    }
  };

  // Função para alternar a visibilidade da lista de comentários
  const toggleListaComentarios = (idPublicacao) => {
    setMostrarListaComentarios((prevState) => ({
      ...prevState,
      [idPublicacao]: !prevState[idPublicacao],
    }));

    if (!mostrarListaComentarios[idPublicacao]) {
      fetchComentarios(idPublicacao);
    }
  };

  // Função para alternar a visibilidade da caixa de comentário
  const toggleCaixaComentario = (idPublicacao) => {
    setMostrarCaixaComentario((prevState) => ({
      ...prevState,
      [idPublicacao]: !prevState[idPublicacao],
    }));
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
                  autoFocus
                ></textarea>

                {/* Área de upload */}
                <div className="upload-buttons-modalEdit">
                  <label htmlFor="uploadImage" className="upload-labelEdit">
                    <div className="upload-icon-container-modalEdit">
                      <i className="fas fa-image upload-iconEdit"></i>
                    </div>
                    <span className="upload-textEdit">Imagem</span>
                  </label>
                  <label htmlFor="uploadVideo" className="upload-labelEdit">
                    <div className="upload-icon-container-modalEdit">
                      <i className="fas fa-video upload-iconEdit"></i>
                    </div>
                    <span className="upload-textEdit">Vídeo</span>
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
                <Carousel indicators={false} className="carousel">
                  {publicacao.fotos?.map((caminhoFoto, index) => {
                    if (!caminhoFoto) return null;
                    const nomeArquivo = caminhoFoto.split("\\").pop();

                    return (
                      <Carousel.Item key={index} className="carousel-item">
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
                  {publicacao.videos?.map((video, index) => {
                    const nomeArquivo = video.split("\\").pop(); // Extrai o nome do arquivo do caminho completo
                    return (
                      <Carousel.Item key={index + publicacao.fotos?.length} className="carousel-item">
                        <video controls className="d-block w-100">
                          <source src={`http://localhost:8080/fotos/video/${nomeArquivo}`} type="video/mp4" />
                          Seu navegador não suporta o elemento de vídeo.
                        </video>
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              )}

              {/* Linha divisória */}
              <div className="linha-divisoria"></div>

              {/* Botão para mostrar/ocultar a lista de comentários */}
              <div className="acoes-publicacao">
                {userId && (
                  <div className="upload-buttons-left">
                    {/* Botão de curtir/descurtir */}
                    <div 
                      className={`upload-label ${curtidas[publicacao.idPublicacao] ? "curtido" : "nao-curtido"}`} 
                      onClick={() => handleCurtirPublicacao(publicacao.idPublicacao)}
                    >
                      <div className="upload-icon-container-line-comentario">
                        <span className="curtida-contagem">{curtidas[publicacao.idPublicacao] || 0}</span>
                        {curtidas[publicacao.idPublicacao] ? (
                          <i className="fas fa-heart-broken upload-icon-line"></i> // Ícone de "Deixar de curtir"
                        ) : (
                          <i className="fas fa-heart upload-icon-line"></i> // Ícone de "Curtir"
                        )}
                      </div>
                      <span className="upload-text-curtir">
                        {curtidas[publicacao.idPublicacao] ? "Deixar de curtir" : "Curtir"}
                      </span>              
                    </div>

                    {/* Botão de comentários */}
                    <div className="upload-label-comentarios" onClick={() => toggleListaComentarios(publicacao.idPublicacao)}>
                      <div className="upload-icon-container-line">
                        <i className="fas fa-comments upload-icon-line"></i>
                      </div>
                      <span className="upload-text">
                        {mostrarListaComentarios[publicacao.idPublicacao] ? "Comentários" : "Comentários"}
                      </span>
                    </div>
                  </div>
                )}

                {isPublicacaoDoUsuario && (
                  <div className="upload-buttons-right">
                    {/* Botão de remover publicação */}
                    <div className="upload-label" onClick={() => handleRemoverPublicacao(publicacao.idPublicacao)}>
                      <div className="upload-icon-container-line">
                        <i className="fas fa-trash upload-icon-line"></i>
                      </div>
                      <span className="upload-text">Remover</span>
                    </div>

                    {/* Botão de editar publicação */}
                    <div className="upload-label" onClick={() => abrirModalEdicao(publicacao)}>
                      <div className="upload-icon-container-line">
                        <i className="fas fa-edit upload-icon-line"></i>
                      </div>
                      <span className="upload-text">Editar</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Lista de comentários (exibida apenas se mostrarListaComentarios for true) */}
              {mostrarListaComentarios[publicacao.idPublicacao] && (
                <div className="comentarios">
                  <h5>Comentários:</h5>
                  {comentarios[publicacao.idPublicacao]?.map((comentario) => (
                    <div key={comentario.id} className="comentario">
                      <div className="comentario-texto">
                        <strong>{comentario.nomeUsuario}</strong>
                        {editarComentarioId === comentario.idComentario ? (
                          <>
                            <textarea
                              className="form-control"
                              rows="2"
                              value={textoComentarioEditado}
                              onChange={(e) => setTextoComentarioEditado(e.target.value)}
                            ></textarea>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => editarComentario(publicacao.idPublicacao, comentario.id)}
                            >
                              Salvar
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() => setEditarComentarioId(null)}
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <>
                            <p>{comentario.texto}</p>
                            {comentario.idUsuario === userId && (
                              <div className="acoes-comentario">
                                <button
                                  className="btn btn-link"
                                  onClick={() => {
                                    setEditarComentarioId(comentario.idComentario);
                                    setTextoComentarioEditado(comentario.texto);
                                  }}
                                >
                                  Editar
                                </button>
                                <button
                                  className="btn btn-link"
                                  onClick={() => removerComentario(publicacao.idPublicacao, comentario.id)}
                                >
                                  Remover
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Botão para mostrar/ocultar a caixa de comentário */}
              {userId && (
                <div className="botao-comentar">
                  <div className="" onClick={() => toggleCaixaComentario(publicacao.idPublicacao)}>
                    <div className="upload-icon-container-line">
                      <i className="fas fa-comment upload-icon-line"></i>
                    </div>
                    <span className="upload-text">
                      {mostrarCaixaComentario[publicacao.idPublicacao] ? "Comentar" : "Comentar"}
                    </span>
                  </div>
                </div>
              )}

              {/* Caixa de comentário (exibida apenas se mostrarCaixaComentario for true) */}
              {mostrarCaixaComentario[publicacao.idPublicacao] && (
                <div className="novo-comentario">
                  <textarea
                    className="form-control-comentario"
                    rows="2"
                    placeholder="Adicione um comentário..."
                    value={novoComentario}
                    onChange={(e) => setNovoComentario(e.target.value)}
                  ></textarea>
                  <button
                    className="button-comentar btn btn-secondary btn-sm"
                    onClick={() => adicionarComentario(publicacao.idPublicacao)}
                  >
                    Comentar
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SecaoFeedTimeLine;