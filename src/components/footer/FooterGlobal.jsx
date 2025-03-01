import React from "react";
import "../../assets/Css/footer/Footer.css"
import facebook from "../../assets/images/footer/facebook.png"
import instagram from "../../assets/images/footer/instagram.png"
import twiter from "../../assets/images/footer/twiter.png"

const FooterGlobal = () => {
    return (
        <div className="footer-global text-white position-relative w-100">
            <div className="conta-telefone position-absolute start-50 translate-middle text-center">
                <label htmlFor="">Contato no telefone</label>
            </div>
            <div className="telefone position-absolute start-50 translate-middle text-center mt-4">
                <label htmlFor="">(11) 5566-8899</label>
            </div>
            <div className="direitos-autorais position-absolute start-50 translate-middle-x text-center">
                <p>© 2024 Desastres Climáticos. Todos os direitos reservados.</p>
            </div>
            <div className="icons-social position-absolute bottom-0 start-0 d-flex gap-3">
                <div className="icon-item text-center">
                    <p>Facebook</p>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src={facebook} alt="Facebook" className="img-fluid" />
                    </a>
                </div>
                <div className="icon-item text-center">
                    <p>Instagram</p>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src={instagram} alt="Instagram" className="img-fluid" />
                    </a>
                </div>
                <div className="icon-item text-center">
                    <p>Twitter</p>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src={twiter} alt="Twitter" className="img-fluid" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default FooterGlobal;
