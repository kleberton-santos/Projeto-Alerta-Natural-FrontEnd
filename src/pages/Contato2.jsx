import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import "../../src/index.css";
import "../assets/css/contato2/Contato2.css";
import HeaderContato from "../components/header/HeaderContato";
import FooterGlobal from "../components/footer/FooterGlobal";
import Secaonavbar from "../components/navbar/Secaonavbar";
import Mapa from "../mapa/Mapa";

const Contato2 = () => {
    const form = useRef();
    const [status, setStatus] = useState('');

    const enviarEmail = (e) => {
        e.preventDefault();

        // Coleta os dados do formulário
        const formData = {
            to_email: "disleneportela1@gmail.com", // E-mail que receberá a mensagem
            to_name: "Equipe Alerta Natural", // Nome da empresa
            from_name: document.getElementById("nome").value, // Nome de quem preencheu
            email: document.getElementById("email").value, // E-mail de quem preencheu
            telefone: document.getElementById("telefone").value, // Telefone de quem preencheu
            message: document.getElementById("mensagem").value, // Mensagem
        };

        // Envia o formulário para o EmailJS usando o método emailjs.send
        emailjs
            .send(
                "service_b41f604",  // ID do serviço
                "template_vn32ljh",  // ID do template
                formData,            // Dados do formulário
                "zLy6oLB04ZDJDZ40k"  // Sua chave pública
            )
            .then(
                (result) => {
                    console.log("E-mail enviado com sucesso!", result.text);
                    setStatus('Mensagem enviada com sucesso!');
                },
                (error) => {
                    console.log("Erro ao enviar o e-mail:", error);  // Exibindo o erro
                    setStatus(`Erro ao enviar a mensagem:`);  // Exibindo a mensagem de erro para o usuário
                }
            );

        // Limpa o formulário após o envio
        e.target.reset();
    };

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

                        <form ref={form} onSubmit={enviarEmail}>
                            <div className="form-group">
                                <label htmlFor="nome">Nome:</label>
                                <input type="text" id="nome" name="from_name" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">E-mail:</label>
                                <input type="email" id="email" name="from_email" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="telefone">Telefone:</label>
                                <input type="text" id="telefone" name="from_phone" required />
                            </div>

                            <div className="form-group mensagem">
                                <label htmlFor="mensagem">Mensagem:</label>
                                <textarea id="mensagem" name="message" rows="5" required></textarea>
                            </div>
                            
                            <button type="submit" className="btn-enviar">Enviar Mensagem</button>
                        </form>

                        {/* Mensagem de status */}
                        {status && <div className="status-message">{status}</div>}
                    </div>

                    {/* Info de Contato */}
                    <div className="info-contato">
                        <h2>CONTATO</h2>
                        <p>Telefone:</p>
                        <span>(11) 97559-1458</span>

                        <p>E-mail:</p>
                        <span>alertanatural@gmail.com.br</span>

                        <p className="instagram">Instagram:</p>
                        <span>@alertanatural</span>

                        <p>Facebook:</p>
                        <span>Alerta Natural</span>

                        <p className="endereco">Nosso endereço:</p>
                        <span>AV: Paulista, 1578 Bela Vista</span>

                        <p>
                            <span>CEP:</span> <span>01310-200</span>
                        </p>

                        <Mapa /> {/* Componente que renderiza o botão "Ver no Mapa" */}
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

export default Contato2;
