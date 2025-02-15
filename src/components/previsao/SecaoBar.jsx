import React, { useState } from 'react';
import "../../assets/Css/previsao/SecaoBar.css";

const SecaoBar = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    console.log("Cidade buscada:", inputValue); // Exemplo: exibe o valor no console
    // Aqui você pode adicionar a lógica para buscar a cidade, como uma requisição à API
  };

  return (
    <div className="secao-bar">
      <input
        type="text"
        placeholder="Buscar por cidade"
        className="secao-input"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button className="secao-button" onClick={handleSearch}>
        <span role="img" aria-label="secao">🔍</span>
      </button>
    </div>
  );
};

export default SecaoBar;