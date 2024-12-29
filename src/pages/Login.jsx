import React from "react";
import "../../src/index.css"
import "../assets/Css/login/Login.css"
import HeaderLogin from "../components/header/HeaderLogin";
import FooterGlobal from "../components/footer/FooterGlobal";

const Login = () => {
    return (
        <div className="home-principal ">
            {/* Header */}
            <div className="header">
                <HeaderLogin/>
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

export default Login;