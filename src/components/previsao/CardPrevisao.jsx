import "../../assets/Css/previsao/card-previsao.css";
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

const CardPrevisao = ({ data }) => {
    if (!data || !data.currentConditions) {
        return <p>Carregando dados...</p>; // Evita erro caso data seja undefined
    }

    const infos = data;

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

    // 🔹 Obtendo a condição climática em português e convertendo para inglês
    const condicaoPortugues = infos.currentConditions.conditions.trim().toLowerCase();
    const condicaoIngles = traducaoCondicoes[condicaoPortugues] || "clear-day"; // Se não encontrar, usa 'clear-day'

    console.log("Condição climática original:", condicaoPortugues);
    console.log("Condição traduzida:", condicaoIngles);

    // 🔹 Obtendo o ícone correspondente
    const iconeAtual = iconesPrevisao[condicaoIngles] || clearDay;

    return (
        <div className="card-moderno">
            <div className="card-header">
                {/* Exibe o nome da cidade e o país */}
                <p className="card-localizacao">{infos.resolvedAddress}</p>
                <p className="card-data">{infos.currentConditions.datetime}</p>
            </div>
            <div className="card-body">
                <div className="card-temperatura">
                    <img className="card-icone" src={iconeAtual} alt={`icone ${infos.currentConditions.conditions}`} />
                    <h2 className="card-temp">{infos.currentConditions.temp}ºC</h2>
                </div>
                <div className="card-info-direita">
                    <p className="card-condicao">{infos.currentConditions.conditions}</p>
                    <div className="card-detalhes">
                        <p>Sensação Térmica: {infos.currentConditions.feelslike}ºC</p>
                    </div>
                </div>
                <div className="card-descricao-principal">
                    <p className="card-descricao-sub">{infos.days[0].description}</p>
                    <p className="card-descricao-sub">Mínima: {Math.round(infos.days[0].tempmin)}ºC</p>
                </div>
            </div>
            <div className="card-footer">
                <ul className="lista-detalhes">
                    <li>
                        <span>Vento</span>
                        <span>{infos.currentConditions.windspeed} km/h</span>
                    </li>
                    <li>
                        <span>Umidade</span>
                        <span>{infos.currentConditions.humidity}%</span>
                    </li>
                    <li>
                        <span>Visibilidade</span>
                        <span>{infos.currentConditions.visibility} km</span>
                    </li>
                    <li>
                        <span>Pressão</span>
                        <span>{infos.currentConditions.pressure} hPa</span>
                    </li>
                    <li>
                        <span>Nuvens</span>
                        <span>{infos.currentConditions.cloudcover}%</span>
                    </li>
                    <li>
                        <span>Chuva</span>
                        <span>{infos.currentConditions.precip !== null ? `${infos.currentConditions.precip} mm` : "Sem previsão"}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default CardPrevisao;