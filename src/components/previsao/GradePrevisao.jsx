import React from "react";
import humidity from "../../assets/images/icones-dados-climaticos/humidity.png";
import uvindex from "../../assets/images/icones-dados-climaticos/uvindex.png";
import pressure from "../../assets/images/icones-dados-climaticos/pressure.png";
import visibility from "../../assets/images/icones-dados-climaticos/visibility.png";
import precip from "../../assets/images/icones-dados-climaticos/precip.png";
import cloudcover from "../../assets/images/icones-dados-climaticos/cloudcover.png";
import windspeed from "../../assets/images/icones-dados-climaticos/windspeed.png";
import temp from "../../assets/images/icones-dados-climaticos/temp.png";
import conditions from "../../assets/images/icones-dados-climaticos/conditions.png";
import dew from "../../assets/images/icones-dados-climaticos/dew.png";
import feelslike from "../../assets/images/icones-dados-climaticos/feelslike.png";
import winddir from "../../assets/images/icones-dados-climaticos/winddir.png";
import "../../assets/Css/previsao/GradePrevisao.css"; // Importe o CSS específico para o componente

const GradePrevisao = ({ dados }) => {
    // Verifica se os dados estão corretos
    if (!dados || !dados.days || !Array.isArray(dados.days) || dados.days.length === 0 || !dados.days[0].hours) {
        console.log("Dados inválidos ou ausentes:", dados);
        return <p>Carregando dados...</p>; // Mensagem de fallback
    }

    console.log("Dados recebidos:", dados); // Log para depuração

    // Lista de informações que cada card deve exibir
    const informacoes = [
        { label: "Umidade", key: "humidity", unidade: "%", icone: humidity },
        { label: "Índice UV", key: "uvindex", unidade: "", icone: uvindex },
        { label: "Pressão", key: "pressure", unidade: " hPa", icone: pressure },
        { label: "Visibilidade", key: "visibility", unidade: " km", icone: visibility },
        { label: "Precipitação", key: "precip", unidade: " mm", icone: precip },
        { label: "Cobertura de Nuvens", key: "cloudcover", unidade: "%", icone: cloudcover },
        { label: "Velocidade do Vento", key: "windspeed", unidade: " km/h", icone: windspeed },
        { label: "Temperatura", key: "temp", unidade: "ºC", icone: temp },
        { label: "Condição", key: "conditions", unidade: "", icone: conditions },
        { label: "Ponto de Orvalho", key: "dew", unidade: "ºC", icone: dew },
        { label: "Sensação Térmica", key: "feelslike", unidade: "ºC", icone: feelslike },
        { label: "Direção do Vento", key: "winddir", unidade: "°", icone: winddir },
    ];

    // Extrai os dados horários do primeiro dia
    const horasDoDia = dados.days[0].hours;
    console.log("Horas do dia:", horasDoDia); // Log para depuração

    return (
        <div className="grade-previsao">
            {/* Cria 3 linhas */}
            {[...Array(3)].map((_, linhaIndex) => (
                <div className="linha" key={linhaIndex}>
                    {/* Cria 4 colunas em cada linha */}
                    {[...Array(4)].map((_, colunaIndex) => {
                        // Calcula o índice do dado correspondente
                        const indiceDado = linhaIndex * 4 + colunaIndex;
                        const horaAtual = horasDoDia[indiceDado];
                        const informacao = informacoes[indiceDado % informacoes.length];

                        console.log(`Card ${indiceDado}:`, horaAtual); // Log para depuração

                        return (
                            <div className="coluna" key={colunaIndex}>
                                {/* Renderiza um card em cada célula */}
                                <div className="card-grade">
                                    {horaAtual ? (
                                        <>
                                            <div className="card-grade-icone">
                                                <img src={informacao.icone} alt={informacao.label} />
                                            </div>
                                            <p>
                                                <strong>{informacao.label}:</strong>{" "}
                                                {horaAtual[informacao.key]}
                                                {informacao.unidade}
                                            </p>
                                        </>
                                    ) : (
                                        <p>Sem dados</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default GradePrevisao;