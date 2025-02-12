import React from "react";
import "../../assets/Css/feed/SecaoFeedTimeLine.css"; 
import imgUser from "../../assets/images/icon_user.png";
import imgDefault from "../../assets/images/img-default.png";

const SecaoFeedTimeLine = () => {
    return (
        <div className="secao-feed-time-line d-flex rounded bg-custom-timeline">
            <div className="item w-100 p-3">

                <div className="topo-timeLine d-flex align-items-center justify-content-start" >
                    <img src={imgUser} alt="User" className="user-image me-2" />
                    <p className="text-white mb-0">Fulano de Tal</p>
                </div>
                <div className="info">
                    <div className="texto-publicacao-timeline">
                    Lorem Ipsum is simplyse of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </div>
                    <div className="galeria-feed d-flex justify-content-center">
                        <img src={imgDefault} alt="" />
                    </div>

                </div>

            </div>
            
        </div>
    )
}

export default SecaoFeedTimeLine;