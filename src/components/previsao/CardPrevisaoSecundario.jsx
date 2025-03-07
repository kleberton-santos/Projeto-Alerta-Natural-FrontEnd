import React from "react";
import "../../assets/Css/previsao/card-previsao-secundario.css";

// Importação dos ícones
import clearDay from "../../assets/images/icones-previsao/clear-day.png";
import clearNight from "../../assets/images/icones-previsao/clear-night.png";
import rain from "../../assets/images/icones-previsao/rain.png";
import cloudy from "../../assets/images/icones-previsao/cloudy.png";
import partlyCloudyDay from "../../assets/images/icones-previsao/partly-cloudy-day.png";
import partlyCloudyNight from "../../assets/images/icones-previsao/partly-cloudy-night.png";
import snow from "../../assets/images/icones-previsao/snow.png";
import thunderstorm from "../../assets/images/icones-previsao/thunder.png";
import hail from "../../assets/images/icones-previsao/hail.png";
import wind from "../../assets/images/icones-previsao/wind.png";

const CardPrevisaoSecundario = ({ diaAtual, horaAtual }) => {

    // Se horaAtual for null, usamos os dados de diaAtual
    const dados = horaAtual || diaAtual;

    if (!dados) {
        return <p>Carregando dados...</p>; // Evita erro caso os dados sejam undefined
    }

    // 🔹 Função para normalizar a condição climática
    const normalizarCondicao = (condicao) => {
        return condicao
            .toLowerCase() // Converte para minúsculas
            .replace(/,/g, "") // Remove vírgulas
            .trim(); // Remove espaços extras
    };

    // 🔹 Mapeamento de condições climáticas do português para o inglês
    const traducaoCondicoes = {
        "limpo": "clear-day",
        "céu limpo": "clear-day",
        "noite limpa": "clear-night",
        "parcialmente nublado": "partly-cloudy-day",
        "nublado": "cloudy",
        "chuva": "rain",
        "neve": "snow",
        "trovoada": "thunderstorm",
        "granizo": "hail",
        "vento": "wind",
        "chuva nublado": "rain", // Nova condição com espaço
    };

    // 🔹 Mapeamento dos ícones
    const iconesPrevisao = {
        "clear-day": clearDay,
        "clear-night": clearNight,
        "rain": rain,
        "cloudy": cloudy,
        "partly-cloudy-day": partlyCloudyDay,
        "partly-cloudy-night": partlyCloudyNight,
        "snow": snow,
        "thunderstorm": thunderstorm,
        "hail": hail,
        "wind": wind,
    };

    // 🔹 Normaliza a condição climática e converte para inglês
    const condicaoNormalizada = normalizarCondicao(dados.conditions);
    const condicaoIngles = traducaoCondicoes[condicaoNormalizada] || "clear-day";

    // 🔹 Obtendo o ícone correspondente
    const iconeAtual = iconesPrevisao[condicaoIngles] || clearDay;

    // 🔹 Função para formatar a data no formato brasileiro (DD/MM/AAAA)
    const formatarDataBrasileira = (dataString) => {
        const data = new Date(dataString);
        return data.toLocaleDateString("pt-BR"); // Formato brasileiro
    };

    return (
        <div className="cards">
            <div className="cartao">
                <header className="cartao-sec-header">
                    {/* Exibe a data ou hora dependendo dos dados */}
                    <p className="cartao-sec-text">
                        {horaAtual
                            ? horaAtual.datetime.substring(0, 5) // Exibe a hora (HH:MM)
                            : formatarDataBrasileira(diaAtual.datetime) // Exibe a data formatada
                        }
                    </p>
                </header>
                <div className="cartao-sec-body">
                    <div className="cartao-sec-detalhes">
                        <div className="cartao-temperatura">
                            <img src={iconeAtual} alt={`Ícone ${condicaoIngles}`} className="cartao-icone" />
                            <h2 className="cartao-temp">{dados.temp}ºC</h2>
                        </div>
                        <div className="cartao-info-direita">
                            <p className="cartao-condicao">{dados.conditions}</p>
                            <div className="cartao-detalhes">
                                <p>Umidade: {dados.humidity}%</p>
                                <p>Vento: {dados.windspeed} km/h</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardPrevisaoSecundario;