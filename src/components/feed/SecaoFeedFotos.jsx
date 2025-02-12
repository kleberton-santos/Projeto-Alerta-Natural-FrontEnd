import React from "react";
import "../../assets/Css/feed/SecaoFeedLine.css"; 
import imgDefault from "../../assets/images/img-default.png";

const SecaoFeedFotos = () => {
    return (
        <div className="seca-feed-time-line d-flex flex-column align-items-center rounded bg-custom-foto-line" style={{ height: '400px', width: '100%', borderStyle: 'solid' }}>
            <p className="secao-feed-text-foto text-white">Galeria de fotos</p>
            <div className="galeria-fotos d-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', padding: '10px' }}>
                {[...Array(9)].map((_, index) => (
                    <div key={index} className="foto-item d-flex justify-content-center align-items-center" style={{ height: '100px', border: '1px solid white' }}>
                        <img src={imgDefault} alt="User" className="img-fluid" style={{ maxHeight: '80%', maxWidth: '80%' }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SecaoFeedFotos;