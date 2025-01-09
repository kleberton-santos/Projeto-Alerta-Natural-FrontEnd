import React from "react";

export const Cards = () => {
  return (
    <div className="my-5">
      <div className="text-center text-white p-3">
        <p className="mb-0">Fique Informado. Esteja Preparado.</p>
        <p className="mb-0">
          Explore as condições climáticas em tempo real e tome medidas para
          enfrentar desastres naturais.
        </p>
      </div>

      <div className="container mt-4 text-center">
        <div className="row">
          {/* Card 1 */}
          <div className="col-md-4 mb-4 mb-md-0">
            <a href="/previsao" className="text-decoration-none text-dark">
              <div className="card">
                <img
                  src="https://images.unsplash.com/photo-1519500099198-fd81846b8f03?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="card-img-top"
                  alt="Previsão do Tempo"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "150px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">Previsão do Tempo</h5>
                  <p className="card-text d-none d-md-block">
                    Informações atualizadas sobre o clima em sua região.
                  </p>
                  <p className="card-text d-block d-md-none">
                    Informações atualizadas.
                  </p>
                </div>
              </div>
            </a>
          </div>

          {/* Card 2 */}
          <div className="col-md-4 mb-4 mb-md-0">
            <a href="/pagina2" className="text-decoration-none text-dark">
              <div className="card">
                <img
                  src="https://images.unsplash.com/photo-1519500099198-fd81846b8f03?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="card-img-top"
                  alt="Alertas de Desastres"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "150px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">Alertas de Desastres</h5>
                  <p className="card-text d-none d-md-block">
                    Receba alertas sobre tempestades, furacões e mais.
                  </p>
                  <p className="card-text d-block d-md-none">
                    Alertas de desastres.
                  </p>
                </div>
              </div>
            </a>
          </div>

          {/* Card 3 */}
          <div className="col-md-4">
            <a href="/pagina3" className="text-decoration-none text-dark">
              <div className="card">
                <img
                  src="https://images.unsplash.com/photo-1519500099198-fd81846b8f03?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="card-img-top"
                  alt="Busca por Localização"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "150px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">Busca por Localização</h5>
                  <p className="card-text d-none d-md-block">
                    Encontre dados climáticos usando seu CEP ou coordenadas.
                  </p>
                  <p className="card-text d-block d-md-none">
                    Dados climáticos por CEP.
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
