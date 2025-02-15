import React, { useState } from "react";
import "../../assets/Css/feed/SecaoModal.css";
import uploadImage from "../../assets/images/Modal/upload-image.png";
import uploadVideo from "../../assets/images/Modal/upload-video.png";
import axios from "axios";

const ModalFeed = ({ onPublicacaoCriada }) => {
  const [texto, setTexto] = useState("");
  const [fotos, setFotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const videoFiles = files.filter((file) => file.type.startsWith("video/"));

    setFotos((prevFotos) => [...prevFotos, ...imageFiles]);
    setVideos((prevVideos) => [...prevVideos, ...videoFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      alert("Usuário não está logado. Faça login para criar uma publicação.");
      return;
    }

    const publicacaoData = {
      idUsuario: user.id,
      texto: texto,
      fotos: [],
      videos: [],
    };

    try {
      const response = await axios.post("http://localhost:8080/publicacoes", publicacaoData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        const publicacaoId = response.data.idPublicacao;
        let novaPublicacao = response.data;

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
      console.error("Erro:", error);
      alert("Erro ao criar publicação");
    }
  };

  return (
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header d-flex align-items-center justify-content-center position-relative">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Escreva sua Publicação</h1>
              <button type="button" className="btn-close btn-close-white position-absolute end-0" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <textarea
                className="form-control"
                id="comment"
                rows="3"
                placeholder="Escreva seu comentário aqui..."
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
              ></textarea>
              <div className="mb-3">
                <label htmlFor="uploadImage">
                  <img src={uploadImage} alt="Upload de Imagem" className="img-fluid" style={{ width: "40px", height: "50px", cursor: "pointer" }} />
                </label>
                <label htmlFor="uploadVideo">
                  <img src={uploadVideo} alt="Upload de Vídeo" className="img-fluid" style={{ width: "40px", height: "50px", cursor: "pointer" }} />
                </label>
                <input type="file" id="uploadImage" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} multiple />
                <input type="file" id="uploadVideo" accept="video/*" style={{ display: "none" }} onChange={handleFileChange} multiple />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
              <button type="submit" className="btn btn-primary">Publicar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalFeed;