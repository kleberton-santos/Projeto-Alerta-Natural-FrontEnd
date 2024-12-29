import React from "react";
import bannerHeader from "../../assets/images/banner-header.jpg";
import logo from "../../assets/images/logo.webp";
import "../../assets/Css/header/Header.css"; 
import "../../assets/Css/header/logo.css"; 

const HeaderCadastro = () => {
    return (
        <div className="header-principal">
            <img src={bannerHeader} alt="Banner Header" className="header-banner w-100"/>
            <div className="logo">
                <img src={logo} alt="Logotipo alerta natural" className="logo-banner" />
            </div>
            <div className="label-principal">
                <label htmlFor="">Cadastro</label>
            </div>
            <div className="login-principal">
                <a href="#" className="login-text">Faça seu login</a>
                <div className="login-circle">
                    {/* O círculo será estilizado e receberá a imagem futuramente */}
                </div>
            </div>
        </div>
    );
};

export default HeaderCadastro;