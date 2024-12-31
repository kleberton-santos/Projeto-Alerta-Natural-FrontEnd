import React from "react";
import { Link } from "react-router-dom";
import bannerHeader from "../../assets/images/banner-header.jpg";
import logo from "../../assets/images/logo.webp";
import "../../assets/Css/header/Header.css"; 
import "../../assets/Css/header/logo.css"; 

const HeaderHome = () => {
    return (
        <div className="header-principal">
            <img src={bannerHeader} alt="Banner Header" className="header-banner w-100"/>
            <div className="logo">
                <img src={logo} alt="Logotipo alerta natural" className="logo-banner" />
            </div>
            <div className="label-principal">
                <label htmlFor="">Alerta Natural</label>
            </div>
            <div className="login-principal">
                <Link to="/login" className="login-text">Faça seu Login</Link> 
                <div className="login-circle">
                    {/* O círculo será estilizado e receberá a imagem futuramente */}
                </div>
            </div>
        </div>
    );
};

export default HeaderHome;