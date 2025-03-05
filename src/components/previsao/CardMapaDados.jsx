import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Importe o Leaflet diretamente
import "leaflet/dist/leaflet.css";
import "../../assets/Css/previsao/CardMapaDados.css";

// Importe as imagens dos ícones diretamente
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Corrija o problema de ícones ausentes no Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
});

const CardMapaDados = ({ infos }) => {
    // Coordenadas da cidade (latitude e longitude)
    const position = [infos.latitude, infos.longitude];

    return (
        <div className="card-mapa-dados">
            {/* Mapa Interativo */}
            <div className="mapa-container-mapa">
                <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "215px", width: "100%" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position}>
                        <Popup>{infos.resolvedAddress}</Popup>
                    </Marker>
                </MapContainer>
            </div>

            {/* Dados Climáticos Adicionais */}
            <div className="dados-adicionais">
                <ul>
                    <li><strong>Nascer do Sol:</strong> {infos.days[0].sunrise}</li>
                    <li><strong>Pôr do Sol:</strong> {infos.days[0].sunset}</li>
                    <li><strong>Índice UV:</strong> {infos.currentConditions.uvindex}</li>
                    <li><strong>Direção do Vento:</strong> {infos.currentConditions.winddir}°</li>
                </ul>
            </div>
        </div>
    );
};

export default CardMapaDados;