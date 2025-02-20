import React from "react";
import "../../src/index.css";
import "../assets/css/contato/Contato.css";
import HeaderContato from "../components/header/HeaderContato";
import FooterGlobal from "../components/footer/FooterGlobal";
import Secaonavbar from "../components/navbar/Secaonavbar";

const Contato = () => {
    return (
        <div className="contato-principal">
            {/* Header */}
            <div className="header">
                <HeaderContato />
            </div>
            
            {/* NavBar */}
            <div className="nav-bar">
                <Secaonavbar />
            </div>
            
            {/* Conteúdo da Página */}
            <div className="contato-container">
                <div className="contato-layout">
                    
                    {/* Formulário de Contato */}
                    <div className="formulario-contato">
                        <h2>Mande uma mensagem para nós</h2>

                        <div className="form-group">
                            <label htmlFor="nome">Nome:</label>
                            <input type="text" id="nome" name="nome" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">E-mail:</label>
                            <input type="email" id="email" name="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Tel:</label>
                            <input type="telefonel" name="telefone"/>
                        </div>

                        <div className="form-group mensagem">
                            <label htmlFor="mensagem">Mensagem:</label>
                            <textarea id="mensagem" name="mensagem"rows="10" cols="50"></textarea>
                        </div>

                        <button type="submit" className="btn-enviar">Enviar Mensagem</button>
                    </div>

                    <div className="info-contato">
                        <h2>CONTATO</h2>

                        <p>Telefone:</p>
                        <span>(99) 99999-9999</span>

                        <p>E-mail:</p>
                        <span>seuemail@example.com</span>

                        <p className="instagram">Instagram:</p>
                        <span>@seuinsta</span>

                        <p>Facebook:</p>
                        <span>@seuFacebook</span>

                        <p className="endereco">Nosso endereço:</p>
                        <span>Rua Exemplo, 123 - Cidade</span>

                        <p>
                                <strong>CEP:</strong> <span>12345-678</span>
                        </p>        


                        {/* Input de Ver no Mapa */}
                        <input type="button" value="Ver no Mapa" className="ver-no-mapa" />
                    </div>

              </div>
            </div>
            
            {/* Footer */}
            <div className="footer-contato">
                <FooterGlobal />
            </div>
        </div>
    );
};

export default Contato;
