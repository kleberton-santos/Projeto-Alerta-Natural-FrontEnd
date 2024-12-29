import React from "react";
import "../../src/index.css"
import "../assets/Css/previsao/Previsao.css"
import HeaderPrevisao from "../components/header/HeaderPrevisao";
import FooterGlobal from "../components/footer/FooterGlobal";

const Previsao = () => {
    return (
        <div className="previsao-principal ">
            {/* Header */}
            <div className="header">
                <HeaderPrevisao/>
            </div>
            
            {/* NavBar */}
            <div className="nav-bar d-flex justify-content-center align-items-center border border-primary" style={{ height: "55px", width: "100%", borderStyle: "solid" }}>
                <h2>NavBar</h2>
            </div>
            
          
            {/* Conteudo da Pagina*/}
          

            {/* Footer */}
            <div className="footer mt-5" >
                <FooterGlobal/>
            </div>

        </div>
    )
}

export default Previsao;