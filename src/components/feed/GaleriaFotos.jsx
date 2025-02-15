import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/Css/feed/GaleriaFotos.css";
import imgDefault from "../../assets/images/img-default.png"; // Imagem padrão

const GaleriaFotos = () => {
  const [fotos, setFotos] = useState([]); // Estado para armazenar as fotos do usuário
  const [fotoPrincipal, setFotoPrincipal] = useState(imgDefault); // Estado para a foto principal
  const user = JSON.parse(localStorage.getItem("user")); // Obtém o usuário logado

  // Função para buscar as fotos do usuário
  const fetchFotos = async () => {
    if (!user || !user.id) {
      console.error("Usuário não está logado.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/fotos/usuario/${user.id}`);
      setFotos(response.data);

      // Define a primeira foto como a foto principal, se houver fotos
      if (response.data.length > 0) {
        const primeiraFoto = response.data[0].caminhoFoto.split("\\").pop();
        setFotoPrincipal(`http://localhost:8080/fotos/${primeiraFoto}`);
      }
    } catch (error) {
      console.error("Erro ao carregar as fotos:", error);
    }
  };

  // Carrega as fotos ao montar o componente
  useEffect(() => {
    fetchFotos();
  }, [user?.id]); // Atualiza as fotos quando o id do usuário muda

  return (
    <div className="conteudo-galeria">
      {/* Foto Principal */}
      <div className="foto-principal">
        <img
          src={fotoPrincipal}
          alt="Foto Principal"
          className="img-fluid rounded"
          onError={(e) => {
            e.target.src = imgDefault; // Exibe a imagem padrão em caso de erro
          }}
        />
      </div>

      {/* Miniaturas */}
      <div className="miniaturas">
        {fotos.length > 0 ? (
          fotos.map((foto, index) => {
            const nomeArquivo = foto.caminhoFoto.split("\\").pop();
            const urlFoto = `http://localhost:8080/fotos/${nomeArquivo}`;

            return (
              <div key={index} className="miniatura">
                <img
                  src={urlFoto}
                  alt={`Miniatura ${index + 1}`}
                  onClick={() => setFotoPrincipal(urlFoto)} // Ao clicar, muda a foto principal
                  onError={(e) => {
                    e.target.src = imgDefault; // Exibe a imagem padrão em caso de erro
                  }}
                />
              </div>
            );
          })
        ) : (
          // Exibe miniaturas padrão se não houver fotos
          [...Array(15)].map((_, index) => (
            <div key={index} className="miniatura">
              <img
                src={imgDefault}
                alt={`Miniatura ${index + 1}`}
                onClick={() => setFotoPrincipal(imgDefault)} // Ao clicar, muda a foto principal para a imagem padrão
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GaleriaFotos;