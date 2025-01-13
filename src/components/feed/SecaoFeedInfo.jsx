import React from "react";
import "../../assets/Css/feed/SecaoFeedInfo.css"; 
import imgUser from "../../assets/images/icon_user.png";

const SecaoFeedInfo = () => {
    return (
        <div className="seca-feed-noticia d-flex flex-column align-items-center rounded bg-custom" style={{ height: '300px', width: '100%', borderStyle: 'solid' }}>
            <p className="secao-feed-text-info text-white mt-2">Informações do usuário</p>
            <div className="topo d-flex align-items-center w-100">
                <img src={imgUser} alt="" className="img-user" />
                <div className="info">
                    <p>Fulano de Tal</p>
                    <button className="btn-seguir">Seguir</button>
                </div>
            </div>
            <div className="form-quem-sou-eu">
                <form action="">
                    <textarea name="" id="" placeholder="Quem sou eu"></textarea>
                    <input type="submit" name="btn" value="Salvar" />
                </form>
            </div>
        </div>
    )
}

export default SecaoFeedInfo;