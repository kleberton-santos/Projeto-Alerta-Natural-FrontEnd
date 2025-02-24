import React, { useState } from 'react';
import "../../assets/Css/previsao/SecaoBarAmigo.css";

const SecaoBarAmigo = ({ onSearch, isLoggedIn }) => {
  const [inputValue, setInputValue] = useState('');

  // Atualiza o estado do input
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Realiza a busca ao clicar no botão ou pressionar Enter
  const handleSearch = () => {
    if (inputValue.trim() === "") {
      alert("Por favor, insira um nome para buscar.");
      return;
    }
    onSearch(inputValue); // Passa o valor da busca para o componente pai
  };

  // Função para lidar com o evento de pressionar uma tecla
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(); // Chama a função de busca ao pressionar Enter
    }
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
        onKeyDown={handleKeyDown} // Adiciona o evento de escuta para o teclado
      />
      <button className="secao-button" onClick={handleSearch}>
        <span role="img" aria-label="secao">🔍</span>
      </button>
    </div>
  );
};

export default SecaoBarAmigo;