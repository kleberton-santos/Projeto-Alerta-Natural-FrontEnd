import "../../assets/Css/previsao/card-previsao.css";
import clearDay from "../../assets/images/previsao-icones/2nd-set-color/clear-day.png";

const CardPrevisao = (data) => {
    const infos = data.data;

    return (
        <div className="card-moderno">
            <div className="card-header">
                <p className="card-localizacao">São Paulo, Brasil</p>
                <p className="card-data">{infos.currentConditions.datetime}</p>
            </div>
            <div className="card-body">
                <div className="card-temperatura">
                    <img className="card-icone" src={clearDay} alt={`icone ${infos.currentConditions.conditions}`} />
                    <h2 className="card-temp">{infos.currentConditions.temp}ºC</h2>
                </div>
                <p className="card-condicao">{infos.currentConditions.conditions}</p>
                <p className="card-descricao">{infos.days[0].description}</p>
                <div className="card-detalhes">
                    <p>Sensação Térmica: {infos.currentConditions.feelslike}ºC</p>
                    <p>Mínima: {Math.round(infos.days[0].tempmin)}ºC</p>
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