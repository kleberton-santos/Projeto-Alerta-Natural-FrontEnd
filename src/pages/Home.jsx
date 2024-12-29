import React from "react";
import "../../src/index.css"
import "../assets/Css/home/Home.css"
import HeaderHome from "../components/header/HeaderHome";
import FooterGlobal from "../components/footer/FooterGlobal";

const Home = () => {
    return (
        <div className="home-principal ">
            {/* Header */}
            <div className="header">
                <HeaderHome/>
            </div>
            
            {/* NavBar */}
            <div className="nav-bar d-flex justify-content-center align-items-center border border-primary" style={{ height: "55px", width: "100%", borderStyle: "solid" }}>
                <h2>NavBar</h2>
            </div>
            
            {/* Banner */}
            <div className="banner-home">
                <div className="banner-home-tela">
                    {/* Conteúdo do Banner */}
                </div>
            </div>
            
            {/* Texto Centralizado */}
            <div className="text-center-home">
                <p>Fique Informado. Esteja Preparado.<br></br>
                Explore as condições climáticas em tempo real e tome medidas para enfrentar desastres <br></br>naturais.</p>
            </div>
            <div className="card-home container mt-4">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Card 1</h5>
                                <p className="card-text">Conteúdo do primeiro card.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Card 2</h5>
                                <p className="card-text">Conteúdo do segundo card.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Card 3</h5>
                                <p className="card-text">Conteúdo do terceiro card.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="footer-home mt-5" >
                <FooterGlobal/>
            </div>

        </div>
    )
}

export default Home;