import "../../assets/Css/previsao/card-previsao.css"
import clearDay from "../../assets/images/previsao-icones/2nd-set-color/clear-day.png"




const CardPrevisao = (data) =>{
        const infos = data.data        
              
        return (
            
            
            <div className="cards">
           <div className="cartao">
                <header className="cartao-header">
                    <p className="cartao-text">Clima Atual</p>
                    <p className="cartao-text">{infos.currentConditions.datetime}</p>
                </header>
                <div className="cartao-body">
                    
                    
                    <div className="cartao-detalhes">
                     <i><img className="cartao-icone"  src={clearDay} alt={`icone ${infos.currentConditions.conditions}`} /></i>
                     <h2 className="cartao-title">{infos.currentConditions.temp}ºC</h2> 
                         <p className="cartao-text"><span className="clima">{infos.conditions}</span><br />
                        Sensação Térmica: {infos.currentConditions.feelslike}ºC<br />
                        </p>
                        <p>
                           {infos.days[0].description} A mínima será de: {Math.round(infos.days[0].tempmin)}ºC   
                        </p>
                     
                    </div>
                    
              
                 
                            
                  
                </div>
                <div className="cartao-footer">
                    <ul className="lista-footer">
                       
                        <li>Vento <br /> {infos.currentConditions.windspeed} km/h</li>
                        <li>Umidade <br /> {infos.currentConditions.humidity}%</li>
                        <li>Visibiliade <br />{infos.currentConditions.visibility} Km</li>
                        <li>Pressão <br /> {infos.currentConditions.pressure} hPa</li>
                        <li>Nuvens <br />{infos.currentConditions.cloudcover}%</li>
                        <li>Chuva <br />{infos.currentConditions.precip!== null + "mpp" && infos.currentConditions.precip }{infos.currentConditions.precip === null && "Sem previsão"}</li>
                    </ul>

                </div>
           </div>
           <div>

           </div>
          
        </div>
    )

}
export default CardPrevisao