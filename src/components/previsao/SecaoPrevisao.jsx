import "../../assets/Css/previsao/Previsao.css"
import CardPrevisao from "./CardPrevisao"
import { useRef, useState } from "react"
import axios from "axios"
import CardPrevisaoSecundario from "./CardPrevisaoSecundario"



const SecaoPrevisao = () =>{
    const inputRef = useRef()
    const [infosHoje, setInfosHoje] = useState()
    const [pagina, setPagina] = useState('hoje')

    async function buscarCidade(){    
        
        const cidade = inputRef.current.value
        // QUERY de 15 dias
        const urlTempoDiario = `/visualcrossing-api/VisualCrossingWebServices/rest/services/timeline/${cidade}?unitGroup=metric&key=EDQLVXGZ22RG6STQJXDADP5K9&contentType=json&lang=pt`;

        
        const infosDiario = await axios.get(urlTempoDiario)      
         setInfosHoje(infosDiario.data) 
       
    } 


    return (
        <div>

            <div className="previsao-busca">

                <div className="busca-group">

                    <input
                     className="" 
                     ref={inputRef}
                     placeholder="Buscar por cidade" 
                     type="text" 
                     name="cidade" 
                     id="cidade" 
                     
                     />
                    <button onClick={buscarCidade}>Buscar</button>
                </div>
            </div>

            <div className="secao-previsao">
                <nav>
                    <ul className="nav-previsao">
                        <li className="list-item" onClick={()=>{setPagina("hoje")}}><button>Hoje</button></li>
                        <li className="list-item" onClick={()=>{setPagina("amanha")}}><button>Amanhã</button></li>
                        <li className="list-item" onClick={()=>{setPagina("sete")}}><button>7 Dias</button></li>
                        <li className="list-item" onClick={()=>{setPagina("quinze")}} ><button>15 Dias</button></li>
                    </ul>
                </nav>
            </div>

            <div className="previsao-cards">
              {/* Filtro hoje  info principal*/}
              {pagina === 'hoje' && infosHoje &&  <div className="card-principal"> 
                <p style={{color: "white" ,textAlign: "center"}}>Hoje</p>
                 <CardPrevisao data={infosHoje} ></CardPrevisao>
                </div>}

              {/* Filtro hoje info secundária */}
              {pagina === 'hoje' && infosHoje && <div className="card-secundario">
                {infosHoje.days[0].hours.filter(info=>{
                    return infosHoje.currentConditions.datetime < info.datetime
                }).slice(0,3).map((info, index)=>(
                    <CardPrevisaoSecundario index={0} key={index} diaAtual={infosHoje} horaAtual={info}></CardPrevisaoSecundario>
                ))}
                </div>}


                {/* Filtro amanhã*/}
                {pagina === "amanha" && infosHoje && <div className="duas-colunas">
                   {infosHoje.days[1].hours.slice(0, 24).map((info,index)=>(
                    <CardPrevisaoSecundario index={1} key={index} horaAtual={info} diaAtual={infosHoje}></CardPrevisaoSecundario>
                ))
                   }

                </div> }

                {/*Filtro 7 dias*/}
                {pagina === "sete" && infosHoje && <div className="duas-colunas"> 
                {infosHoje.days.slice(2,9).map((info, index)=>(
                    <CardPrevisaoSecundario key={index} index={0} horaAtual={null} diaAtual={info}></CardPrevisaoSecundario>
                    
                ))}                
                
                </div>}

                {/*Filtro 15 dias*/}
                {pagina === "quinze" && infosHoje && <div className="duas-colunas"> 
                {infosHoje.days.slice(2,19).map((info, index)=>(
                    <CardPrevisaoSecundario key={index} index={0} horaAtual={null} diaAtual={info}></CardPrevisaoSecundario>
                    
                ))}                
                
                </div>}
                

            </div>

       </div>
    )
}
export default SecaoPrevisao