import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import "../../assets/Css/previsao/SecaoBarPrevisao.css";

const SecaoBarPrevisao = ({ onSearch }) => {
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState('São Paulo');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    const cidade = inputValue.trim();
    if (cidade) {
      try {
        const urlTempoDiario = `/visualcrossing-api/VisualCrossingWebServices/rest/services/timeline/${cidade}?unitGroup=metric&key=EDQLVXGZ22RG6STQJXDADP5K9&contentType=json&lang=pt`;
        const response = await axios.get(urlTempoDiario);
        onSearch(response.data);
        setShowSuggestions(false);
        setInputValue(''); // Limpa o campo de busca após a busca ser realizada
      } catch (error) {
        console.error("Erro ao buscar a cidade:", error);
      }
    } else {
      console.log("Por favor, insira o nome de uma cidade.");
    }
  };

  const fetchCitySuggestions = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?city=${query}&countrycodes=BR&format=json`
      );
      const cidadesUnicas = new Set();
      const cidadesFiltradas = response.data
        .map(city => city.display_name.split(",")[0])
        .filter(city => {
          if (!cidadesUnicas.has(city.toLowerCase())) {
            cidadesUnicas.add(city.toLowerCase());
            return true;
          }
          return false;
        });

      setSuggestions(cidadesFiltradas);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Erro ao buscar sugestões de cidades:", error);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    fetchCitySuggestions(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);  // Limpa a lista de sugestões
    handleSearch();  // Faz a busca com a cidade selecionada
  };

  return (
    <div className="secao-bar-previsao">
      <input
        type="text"
        placeholder="Buscar por cidade"
        className="secao-input-previsao"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        ref={inputRef}
      />
      <button className="secao-button-previsao" onClick={handleSearch}>
        <span role="img" aria-label="secao">🔍</span>
      </button>

      {/* Exibe sugestões */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SecaoBarPrevisao;
