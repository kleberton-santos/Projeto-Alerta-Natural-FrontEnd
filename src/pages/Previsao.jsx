import React from "react";
import "../../src/index.css"
import "../assets/Css/previsao/Previsao.css"
import HeaderPrevisao from "../components/header/HeaderPrevisao";
import FooterGlobal from "../components/footer/FooterGlobal";
import Secaonavbar from "../components/navbar/Secaonavbar";

const Previsao = () => {
    return (
        <div className="previsao-principal ">
            {/* Header */}
            <div className="header">
                <HeaderPrevisao/>
            </div>
            
            {/* NavBar */}
            <div className="nav-bar">
                <Secaonavbar/>
            </div>
            
          
            {/* Conteudo da Pagina*/}
            <div className="content-previsao">
                
            </div>

            {/* Footer */}
            <div className="footer-previsao " >
                <FooterGlobal/>
            </div>

        </div>
    )
}

export default Previsao;