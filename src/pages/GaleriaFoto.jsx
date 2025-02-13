import React from "react";
import "../../src/index.css"
import "../assets/Css/contato/Contato.css"
import HeaderContato from "../components/header/HeaderGaleriaFoto";
import FooterGlobal from "../components/footer/FooterGlobal";
import Secaonavbar from "../components/navbar/Secaonavbar";
import GaleriaFotos from "../components/feed/GaleriaFotos"

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
            
          
            <div className="conteudo-galeria">
                <GaleriaFotos />
            </div>
          

            {/* Footer */}
            <div className="footer-contato" >
                <FooterGlobal/>
            </div>

        </div>
    )
}

export default Contato;