import React from "react";
import { Link } from "react-router-dom";
import bannerHeader from "../../assets/images/banner-header.jpg";
import logo from "../../assets/images/logo.webp";
import "../../assets/Css/header/Header.css"; 
import "../../assets/Css/header/logo.css"; 

const HeaderPrevisao = () => {
    return (
        <div className="header-principal position-relative">
                    <img src={bannerHeader} alt="Banner Header" className="header-banner img-fluid w-100"/>
                    <div className="logo">
                        <img src={logo} alt="Logotipo alerta natural" className="logo-banner" />
                    </div>
                    <div className="label-principal position-absolute top-50 start-50 translate-middle text-white text-center fs-1 fw-bold">
                        <label htmlFor="">Previsão do Tempo</label>
                    </div>
                    <div className="login-principal position-absolute top-50 end-0 translate-middle-y d-flex align-items-center gap-2 me-3">
                        <Link to="/login" className="login-text text-light text-decoration-none fs-5">
                            Faça seu Login
                        </Link>
                        <div className="login-circle"></div>
                    </div>
                </div>
    );
};

export default HeaderPrevisao;