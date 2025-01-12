import "../../assets/Css/previsao/card-previsao.css"




const CardPrevisao = () =>{

    return (
        <div className="cards">


           <div className="cartao">
                <header className="cartao-header">
                    <p className="cartao-text">Clima Atual</p>
                    <p className="cartao-text">...horas</p>
                </header>
                <div className="cartao-body">
                    
                    
                    <div className="cartao-detalhes">
                     <i>Icone</i>
                     <h2 className="cartao-title">...C</h2> 
                         <p className="cartao-text">Maioria nublado <br />
                        Sensação térmica ...
                     </p>
                    </div>
                    
                    <div className="cartao-detalhes">
                         <p>
                             Haverá chuva fraca e dispersa. A mínima será de ...
                         </p>
                    </div> 
               
                </div>
                <div className="cartao-footer">
                    <ul className="lista-footer">
                        <li>Qualidade do ar <br /> ...</li>
                        <li>Vento <br /> ...</li>
                        <li>Umidade <br /> ...</li>
                        <li>Velocidade <br /> ...</li>
                        <li>Pressão <br /> ...</li>
                        <li>Ponto de Orvalho <br /> ...</li>
                    </ul>

                </div>
           </div>
           <div>

           </div>
          
        </div>
    )
}
export default CardPrevisao