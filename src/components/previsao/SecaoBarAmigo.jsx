import React, { useState } from 'react';
import "../../assets/Css/previsao/SecaoBar.css";

const SecaoBarAmigo = ({ onSearch, isLoggedIn }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim() === "") {
      alert("Por favor, insira um nome para buscar.");
      return;
    }
    onSearch(inputValue); // Passa o valor da busca para o componente pai
  };

  // Se o usuário não estiver logado, não renderiza o campo de busca
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="secao-bar">
      <input
        type="text"
        placeholder="Buscar por nome"
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

export default SecaoBarAmigo;