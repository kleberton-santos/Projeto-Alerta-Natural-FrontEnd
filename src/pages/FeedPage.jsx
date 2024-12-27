import React from "react";
import SecaoFeedPublicacao from "../components/feed/SecaoFeedPublicacao";
import SecaoFeedAmigos from "../components/feed/SecaoFeedAmigos";
import SecaoFeedTimeLine from "../components/feed/SecaoFeedTimeLine";
import "../../src/assets/Css/feed/FeedPage.css";

const FeedPage = () => {
  return (
    <div className="feed-principal container-fluid p-3">
      {/* Header */}
      <div
        className="header d-flex justify-content-center align-items-center border border-primary"
        style={{ height: "100px", width: "100%", borderStyle: "solid" }}
      >
        <h1>Header</h1>
      </div>

      {/* NavBar */}
      <div
        className="nav-bar d-flex justify-content-center align-items-center border border-primary"
        style={{ height: "55px", width: "100%", borderStyle: "solid" }}
      >
        <h2>NavBar</h2>
      </div>

      {/* Grade com 2 colunas e 2 linhas */}
      <div className="container-fluid mt-5">
        <div className="row">
          {/* Primeira linha */}
          <div className="col-8">
            <div className="w-full border border-secondary" style={{height: '100px'}}>
              <p className="text-center">Div 1</p>
            </div>
            <div className="w-full border border-secondary mt-5" style={{height: '600px'}}>
              <p className="text-center">Div 3</p>
            </div>
          </div>
          <div className="col-4">
            <div className="col-md-6 col-sm-12 border border-secondary me-5 ms-4" style={{height: '400px', width:'95%'}}>
              <p className="text-center">Div 1</p>
            </div>
            <div className="col-md-6 col-sm-12 border border-secondary me-5 ms-4 mt-5" style={{height: '300px', width:'95%'}}>
              <p className="text-center">Div 3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="header d-flex justify-content-center align-items-center border border-primary mt-5"
        style={{ height: "150px", width: "100%", borderStyle: "solid" }}
      >
        <h1>Footer</h1>
      </div>
    </div>
  );
};

export default FeedPage;
