import React from "react";
import "../../src/index.css"
import "../assets/Css/cadastro/Cadastro.css"
import HeaderCadastro from "../components/header/HeaderCadastro";
import FooterGlobal from "../components/footer/FooterGlobal";
import { CadastroForm } from "../components/cadastro/CadastroForm";
import Secaonavbar from "../components/navbar/Secaonavbar";

const Cadastro = () => {
    return (
        <div className="home-principal d-flex flex-column min-vh-100">
            {/* Header */}
            <div className="header">
                <HeaderCadastro />
            </div>

            {/* NavBar */}
            <div className="nav-bar">
                <Secaonavbar/>
            </div>


            {/* Conteudo da Pagina*/}
            <div className="flex-grow-1">
                <CadastroForm />
            </div>


            {/* Footer */}
            <div className="footer" >
                <FooterGlobal />
            </div>

        </div>
    )
}

export default Cadastro;