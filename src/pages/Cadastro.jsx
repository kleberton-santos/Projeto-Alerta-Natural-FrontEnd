import React from "react";
import "../../src/index.css"
import "../assets/Css/cadastro/Cadastro.css"
import HeaderCadastro from "../components/header/HeaderCadastro";
import FooterGlobal from "../components/footer/FooterGlobal";
import { CadastroForm } from "../components/cadastro/CadastroForm";

const Cadastro = () => {
    return (
        <div className="home-principal ">
            {/* Header */}
            <div className="header">
                <HeaderCadastro />
            </div>

            {/* NavBar */}
            <div className="nav-bar d-flex justify-content-center align-items-center border border-primary" style={{ height: "55px", width: "100%", borderStyle: "solid" }}>
                <h2>NavBar</h2>
            </div>


            {/* Conteudo da Pagina*/}
            <div>
                <CadastroForm />
            </div>


            {/* Footer */}
            <div className="footer mt-5" >
                <FooterGlobal />
            </div>

        </div>
    )
}

export default Cadastro;