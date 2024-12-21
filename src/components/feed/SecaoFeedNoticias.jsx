import React from "react";
import "../../assets/Css/feed/SecaoFeedNoticias.css"; 

const SecaoFeedNoticias = () => {
    return (
         <div className="seca-feed-noticia d-flex flex-column align-items-center rounded bg-custom mt-3 ms-4" style={{ height: '400px', width: '12%', borderStyle: 'solid' }}>
             <p className="secao-feed-text-noticia text-white mt-2">Noticias</p>
         </div>
       
    )
}

export default SecaoFeedNoticias;