import React from "react";
import "../../assets/Css/feed/secaoFeedPublicacao.css"; // Caminho relativo para o CSS

const SecaoFeedPublicacao = () => {
    return (
        <div className="secaoPrincipal d-flex rounded bg-custom mt-3 ms-4" style={{ height: '100px', width: '60%', borderStyle: 'solid' }}>
            <div className="foto-Perfil rounded-circle bg-secondary ms-3 mt-3" style={{ height: '60px', width: '60px' }}>
                {/* Conteúdo da foto */}
            </div>
            <div className="secao-publicacao border-2 m-auto ms-5 me-4 rounded bg-custom-publicacao" style={{ height: '70%', flex: 1, border: '2px solid' }}>
                {/* Conteúdo da seção de publicação */}
            </div>
        </div>
    )
}

export default SecaoFeedPublicacao;
