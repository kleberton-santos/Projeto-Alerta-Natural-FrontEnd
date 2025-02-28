import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import "../../assets/Css/previsao/SecaoBarPrevisao.css";

const SecaoBarPrevisao = ({ onSearch }) => {
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState('São Paulo'); // Valor padrão

  useEffect(() => {
    handleSearch(); // Faz a busca inicial ao montar o componente
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = async () => {
    const cidade = inputValue.trim(); // Usa o estado ao invés do ref
    if (cidade) {
      try {
        const urlTempoDiario = `/visualcrossing-api/VisualCrossingWebServices/rest/services/timeline/${cidade}?unitGroup=metric&key=EDQLVXGZ22RG6STQJXDADP5K9&contentType=json&lang=pt`;
        const response = await axios.get(urlTempoDiario);
        onSearch(response.data); // Passa os dados da previsão para o componente pai
      } catch (error) {
        console.error("Erro ao buscar a cidade:", error);
      }
    } else {
      console.log("Por favor, insira o nome de uma cidade.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="secao-bar-previsao">
      <input
        type="text"
        placeholder="Buscar por cidade"
        className="secao-input-previsao"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress} 
        ref={inputRef}
      />
      <button className="secao-button-previsao" onClick={handleSearch}>
        <span role="img" aria-label="secao">🔍</span>
      </button>
    </div>
  );
};

export default SecaoBarPrevisao;
