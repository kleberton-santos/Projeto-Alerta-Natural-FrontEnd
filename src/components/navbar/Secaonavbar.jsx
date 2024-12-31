import React from "react"; 
import { Link } from "react-router-dom";
import "../../assets/Css/navbar/Secaonavbar.css"

const Secaonavbar = () =>{

    return (
        <div className="secao-navbar">
         <nav> 
            <Link to="/">Início</Link>
            <Link to="/previsao">Previsao do Tempo</Link> 
            <Link to="/feed">Feed</Link>
            <Link to="/contato">Contato</Link>
                    
         </nav>
        </div>
    )
}
export default Secaonavbar