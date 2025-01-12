import "../../assets/Css/previsao/Previsao.css"
import CardPrevisao from "./CardPrevisao"

const SecaoPrevisao = () =>{

    return (
        <div>

            <div className="previsao-busca">

                <div className="busca-group">

                    <input
                     className="" 
                     placeholder="Buscar por cidade" 
                     type="text" 
                     name="cidade" 
                     id="cidade" 
                     
                     />
                   
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
                    <CardPrevisao></CardPrevisao>
                </div>
                <div>
                    <CardPrevisao></CardPrevisao>
                    <CardPrevisao></CardPrevisao>
                    <CardPrevisao></CardPrevisao>

                </div>
            </div>

       </div>
    )
}
export default SecaoPrevisao