import React, { useState } from "react";
import "../../assets/Css/feed/SecaoModal.css"; // Importação do arquivo CSS
import axios from "axios";

const ModalFeed = ({ onPublicacaoCriada }) => {
  // Estados para armazenar o texto, fotos, vídeos e suas pré-visualizações
  const [texto, setTexto] = useState("");
  const [fotos, setFotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [previewFotos, setPreviewFotos] = useState([]); // URLs temporários para pré-visualização de fotos
  const [previewVideos, setPreviewVideos] = useState([]); // URLs temporários para pré-visualização de vídeos

  // Obtém o usuário logado do localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Função para lidar com o upload de arquivos (imagens e vídeos)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const videoFiles = files.filter((file) => file.type.startsWith("video/"));

    // Atualiza os estados das fotos e vídeos
    setFotos((prevFotos) => [...prevFotos, ...imageFiles]);
    setVideos((prevVideos) => [...prevVideos, ...videoFiles]);

    // Gera URLs temporários para pré-visualização
    const imagePreviews = imageFiles.map((file) => URL.createObjectURL(file));
    const videoPreviews = videoFiles.map((file) => URL.createObjectURL(file));

    setPreviewFotos((prevPreviews) => [...prevPreviews, ...imagePreviews]);
    setPreviewVideos((prevPreviews) => [...prevPreviews, ...videoPreviews]);
  };

  // Função para enviar a publicação
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se o usuário está logado
    if (!user || !user.id) {
      alert("Usuário não está logado. Faça login para criar uma publicação.");
      return;
    }

    // Cria o objeto de dados da publicação
    const publicacaoData = {
      idUsuario: user.id,
      texto: texto,
      fotos: [],
      videos: [],
    };

    try {
      // Envia a publicação para o servidor
      const response = await axios.post("http://localhost:8080/publicacoes", publicacaoData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        const publicacaoId = response.data.idPublicacao;
        let novaPublicacao = response.data;

        // Se houver fotos ou vídeos, faz o upload
        if (fotos.length > 0 || videos.length > 0) {
          const formData = new FormData();
          fotos.forEach((foto) => formData.append("fotos", foto));
          videos.forEach((video) => formData.append("videos", video));

          const uploadResponse = await axios.post(`http://localhost:8080/publicacoes/${publicacaoId}/arquivos`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (uploadResponse.status === 200) {
            novaPublicacao = { ...novaPublicacao, fotos: uploadResponse.data.fotos, videos: uploadResponse.data.videos };
          }
        }

        alert("Publicação criada com sucesso!");
        setTexto("");
        setFotos([]);
        setVideos([]);
        setPreviewFotos([]); // Limpa as pré-visualizações
        setPreviewVideos([]); // Limpa as pré-visualizações

        // Fecha o modal
        const modalElement = document.getElementById("staticBackdrop");
        const modal = window.bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        // Recarrega a página para atualizar o feed
        window.location.reload();
      } else {
        alert("Erro ao criar publicação");
      }
    } catch (error) {
      alert("Erro ao criar publicação");
    }
  };

  return (
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            {/* Cabeçalho do modal */}
            <div className="modal-header">
              <h1 className="modal-title">Escreva sua Publicação</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            {/* Corpo do modal */}
            <div className="modal-body">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Escreva seu comentário aqui..."
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
              ></textarea>

              {/* Área de upload */}
              <div className="upload-buttons-modal">
                <label htmlFor="uploadImage" className="upload-label">
                  <div className="upload-icon-container-modal">
                    <i className="fas fa-image upload-icon-modal"></i> {/* Ícone de imagem */}
                  </div>
                  <span className="upload-text">Imagem</span>
                </label>
                <label htmlFor="uploadVideo" className="upload-label">
                  <div className="upload-icon-container-modal">
                    <i className="fas fa-video upload-icon-modal"></i> {/* Ícone de vídeo */}
                  </div>
                  <span className="upload-text">Vídeo</span>
                </label>
                <input type="file" id="uploadImage" accept="image/*" onChange={handleFileChange} multiple />
                <input type="file" id="uploadVideo" accept="video/*" onChange={handleFileChange} multiple />
              </div>

              {/* Pré-visualização das fotos */}
              {previewFotos.length > 0 && (
                <div className="preview-container">
                  {previewFotos.map((preview, index) => (
                    <div key={index} className="preview-item">
                      <img src={preview} alt={`Preview ${index}`} className="preview-media" />
                    </div>
                  ))}
                </div>
              )}

              {/* Pré-visualização dos vídeos */}
              <div className="preview-container">
                {previewVideos.map((preview, index) => (
                  <div key={index} className="preview-item">
                    <video controls className="preview-media">
                      <source src={preview} type="video/mp4" />
                      Seu navegador não suporta o elemento de vídeo.
                    </video>
                  </div>
                ))}
              </div>
            </div>

            {/* Rodapé do modal */}
            <div className="modal-footer">
              <button type="submit" className="btn-publicar">Publicar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalFeed;