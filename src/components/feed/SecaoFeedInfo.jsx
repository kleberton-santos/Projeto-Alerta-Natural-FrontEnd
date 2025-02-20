import React, { useEffect, useState } from "react";
import "../../assets/Css/feed/SecaoFeedInfo.css";
import imgUser from "../../assets/images/icon_user.png";

const SecaoFeedInfo = ({ user, onFollow, idUsuarioLogado }) => {
  const [estaSeguindo, setEstaSeguindo] = useState(false);
  const [carregando, setCarregando] = useState(true); // Estado para controlar o carregamento

  // Função para verificar se o usuário logado está seguindo o usuário atual
  const verificarSeEstaSeguindo = async (idUsuarioLogado, idAmigo) => {
    try {
      const resposta = await fetch(
        `http://localhost:8080/amigos/verificar-amizade?idUsuario=${idUsuarioLogado}&idAmigoUsuario=${idAmigo}`
      );
      if (!resposta.ok) {
        throw new Error("Erro ao verificar amizade");
      }
      const dados = await resposta.json();
      return dados; // Retorna true ou false
    } catch (erro) {
      console.error("Erro ao verificar amizade:", erro);
      return false;
    }
  };

  // Verifica o estado da amizade ao carregar o componente
  useEffect(() => {
    if (!user?.idusuario || !idUsuarioLogado) {
      setCarregando(false); // Se não houver usuário ou ID logado, finaliza o carregamento
      return;
    }

    const carregarEstadoAmizade = async () => {
      try {
        setCarregando(true); // Inicia o estado de carregamento
        const estaSeguindoBackend = await verificarSeEstaSeguindo(idUsuarioLogado, user.idusuario);
        setEstaSeguindo(estaSeguindoBackend); // Atualiza o estado com base no backend
      } catch (erro) {
        console.error("Erro ao carregar estado da amizade:", erro);
      } finally {
        setCarregando(false); // Finaliza o estado de carregamento
      }
    };

    carregarEstadoAmizade();
  }, [user?.idusuario, idUsuarioLogado]);

  const handleSeguir = async () => {
    if (!onFollow || !user?.idusuario || carregando) return;

    try {
      setCarregando(true); // Inicia o estado de carregamento durante a ação
      await onFollow(user.idusuario); // Chama a função para seguir/deixar de seguir

      // Atualiza o estado após a ação
      const novoEstado = !estaSeguindo;
      setEstaSeguindo(novoEstado);
    } catch (erro) {
      console.error("Erro ao seguir/deixar de seguir:", erro);
    } finally {
      setCarregando(false); // Finaliza o estado de carregamento
    }
  };

  return (
    <div className="seca-feed-noticia d-flex flex-column align-items-center rounded bg-custom" style={{ height: '300px', width: '100%', borderStyle: 'solid' }}>
      <p className="secao-feed-text-info text-white mt-2">Informações do usuário</p>
      <div className="topo d-flex align-items-center w-100">
        <img
          src={user?.foto ? `http://localhost:8080/fotos/${user.foto}` : imgUser}
          alt="Foto do usuário"
          className="img-user"
        />
        <div className="info">
          <p>{user?.nome || "Fulano de Tal"}</p>
          <button className="btn-seguir" onClick={handleSeguir} disabled={carregando}>
            {carregando ? "Carregando..." : estaSeguindo ? "Deixar de seguir" : "Seguir"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecaoFeedInfo;