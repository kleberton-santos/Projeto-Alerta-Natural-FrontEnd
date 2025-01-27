import React from "react";
import "../../assets/Css/feed/SecaoFeedTimeLine.css"; 
import imgUser from "../../assets/images/icon_user.png";
import imgDefault from "../../assets/images/img-default.png";

const SecaoFeedTimeLine = () => {
    return (
        <div className="seca-feed-time-line d-flex rounded bg-custom" style={{ height: '600px', width: '100%', borderStyle: 'solid' }}>
            <div className="item w-100 p-3">

                <div className="topo d-flex align-items-center justify-content-start">
                    <img src={imgUser} alt="User" className="user-image me-3"  />
                    <p className="text-white mb-0">Fulano de Tal</p>
                </div>
                <div className="info">
                    <div className="texto">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </div>
                    <div className="galeria">
                        <img src={imgDefault} alt="" />
                    </div>

                </div>

            </div>
            
        </div>
    )
}

export default SecaoFeedTimeLine;