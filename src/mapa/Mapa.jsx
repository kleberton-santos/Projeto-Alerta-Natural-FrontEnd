import React, { useState } from "react";
import "../assets/css/contato/Contato.css";

const Mapa = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="mapa-container">
      <button className="ver-no-mapa" onClick={openModal}>Ver no Mapa</button>
      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={closeModal}>X</button>
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.495840008468!2d-46.65438152478165!3d-23.587416278780885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8ab7f6039%3A0x86eaeac4a4183251!2sAv.%20Paulista%2C%201578%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001310-200!5e0!3m2!1spt-BR!2sbr!4v1708975641234"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mapa;
