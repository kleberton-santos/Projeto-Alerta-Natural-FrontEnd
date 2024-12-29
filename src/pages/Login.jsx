import React from "react";
import "../../src/index.css"
import "../assets/Css/login/Login.css"
import HeaderLogin from "../components/header/HeaderLogin";
import FooterGlobal from "../components/footer/FooterGlobal";
import logo from "../assets/images/logo.webp";

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
            
          
            {/* Logo */}
            <div className="container mt-5">
                <div className="row">
                    {/* Coluna do Logotipo */}
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <div className="logo-login">
                            <img src={logo} alt="Logotipo alerta natural" className="logo-login-principal" />
                        </div>
                    </div>

                    {/* Coluna do Formulário */}
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <form className="w-75">
                            <h3 className="label-login mb-5 text-center">Login</h3>
                            <div className="label-name mb-3 text-center">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control form-control-sm mx-auto" 
                                    id="email" 
                                    placeholder="Digite seu email" 
                                />
                            </div>
                            <div className="label-name mb-3 text-center">
                                <label htmlFor="password" className="form-label">Senha</label>
                                <input 
                                    type="password" 
                                    className="form-control form-control-sm mx-auto" 
                                    id="password" 
                                    placeholder="Digite sua senha" 
                                />
                            </div>
                            <button type="submit" className="btn btn-secondary w-100 mt-3">
                                Entrar
                            </button>
                            <div className="text-center mt-3">
                                <a href="#">Cadastrar-se</a>
                            </div>
                            <button type="button" className="btn btn-outline-secondary w-100 mt-3 d-flex align-items-center justify-content-center">
                                <i className="fab fa-google me-2"></i> {/* Ícone do Google */}
                                Entrar com Google
                            </button>
                            <div className="text-center mt-3">
                                <a href="#">Esqueceu sua senha?</a>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
          

            {/* Footer */}
            <div className="footer-login mt-5" >
                <FooterGlobal/>
            </div>

        </div>
    )
}

export default Login;