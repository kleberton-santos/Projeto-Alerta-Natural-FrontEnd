import { useState } from 'react'
import './index.css';
import Home from './pages/Home';
import Previsao from './pages/Previsao';
import BuscaLocalizacao from './pages/BuscaLocalizacao';
import Feed from './pages/Feed';
import Contato from './pages/Contato';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import HeaderGlobal from './components/header/HeaderGlobal';
import FooterGlobal from './components/footer/FooterGlobal';

function App() {
    return (
        <div>
            <Cadastro/>
        </div>
    )
}

export default App;