import React from "react";
import SecaoFeedPublicacao from "../components/feed/SecaoFeedPublicacao";
import SecaoFeedAmigos from "../components/feed/SecaoFeedAmigos";
import SecaoFeedTimeLine from "../components/feed/SecaoFeedTimeLine";
import SecaoFeedNoticias from "../components/feed/SecaoFeedNoticias";
import HeaderGlobal from "../components/header/HeaderGlobal";
import FooterGlobal from "../components/footer/FooterGlobal";
import Secaonavbar from "../components/navbar/Secaonavbar";
import "../../src/assets/Css/feed/FeedPage.css";

const FeedPage = () => {
  return (
    <div className="feed-principal container-fluid p-3">
      {/* Header */}
      <div className="header">
        <HeaderGlobal/>
      </div>

      {/* NavBar */}
      <div className="nav-bar">
        <Secaonavbar/>
      </div>

      {/* Grade com 2 colunas e 2 linhas */}
      <div className="container-fluid mt-3 p-5">
        <div className="row">
          {/* Primeira linha */}
          <div className="col-8">
            <div className="w-full " style={{height: '100px'}}>
              <SecaoFeedPublicacao/>
            </div>
            <div className="w-full mt-5" style={{height: '600px'}}>
              <SecaoFeedTimeLine/>
            </div>
          </div>
          <div className="col-4">
            <div className="col-md-6 col-sm-12 me-5 ms-3" style={{height: '400px', width:'95%'}}>
              <SecaoFeedAmigos/>
            </div>
            <div className="col-md-6 col-sm-12 me-5 ms-3 mt-5" style={{height: '300px', width:'95%'}}>
              <SecaoFeedNoticias/>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer-feed" >
        <FooterGlobal/>
      </div>
    </div>
  );
};

export default FeedPage;
