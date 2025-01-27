import React from 'react';
import "../../assets/Css/previsao/SecaoBar.css"

const SecaoBar = () => {
  return (
    <div className="secao-bar">
      <input
        type="text"
        placeholder="Buscar por cidade"
        className="secao-input"
      />
      <button className="secao-button">
        <span role="img" aria-label="secao">🔍</span>
      </button>
    </div>
  );
};

export default SecaoBar;
