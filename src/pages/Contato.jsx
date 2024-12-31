import React from "react";
import "../../src/index.css"
import "../assets/Css/contato/Contato.css"
import HeaderContato from "../components/header/HeaderContato";
import FooterGlobal from "../components/footer/FooterGlobal";
import Secaonavbar from "../components/navbar/Secaonavbar";

const Contato = () => {
    return (
        <div className="contato-principal ">
            {/* Header */}
            <div className="header">
                <HeaderContato/>
            </div>
            
            {/* NavBar */}
            <div className="nav-bar">
                <Secaonavbar/>
            </div>
            
          
            {/* Conteudo da Pagina*/}
          

            {/* Footer */}
            <div className="footer-contato" >
                <FooterGlobal/>
            </div>

        </div>
    )
}

export default Contato;