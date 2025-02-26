import React, { useRef, useState } from 'react';
import axios from 'axios';
import "../../assets/Css/previsao/SecaoBarPrevisao.css";

const SecaoBarPrevisao = ({ onSearch }) => {
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = async () => {
    const cidade = inputRef.current.value;
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

  return (
    <div className="secao-bar-previsao">
      <input
        type="text"
        placeholder="Buscar por cidade"
        className="secao-input-previsao"
        value={inputValue}
        onChange={handleInputChange}
        ref={inputRef}
      />
      <button className="secao-button-previsao" onClick={handleSearch}>
        <span role="img" aria-label="secao">🔍</span>
      </button>
    </div>
  );
};

export default SecaoBarPrevisao;