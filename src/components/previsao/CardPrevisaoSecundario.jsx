/* eslint-disable react/prop-types */
import "../../assets/Css/previsao/card-previsao-secundario.css"

const CardPrevisaoSecundario = ({index, diaAtual, horaAtual}) =>{  
    const infoHora =  horaAtual === null? diaAtual: horaAtual 
    const infoDia = diaAtual
    const infoIndex = index         
    
    

    
                
        
       
    return (

            <div className="cards">
                <div className="cartao">
                    <header className="cartao-sec-header">
                        <p className="cartao-sec-text">{infoHora.datetime}</p>
                    </header>
                    <div className="cartao-sec-body">
                            <div className="cartao-sec-detalhes">
                                <div>
                                    <i><img src={`https://openweathermap.org/img/wn/$.png`} alt={`Icone ${infoHora.conditions}`} /></i>
                                    {/* <p>{infoDia.days[infoIndex].tempmax}C <br /> 
                                       {infoDia.days[infoIndex].tempmin}C    
                                    </p> */}
                                </div>
                                <div>
                                    <p>{horaAtual === null? infoHora.description: infoHora.conditions}</p>
                                    <p>{infoHora.humidity}%</p>
                                </div>

                            </div>
                    </div>

                </div>


            </div>
    )
}

export default CardPrevisaoSecundario