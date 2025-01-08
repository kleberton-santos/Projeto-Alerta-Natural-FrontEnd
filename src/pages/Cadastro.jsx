import React from "react";
import "../../src/index.css"
import "../assets/Css/cadastro/Cadastro.css"
import HeaderCadastro from "../components/header/HeaderCadastro";
import FooterGlobal from "../components/footer/FooterGlobal";
import { CadastroForm } from "../components/cadastro/CadastroForm";

const Cadastro = () => {
    return (
        <div className="home-principal d-flex flex-column min-vh-100">
            {/* Header */}
            <div className="header">
                <HeaderCadastro />
            </div>

            {/* NavBar */}
            <div className="nav-bar d-flex justify-content-center align-items-center border border-primary" style={{ height: "55px"}}>
                <h2>NavBar</h2>
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