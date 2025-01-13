import "../../assets/Css/previsao/Previsao.css"
import CardPrevisao from "./CardPrevisao"
import { useRef, useState } from "react"
import axios from "axios"



const SecaoPrevisao = () =>{
    const inputRef = useRef()
    const [infos, setInfos] = useState()
 

    async function buscarCidade(){    
        const cidade = inputRef.current.value
        const apiKey = "5c282d19dbd62712573de627a2c455a0"
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`
        
        const data = await axios.get(url)         
         setInfos( await filtrarDados(data.data))
         console.log(infos);      
        
    }   

    async function filtrarDados(data) {
        return {
            paralelo:false,
            icone: data.weather[0].icon,
            temperatura: data.main.temp,
            clima: data.weather[0].description,
            sensacaoTermica: data.main.feels_like,
            maxima: data.main.temp_max,
            minima: data.main.temp_min,
            vento: data.wind.speed,
            umidade: data.main.humidity,
            visibilidade: data.visibility,
            nuvens: data.clouds.all,
            chuva: "",
            pressao: data.main.pressure
        }    
                
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
                        <li className="list-item"><button>Hoje</button></li>
                        <li className="list-item"><button>Amanhã</button></li>
                        <li className="list-item"><button>7 Dias</button></li>
                        <li className="list-item"><button>15 Dias</button></li>
                    </ul>
                </nav>
            </div>

            <div className="previsao-cards">
                <div>
                   {infos &&  <CardPrevisao data={infos}></CardPrevisao>}
                </div>
                <div>
                </div>
            </div>

       </div>
    )
}
export default SecaoPrevisao