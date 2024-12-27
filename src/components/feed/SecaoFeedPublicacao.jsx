import React from "react";
import "../../assets/Css/feed/secaoFeedPublicacao.css"; 

const SecaoFeedPublicacao = () => {
    return (
        <div className="secao-feed-publicacao d-flex rounded bg-custom" style={{ height: '100px', width: '100%' }}>

            <div className="foto-Perfil rounded-circle bg-secondary ms-3 mt-3" style={{ height: '60px', width: '60px' }}>
                {/* Conteúdo da foto */}
            </div>
            <div className="secao-publicacao border-2 m-auto ms-5 me-4 rounded bg-custom-publicacao d-flex justify-content-center align-items-center"  style={{ height: '70%', flex: 1}}>
                 <p className="texto-central mt-3 text-white">Faça sua Publicação</p>
            </div>
        </div>
    )
}

export default SecaoFeedPublicacao;
