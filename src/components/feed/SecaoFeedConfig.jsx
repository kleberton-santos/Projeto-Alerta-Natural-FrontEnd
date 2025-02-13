import React from "react";
import "../../assets/Css/feed/SecaoFeedConfig.css"; 
import imgUser from "../../assets/images/icon_user.png";

const SecaoFeedConfig = () => {
    return (
        <div className="seca-feed-config d-flex flex-column align-items-center rounded bg-custom" style={{ height: '300px', width: '100%' }}>
           <p className="secao-feed-text-amigo text-white">Informações</p>
            <div className="topo d-flex align-items-center w-100">
                <img src={imgUser} alt="" className="img-user" />
                <span className="login">Meu nome</span>
            </div>
            <div className="config-fotos d-flex flex-column w-100 mt-3 text-center">
                <a href="/EditarPerfil" className="link-custom text-white mb-2">Editar Perfil</a>
                <a href="/galeriaFotos" className="link-custom text-white mb-2">Fotos</a>
                <span className="text-custom text-white mt-2">Quem sou eu</span>
            </div>
            <div className="form-quem-sou-eu d-flex flex-column align-items-center w-100 mt-2 px-3">
            <form className="w-100">
                    <textarea className="bg-transparent text-white w-100 p-2" style={{ border: 'none', outline: 'none', resize: 'none' }}></textarea>
                    <input type="submit" name="btn" value="Salvar" className="btn-salvar mt-2" />
                </form>
            </div>
        </div>


    )
}

export default SecaoFeedConfig;