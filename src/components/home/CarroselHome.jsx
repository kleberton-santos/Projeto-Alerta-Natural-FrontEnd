import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/Css/home/CarroselHome.css"; // Certifique-se que está importando o CSS corretamente

// Importe as imagens locais
import floodImage from "../../assets/images/flood.jpg"; // Imagem para alagamentos
import stormImage from "../../assets/images/storm.jpg"; // Imagem para tempestades
import fireImage from "../../assets/images/fire.jpg"; // Imagem para incêndios
import defaultImage from "../../assets/images/default.jpg"; // Imagem padrão
import rainImage from "../../assets/images/chuva.jpg"; // Imagem para chuvas
import cloudsImage from "../../assets/images/clouds.jpg"; // Imagem para nuvens
import clearSkyImage from "../../assets/images/clear-sky.jpg"; // Imagem para céu limpo
import snowImage from "../../assets/images/snow.jpg"; // Imagem para neve
import mistImage from "../../assets/images/mist.jpg"; // Imagem para névoa
import tornadoImage from "../../assets/images/tornado.jpg"; // Imagem para tornados

const CarroselHome = () => {
  const [alerts, setAlerts] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [nextEvent, setNextEvent] = useState(null); // Próximo evento (alerta ou chuva)
  const API_KEY = "da002ceb24aa1c9199ca1e4109e591a1"; // Chave da OpenWeatherMap

  // Mapeamento de tipos de alerta para imagens
  const alertImageMap = {
    flood: floodImage, // Alagamentos
    storm: stormImage, // Tempestades
    fire: fireImage, // Incêndios
    rain: rainImage, // Chuvas
    clouds: cloudsImage, // Nuvens
    clear: clearSkyImage, // Céu limpo
    snow: snowImage, // Neve
    mist: mistImage, // Névoa
    tornado: tornadoImage, // Tornados
    default: defaultImage, // Imagem padrão
  };

  // Objeto de tradução
  const translations = {
    Rain: "Chuva",
    Clouds: "Grande volume de nuvens risco de chuvas",
    Clear: "Céu limpo",
    Thunderstorm: "Risco de Tempestade",
    Snow: "Neve",
    Mist: "Névoa",
    Smoke: "Fumaça",
    Haze: "Neblina",
    Dust: "Poeira",
    Fog: "Nevoeiro",
    Sand: "Areia",
    Ash: "Cinzas",
    Squall: "Rajada de vento",
    Tornado: "Tornado",
    Drizzle: "Chuvisco",
  };

  // Função para traduzir termos
  const translate = (term) => {
    return translations[term] || term; // Retorna a tradução ou o próprio termo se não houver tradução
  };

  // Função para obter a imagem com base no tipo de alerta
  const getAlertImage = (headline) => {
    if (!headline) return alertImageMap.default; // Retorna a imagem padrão se headline for undefined ou null

    const lowerCaseHeadline = headline.toLowerCase();

    // Mapeia os eventos para as imagens correspondentes
    if (lowerCaseHeadline.includes("flood")) return alertImageMap.flood; // Alagamentos
    if (lowerCaseHeadline.includes("storm")) return alertImageMap.storm; // Tempestades
    if (lowerCaseHeadline.includes("fire")) return alertImageMap.fire; // Incêndios
    if (lowerCaseHeadline.includes("rain")) return alertImageMap.rain; // Chuvas
    if (lowerCaseHeadline.includes("clouds")) return alertImageMap.clouds; // Nuvens
    if (lowerCaseHeadline.includes("clear")) return alertImageMap.clear; // Céu limpo
    if (lowerCaseHeadline.includes("snow")) return alertImageMap.snow; // Neve
    if (lowerCaseHeadline.includes("mist")) return alertImageMap.mist; // Névoa
    if (lowerCaseHeadline.includes("tornado")) return alertImageMap.tornado; // Tornados

    return alertImageMap.default; // Imagem padrão para outros eventos
  };

  // Função para classificar o risco
  const getRiskLevel = (headline) => {
    const lowerCaseHeadline = headline.toLowerCase();

    if (lowerCaseHeadline.includes("tempestade") || lowerCaseHeadline.includes("alagamento") || lowerCaseHeadline.includes("chuva forte")) {
      return "Alto";
    } else if (lowerCaseHeadline.includes("chuva") || lowerCaseHeadline.includes("nuvens")) {
      return "Moderado";
    } else {
      return "Baixo";
    }
  };

  // Busca alertas climáticos
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const cities = [
          "São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Belo Horizonte",
          "Manaus", "Curitiba", "Recife", "Porto Alegre", "Belém", "Goiânia", "Guarulhos",
          "Campinas", "São Luís", "São Gonçalo", "Maceió", "Duque de Caxias", "Natal", "Teresina"
        ];
        const alertPromises = cities.map(city =>
          axios.get(`/api/weather?q=${city}&appid=${API_KEY}`)
        );
        const responses = await Promise.all(alertPromises);
        console.log("Respostas da API (Alerta Climático):", responses);

        const alertsData = responses.map(response => ({
          headline: translate(response.data.weather[0].main), // Traduz a condição principal
          areas: [response.data.name],
          severity: getRiskLevel(response.data.weather[0].main), // Classifica o risco
          description: translate(response.data.weather[0].description), // Traduz a descrição
          image: getAlertImage(response.data.weather[0].main), // Obtém a imagem correspondente
        }));

        console.log("Dados dos Alertas Mapeados:", alertsData);

        setAlerts(alertsData.slice(0, 3)); // Limita a exibição a 3 alertas
      } catch (error) {
        console.error("Erro ao buscar alertas climáticos:", error);
        setAlerts([]);
      }
    };

    fetchAlerts();
  }, []);

  // Busca previsão do tempo (chuvas fortes)
  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const cities = [
          "São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Belo Horizonte",
          "Manaus", "Curitiba", "Recife", "Porto Alegre", "Belém", "Goiânia", "Guarulhos",
          "Campinas", "São Luís", "São Gonçalo", "Maceió", "Duque de Caxias", "Natal", "Teresina"
        ];
        const forecastPromises = cities.map(city =>
          axios.get(`/api/forecast?q=${city}&appid=${API_KEY}`)
        );
        const responses = await Promise.all(forecastPromises);
        console.log("Respostas da API (Previsão do Tempo):", responses);

        const forecastData = responses.map(response => ({
          city: response.data.city.name,
          forecast: response.data.list.map(day => ({
            date: day.dt_txt,
            rain: day.rain ? day.rain["3h"] || 0 : 0, // Chuva total em mm
            condition: translate(day.weather[0].description), // Traduz a descrição
          })),
        }));

        console.log("Dados da Previsão Mapeados:", forecastData);

        // Filtra cidades com previsão de chuvas fortes (ex.: mais de 10mm) nos próximos 5 dias
        const heavyRainCities = forecastData.map(city => ({
          ...city,
          forecast: city.forecast.filter(day => day.rain > 10), // Filtra dias com chuva forte
        }));

        console.log("Cidades com Chuva Forte:", heavyRainCities);

        setForecastData(heavyRainCities);
      } catch (error) {
        console.error("Erro ao buscar previsão do tempo:", error);
        setForecastData([]);
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

  // Função para priorizar os slides
  const prioritizeSlides = (alerts, forecastData) => {
    const highPriorityKeywords = ["tempestade", "alagamento", "chuva forte"];
    const mediumPriorityKeywords = ["chuva", "tempestade"];

    // Filtra alertas de alta prioridade
    const highPriorityAlerts = alerts.filter(alert =>
      highPriorityKeywords.some(keyword => alert.headline.toLowerCase().includes(keyword))
    );

    // Filtra previsões de média prioridade
    const mediumPriorityForecasts = forecastData.flatMap(city =>
      city.forecast.filter(day =>
        mediumPriorityKeywords.some(keyword => day.condition.toLowerCase().includes(keyword))
      )
    );

    // Combina os slides com base na prioridade
    const slides = [];
    if (highPriorityAlerts.length > 0) {
      slides.push(...highPriorityAlerts.slice(0, 3));
    } else if (mediumPriorityForecasts.length > 0) {
      slides.push(...mediumPriorityForecasts.slice(0, 3).map(day => ({
        headline: `Previsão de ${day.condition.toLowerCase().includes("chuva") ? "chuvas" : "tempestades"} em ${day.city}`,
        areas: [day.city],
        severity: getRiskLevel(day.condition), // Classifica o risco
        description: `Previsão para ${day.date}: ${day.rain}mm. Condição: ${day.condition}.`,
        image: alertImageMap.rain,
      })));
    } else {
      // Se não houver eventos prioritários, exibe os alertas normais
      slides.push(...alerts.slice(0, 3));
    }

    return slides;
  };

  // Slides a serem exibidos
  const slides = prioritizeSlides(alerts, forecastData);

  console.log("Slides a serem exibidos:", slides);

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
          const { headline = "N/A", areas = [], severity = "N/A", description = "Descrição não disponível.", image } = slide;

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
              <div className="carousel-caption d-none d-md-block" style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo escuro semi-transparente
                padding: "10px",
                borderRadius: "5px",
              }}>
                <h5 style={{ fontSize: "24px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)" }}>{headline}</h5>
                <p style={{ fontSize: "18px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)" }}>{`Áreas afetadas: ${areas.join(", ") || "N/A"}`}</p>
                <p style={{ fontSize: "18px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)" }}>{`Gravidade: ${severity}`}</p>
                <p style={{ fontSize: "16px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)" }}>{description}</p>
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