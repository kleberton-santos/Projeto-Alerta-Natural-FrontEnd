import React from "react";
import "../../assets/Css/previsao/NavPrevisao.css";

const NavPrevisao = ({ setPagina }) => {
  return (
    <div className="secao-previsao-nav">
      <nav>
        <ul className="nav-previsao">
          <li className="list-item" onClick={() => setPagina("hoje")}>
            <button>Hoje</button>
          </li>
          <li className="list-item" onClick={() => setPagina("amanha")}>
            <button>Amanhã</button>
          </li>
          <li className="list-item" onClick={() => setPagina("sete")}>
            <button>7 Dias</button>
          </li>
          <li className="list-item" onClick={() => setPagina("quinze")}>
            <button>15 Dias</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavPrevisao;