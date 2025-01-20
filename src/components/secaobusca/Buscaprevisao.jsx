import React from "react";
import "../../assets/Css/secaobusca/secaobusca.Css"
const SearchBar = () => {
    return (
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por cidade"
        />
        <button className="search-button">
          <i className="fas fa-search"></i>
        </button>
      </div>
    );
  };
  
  export default SearchBar;