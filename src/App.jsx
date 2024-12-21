import { useState } from 'react'
import './index.css';
//import SecaoFeedPublicacao from './components/feed/SecaoFeedPublicacao.jsx' 
//import SecaoFeedTimeLine from './components/feed/SecaoFeedTimeLine.jsx' 
//import SecaoFeedAmigos from './components/feed/SecaoFeedAmigos.jsx' 
import SecaoFeedNoticias from './components/feed/SecaoFeedNoticias.jsx' 

function App() {
    return (
        <div>
            <SecaoFeedNoticias />
        </div>
    )
}

export default App;