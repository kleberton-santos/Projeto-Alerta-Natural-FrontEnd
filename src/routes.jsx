import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Previsao from "./pages/Previsao"
import Feed from "./pages/feed"
import Contato from "./pages/Contato"
import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home />}></Route>
                <Route path="/previsao" element={ <Previsao />}></Route>
                <Route path="/feed" element={ <Feed />}></Route>
                <Route path="/contato" element={ <Contato />}></Route>
                <Route path="/login" element={ <Login />}></Route>
                <Route path="/cadastro" element={ <Cadastro />}></Route>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes