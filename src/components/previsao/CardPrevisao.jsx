import "../../assets/Css/previsao/card-previsao.css"


const CardPrevisao = (data) =>{
    const infos = data.data
    const hora = new Date()

    
    
    if(!data.paralelo){

        return (
            
            
            <div className="cards">
           <div className="cartao">
                <header className="cartao-header">
                    <p className="cartao-text">Clima Atual</p>
                    <p className="cartao-text">{hora.getHours()}:{hora.getMinutes()}</p>
                </header>
                <div className="cartao-body">
                    
                    
                    <div className="cartao-detalhes">
                     <i><img className="cartao-icone"  src={`https://openweathermap.org/img/wn/${infos.icone}.png`} alt="icone" /></i>
                     <h2 className="cartao-title">{Math.round(infos.temperatura)}ºC</h2> 
                         <p className="cartao-text"><span className="clima">{infos.clima}</span><br />
                        Sensação Térmica: {Math.round(infos.sensacaoTermica)}ºC<br />
                        A Mínima Será de: {Math.round(infos.minima)}ºC   
                     </p>
                     
                    </div>
                    
              
                 
                            
                  
                </div>
                <div className="cartao-footer">
                    <ul className="lista-footer">
                       
                        <li>Vento <br /> {infos.vento} km/h</li>
                        <li>Umidade <br /> {infos.umidade}%</li>
                        <li>Visibiliade <br />{infos.visibilidade/1000} Km</li>
                        <li>Pressão <br /> {infos.pressao} hPa</li>
                        <li>Nuvens <br />{infos.nuvens}%</li>
                        <li>Chuva <br />{infos.chuva}mmh</li>
                    </ul>

                </div>
           </div>
           <div>

           </div>
          
        </div>
    )

}else{
    return (
        <button>Aqui</button>
    )
}

}
export default CardPrevisao