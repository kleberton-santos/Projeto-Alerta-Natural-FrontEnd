import React from "react";
import "../../assets/Css/feed/SecaoModal.css"
import uploadImage from "../../assets/images/Modal/upload-image.png";
import uploadVideo from "../../assets/images/Modal/upload-video.png";

const ModalFeed = () => {
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form>
          <div className="modal-header d-flex align-items-center justify-content-center position-relative">
             <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Escreva sua Publicação
              </h1>
              <button
                type="button"
                className="btn-close btn-close-white position-absolute end-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                
                <textarea
                  className="form-control"
                  id="comment"
                  rows="3"
                  placeholder="Escreva seu comentário aqui..."
                ></textarea>
              </div>
            </div>
            
            <div className="modal-footer d-flex justify-content-between align-items-center">
              <div className="d-flex">
                {/* Upload de Imagem */}
                <label htmlFor="uploadImage" className="me-2">
                  <img
                    src={uploadImage}
                    alt="Upload de Imagem"
                    className="img-fluid"
                    style={{ width: "40px", height: "50px", cursor: "pointer" }}
                  />
                </label>
                <input
                  type="file"
                  id="uploadImage"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => console.log("Imagem selecionada:", e.target.files[0])}
                />

                {/* Upload de Vídeo */}
                <label htmlFor="uploadVideo">
                  <img
                    src={uploadVideo}
                    alt="Upload de Vídeo"
                    className="img-fluid"
                    style={{ width: "40px", height: "50px", cursor: "pointer" }}
                  />
                </label>
                <input
                  type="file"
                  id="uploadVideo"
                  accept="video/*"
                  style={{ display: "none" }}
                  onChange={(e) => console.log("Vídeo selecionado:", e.target.files[0])}
                />
              </div>

              <div>
                <button
                  type="button"
                  className="button-fechar btn"
                  data-bs-dismiss="modal"
                >
                  Fechar
                </button>
                <button type="submit" className="button-publicar btn ms-3">
                  Publicar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalFeed;
