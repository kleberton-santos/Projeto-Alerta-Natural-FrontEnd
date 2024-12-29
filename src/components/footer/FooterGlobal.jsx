import React from "react";
import "../../assets/Css/footer/Footer.css"
import facebook from "../../assets/images/footer/facebook.png"
import instagram from "../../assets/images/footer/instagram.png"
import twiter from "../../assets/images/footer/twiter.png"

const FooterGlobal = () => {

    return (
        <div className="footer-global">
            <div className="conta-telefone">
                <label htmlFor="">Contato no telefone</label>
            </div>
            <div className="telefone">
                <label htmlFor="">(11) 5566-8899</label>
            </div>
            <div className="direitos-autorais">
                <p>© 2024 Desastres Climáticos. Todos os direitos reservados.</p>
            </div>
            <div className="icons-social">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src={facebook} alt="Facebook" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src={instagram} alt="Instagram" />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                    <img src={twiter} alt="Twitter" />
                </a>
            </div>

           
        </div>
    )

}

export default FooterGlobal;