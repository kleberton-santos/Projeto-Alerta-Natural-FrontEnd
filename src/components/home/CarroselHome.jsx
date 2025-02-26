import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "../../assets/Css/home/CarroselHome.css"; // Importação do CSS

// Importação das imagens locais
import floodImage from "../../assets/images/flood.jpg";
import stormImage from "../../assets/images/storm.jpg";
import fireImage from "../../assets/images/fire.jpg";
import defaultImage from "../../assets/images/default.jpg";
import rainImage from "../../assets/images/chuva.jpg";
import cloudsImage from "../../assets/images/clouds.jpg";
import clearSkyImage from "../../assets/images/clear-sky.jpg";
import snowImage from "../../assets/images/snow.jpg";
import mistImage from "../../assets/images/mist.jpg";
import tornadoImage from "../../assets/images/tornado.jpg";

const CarroselHome = () => {
  const [alerts, setAlerts] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = import.meta.env.VITE_API_KEY; // Chave da API via variável de ambiente

  // Lista de cidades e estados do Brasil
  const cities = [
    { name: "São Paulo", state: "SP" },
    { name: "Rio de Janeiro", state: "RJ" },
    { name: "Brasília", state: "DF" },
    { name: "Salvador", state: "BA" },
    { name: "Fortaleza", state: "CE" },
    { name: "Belo Horizonte", state: "MG" },
    { name: "Manaus", state: "AM" },
    { name: "Curitiba", state: "PR" },
    { name: "Recife", state: "PE" },
    { name: "Porto Alegre", state: "RS" },
    { name: "Belém", state: "PA" },
    { name: "Goiânia", state: "GO" },
    { name: "Guarulhos", state: "SP" },
    { name: "Campinas", state: "SP" },
    { name: "São Luís", state: "MA" },
    { name: "São Gonçalo", state: "RJ" },
    { name: "Maceió", state: "AL" },
    { name: "Duque de Caxias", state: "RJ" },
    { name: "Natal", state: "RN" },
    { name: "Teresina", state: "PI" },
    { name: "Florianópolis", state: "SC" },
    { name: "João Pessoa", state: "PB" },
    { name: "Aracaju", state: "SE" },
    { name: "Cuiabá", state: "MT" },
    { name: "Campo Grande", state: "MS" },
    { name: "Vitória", state: "ES" },
    { name: "Palmas", state: "TO" },
    { name: "Boa Vista", state: "RR" },
    { name: "Porto Velho", state: "RO" },
    { name: "Rio Branco", state: "AC" },
    { name: "Macapá", state: "AP" },
    { name: "Santos", state: "SP" },
    { name: "Olinda", state: "PE" },
    { name: "Caxias do Sul", state: "RS" },
    { name: "Blumenau", state: "SC" }
  ];

  // Mapeamento de tipos de alerta para imagens
  const alertImageMap = {
    flood: floodImage,
    storm: stormImage,
    fire: fireImage,
    rain: rainImage,
    clouds: cloudsImage,
    clear: clearSkyImage,
    snow: snowImage,
    mist: mistImage,
    tornado: tornadoImage,
    default: defaultImage,
  };

  // Tradução dos termos climáticos
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

  // Função para traduzir termos climáticos
  const translate = (term) => {
    return translations[term] || term;
  };

  // Função para obter a imagem com base no tipo de alerta
  const getAlertImage = (headline) => {
    if (!headline) return alertImageMap.default;

    const lowerCaseHeadline = headline.toLowerCase();

    if (lowerCaseHeadline.includes("flood")) return alertImageMap.flood;
    if (lowerCaseHeadline.includes("storm")) return alertImageMap.storm;
    if (lowerCaseHeadline.includes("fire")) return alertImageMap.fire;
    if (lowerCaseHeadline.includes("rain")) return alertImageMap.rain;
    if (lowerCaseHeadline.includes("clouds")) return alertImageMap.clouds;
    if (lowerCaseHeadline.includes("clear")) return alertImageMap.clear;
    if (lowerCaseHeadline.includes("snow")) return alertImageMap.snow;
    if (lowerCaseHeadline.includes("mist")) return alertImageMap.mist;
    if (lowerCaseHeadline.includes("tornado")) return alertImageMap.tornado;

    return alertImageMap.default;
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

  // Função para buscar alertas climáticos
  const fetchAlerts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const alertPromises = cities.map(city =>
        axios.get(`/openweather-api/weather?q=${city.name}&appid=${API_KEY}`)
      );
      const responses = await Promise.all(alertPromises);

      const alertsData = responses.map((response, index) => ({
        headline: translate(response.data.weather[0].main),
        areas: [response.data.name],
        severity: getRiskLevel(response.data.weather[0].main),
        description: translate(response.data.weather[0].description),
        image: getAlertImage(response.data.weather[0].main),
        state: cities[index].state,
        city: cities[index].name,
      }));

      setAlerts(alertsData.slice(0, 3)); // Limita a exibição a 3 alertas
    } catch (error) {
      console.error("Erro ao buscar alertas climáticos:", error);
      setError("Erro ao buscar alertas climáticos.");
      setAlerts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para buscar previsão do tempo em lotes
  const fetchForecastInBatches = async (cities, batchSize = 5) => {
    const results = [];
    for (let i = 0; i < cities.length; i += batchSize) {
      const batch = cities.slice(i, i + batchSize);
      const batchPromises = batch.map(city =>
        axios.get(`/openweather-api/forecast?q=${city.name},BR&appid=${API_KEY}`)
          .catch(error => {
            console.error(`Erro ao buscar dados para ${city.name}:`, error);
            return null;
          })
      );
      const batchResponses = await Promise.all(batchPromises);
      results.push(...batchResponses.filter(response => response && response.data));
      await new Promise(resolve => setTimeout(resolve, 1000)); // Delay de 1 segundo entre lotes
    }
    return results;
  };

  // Função para buscar previsão do tempo
  const fetchForecast = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const responses = await fetchForecastInBatches(cities);
      const forecastData = responses.map((response, index) => ({
        city: response.data.city.name,
        state: cities[index].state,
        forecast: response.data.list.map(day => ({
          date: day.dt_txt,
          rain: day.rain ? day.rain["3h"] || 0 : 0,
          condition: translate(day.weather[0].description),
        })),
      }));

      // Filtra cidades com previsão de chuvas fortes (ex.: mais de 10mm) nos próximos 5 dias
      const heavyRainCities = forecastData.map(city => ({
        ...city,
        forecast: city.forecast.filter(day => day.rain > 10),
      }));

      setForecastData(heavyRainCities);
    } catch (error) {
      console.error("Erro ao buscar previsão do tempo:", error);
      setError("Erro ao buscar previsão do tempo.");
      setForecastData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Efeito para buscar dados iniciais e atualizar a cada 5 minutos
  useEffect(() => {
    fetchAlerts();
    fetchForecast();

    const intervalId = setInterval(() => {
      fetchAlerts();
      fetchForecast();
    }, 300000); // 300.000 milissegundos = 5 minutos

    return () => clearInterval(intervalId);
  }, []);

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
        severity: getRiskLevel(day.condition),
        description: `Previsão para ${day.date}: ${day.rain}mm. Condição: ${day.condition}.`,
        image: alertImageMap.rain,
        state: day.state,
      })));
    } else {
      // Se não houver eventos prioritários, exibe os alertas normais
      slides.push(...alerts.slice(0, 3));
    }

    return slides;
  };

  // Slides a serem exibidos (usando useMemo para evitar recálculos desnecessários)
  const slides = useMemo(() => prioritizeSlides(alerts, forecastData), [alerts, forecastData]);

  return (
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
      {isLoading && (
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

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

      <div className="carousel-inner">
        {slides.map((slide, index) => {
          const { headline = "N/A", areas = [], severity = "N/A", description = "Descrição não disponível.", image, state, city } = slide;

          return (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img src={image || getAlertImage(headline)} className="d-block w-100" alt={`Slide ${index + 1}`} />
              <div className="carousel-caption d-none d-md-block">
                <h5>{headline}</h5>
                <p>{`Cidade: ${city}`}</p>
                <p>{`Estado: ${state}`}</p>
                <p>{`Gravidade: ${severity}`}</p>
                <p>{description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Próximo</span>
      </button>
    </div>
  );
};

export default CarroselHome;