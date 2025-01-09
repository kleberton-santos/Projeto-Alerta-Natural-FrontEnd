import React, { useState } from "react";

function ModalComponent() {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div>
      {/* Botão para abrir o modal */}
      <button className="btn btn-primary" onClick={handleShow}>
        Abrir Modal
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          tabIndex="-1"
        >
          <div
            className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center" 
                 style={{ backgroundColor: "#27335C", color: "#D9D9D9", fontSize: "14px", fontWeight: "bolder"}}
            > 
              <div className="modal-header" 
                style={{border: "none"}}
              >
                <h5 className="modal-title w-100">Esqueci minha senha</h5> 
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body"              >
                <p className="mt-4" style={{backgroundColor: "#D9D9D9", color: "#D9D9D9", fontSize: "16px"}}>Digite seu email para recuperação</p>
              </div>
                <div className="p-3 mb-5">
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Seu email" />
                </div>
              <div className="modal-footer justify-content-center"
                 style={{border: "none"}}
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{backgroundColor: "#D9D9D9", border: "none", width: "40%"}}
                  onClick={handleClose}
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalComponent;
