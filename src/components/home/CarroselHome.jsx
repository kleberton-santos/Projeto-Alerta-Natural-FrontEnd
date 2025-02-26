import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/Css/home/CarroselHome.css"; // Certifique-se que está importando o CSS corretamente

// Importe as imagens locais
import floodImage from "../../assets/images/flood.jpg";
import stormImage from "../../assets/images/storm.jpg";
import fireImage from "../../assets/images/fire.jpg";
import defaultImage from "../../assets/images/default.jpg";
import rainImage from "../../assets/images/chuva.jpg"; // Imagem para previsão de chuvas

const CarroselHome = () => {
  const [alerts, setAlerts] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [nextEvent, setNextEvent] = useState(null); // Próximo evento (alerta ou chuva)
  const API_KEY = "092ed86ddb49407d80f164549252502"; // Chave da WeatherAPI

  // Mapeamento de tipos de alerta para imagens
  const alertImageMap = {
    flood: floodImage,
    storm: stormImage,
    fire: fireImage,
    default: defaultImage,
    rain: rainImage, // Imagem para previsão de chuvas
  };

  // Função para obter a imagem com base no tipo de alerta
  const getAlertImage = (headline) => {
    const lowerCaseHeadline = headline.toLowerCase();
    if (lowerCaseHeadline.includes("flood")) return alertImageMap.flood;
    if (lowerCaseHeadline.includes("storm")) return alertImageMap.storm;
    if (lowerCaseHeadline.includes("fire")) return alertImageMap.fire;
    if (lowerCaseHeadline.includes("rain")) return alertImageMap.rain; // Chuvas fortes
    return alertImageMap.default; // Imagem padrão
  };

  // Busca alertas climáticos
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const cities = ["São Paulo", "Rio de Janeiro", "Brasília"];
        const alertPromises = cities.map(city =>
          axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&alerts=yes`)
        );
        const responses = await Promise.all(alertPromises);
        const alertsData = responses.map(response => response.data.alerts.alert);

        // Filtra alertas ativos
        const activeAlerts = alertsData
          .filter(alerts => alerts && alerts.length > 0)
          .flatMap(alerts => alerts);

        setAlerts(activeAlerts.slice(0, 3)); // Limita a exibição a 3 alertas
      } catch (error) {
        console.error("Erro ao buscar alertas climáticos:", error);
        setAlerts([]); // Limpa os alertas em caso de erro
      }
    };

    fetchAlerts();
  }, []);

  // Busca previsão do tempo (chuvas fortes)
  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const cities = ["São Paulo", "Rio de Janeiro", "Brasília"];
        const forecastPromises = cities.map(city =>
          axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=4`) // Busca previsão para 4 dias
        );
        const responses = await Promise.all(forecastPromises);
        const forecastData = responses.map(response => ({
          city: response.data.location.name,
          forecast: response.data.forecast.forecastday.map(day => ({
            date: day.date,
            rain: day.day.totalprecip_mm, // Chuva total em mm
            condition: day.day.condition.text,
          })),
        }));

        // Filtra cidades com previsão de chuvas fortes (ex.: mais de 10mm) nos próximos 4 dias
        const heavyRainCities = forecastData.map(city => ({
          ...city,
          forecast: city.forecast.filter(day => day.rain > 10), // Filtra dias com chuva forte
        }));

        setForecastData(heavyRainCities);
      } catch (error) {
        console.error("Erro ao buscar previsão do tempo:", error);
        setForecastData([]); // Limpa os dados em caso de erro
      }
    };

    fetchForecast();
  }, []);

  // Determina o próximo evento (alerta ou chuva)
  useEffect(() => {
    if (alerts.length > 0) {
      // Se houver alertas, usa o primeiro alerta como próximo evento
      setNextEvent({
        type: "alert",
        data: alerts[0],
      });
    } else if (forecastData.length > 0) {
      // Se não houver alertas, busca a próxima previsão de chuva forte
      const nextRainEvent = forecastData
        .flatMap(city =>
          city.forecast.map(day => ({
            city: city.city,
            date: day.date,
            rain: day.rain,
            condition: day.condition,
          }))
        .sort((a, b) => new Date(a.date) - new Date(b.date))[0]); // Ordena por data e pega o primeiro

      if (nextRainEvent) {
        setNextEvent({
          type: "rain",
          data: nextRainEvent,
        });
      } else {
        setNextEvent(null); // Não há eventos futuros
      }
    } else {
      setNextEvent(null); // Não há eventos futuros
    }
  }, [alerts, forecastData]);

  // Slides a serem exibidos
  const slides = [];

  if (alerts.length > 0) {
    // Se houver alertas, exibe os alertas
    slides.push(...alerts.slice(0, 3));
  } else if (nextEvent) {
    // Se não houver alertas, mas houver um próximo evento (alerta ou chuva)
    if (nextEvent.type === "alert") {
      slides.push(nextEvent.data);
    } else if (nextEvent.type === "rain") {
      slides.push({
        headline: `Previsão de chuvas fortes em ${nextEvent.data.city}`,
        areas: [nextEvent.data.city],
        severity: "Alta",
        description: `Chuva intensa prevista para ${nextEvent.data.date}: ${nextEvent.data.rain}mm. Condição: ${nextEvent.data.condition}.`,
        image: alertImageMap.rain,
      });
    }
  } else {
    // Se não houver nada, exibe um slide padrão
    slides.push({
      headline: "Nenhum alerta climático no momento",
      areas: ["N/A"],
      severity: "N/A",
      description: "Não há alertas climáticos ou previsão de chuvas fortes nos próximos dias.",
      image: defaultImage,
    });
  }

  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{
        maxWidth: "800px",
        maxHeight: "400px",
        width: "100%",
        height: "auto",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <div className="carousel-inner" style={{ width: "100%", height: "100%" }}>
        {slides.map((slide, index) => {
          const { headline, areas, severity, description, image } = slide;

          return (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={image || getAlertImage(headline)}
                className="d-block w-100"
                alt={`Slide ${index + 1}`}
                style={{ objectFit: "cover", height: "100%" }}
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>{headline || "Previsão do Tempo"}</h5>
                <p>{`Áreas afetadas: ${areas ? areas.join(", ") : "N/A"}`}</p>
                <p>{`Gravidade: ${severity || "N/A"}`}</p>
                <p>{description || "Descrição não disponível."}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Próximo</span>
      </button>
    </div>
  );
};

export default CarroselHome;