import React, { useState } from "react";
import CardPrevisao from "./CardPrevisao";
import CardPrevisaoSecundario from "./CardPrevisaoSecundario";
import NavPrevisao from "./NavPrevisao";
import CardMapaDados from "./CardMapaDados";
import "../../assets/Css/previsao/Previsao.css";

const SecaoPrevisao = ({ infosHoje }) => {
    const [pagina, setPagina] = useState("hoje");

    return (
        <div>
            {/* Usando o componente NavPrevisao */}
            <NavPrevisao setPagina={setPagina} />

            <div className="container previsao-container">
                {/* Primeira linha: CardPrevisao e CardMapaDados */}
                <div className="row primeira-linha mb-4">
                    <div className="col-md-6 card-principal">
                        {pagina === "hoje" && infosHoje && (
                            <>
                                <p style={{ color: "white", textAlign: "center" }}>Hoje</p>
                                <CardPrevisao data={infosHoje} />
                            </>
                        )}
                    </div>
                    <div className="col-md-6 card-mapa-dados">
                        {pagina === "hoje" && infosHoje && <CardMapaDados infos={infosHoje} />}
                    </div>
                </div>

                {/* Segunda linha: CardPrevisaoSecundario */}
                {pagina === "hoje" && infosHoje && (
                    <div className="row segunda-linha mb-4">
                        {infosHoje.days[0].hours
                            .filter((info) => infosHoje.currentConditions.datetime < info.datetime)
                            .slice(0, 2) // Apenas 2 cards na segunda linha
                            .map((info, index) => (
                                <div className="col-md-6" key={index}>
                                    <CardPrevisaoSecundario diaAtual={infosHoje} horaAtual={info} />
                                </div>
                            ))}
                    </div>
                )}

                {/* Outras páginas (amanhã, 7 dias, 15 dias) */}
                {pagina === "amanha" && infosHoje && (
                    <div className="row duas-colunas">
                        {infosHoje.days[1].hours.slice(0, 24).map((info, index) => (
                            <div className="col-md-6" key={index}>
                                <CardPrevisaoSecundario horaAtual={info} diaAtual={infosHoje} />
                            </div>
                        ))}
                    </div>
                )}

                {pagina === "sete" && infosHoje && (
                    <div className="row duas-colunas">
                        {infosHoje.days.slice(2, 9).map((info, index) => (
                            <div className="col-md-6" key={index}>
                                <CardPrevisaoSecundario horaAtual={null} diaAtual={info} />
                            </div>
                        ))}
                    </div>
                )}

                {pagina === "quinze" && infosHoje && (
                    <div className="row duas-colunas">
                        {infosHoje.days.slice(2, 19).map((info, index) => (
                            <div className="col-md-6" key={index}>
                                <CardPrevisaoSecundario horaAtual={null} diaAtual={info} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SecaoPrevisao;