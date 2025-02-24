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

  // Função para seguir/deixar de seguir o usuário
  const handleSeguir = async () => {
    if (!onFollow || !user?.idusuario || carregando) return;

    try {
      setCarregando(true); // Inicia o estado de carregamento durante a ação
      await onFollow(user.idusuario); // Chama a função para seguir/deixar de seguir

      // Atualiza o estado após a ação
      const novoEstado = !estaSeguindo;
      setEstaSeguindo(novoEstado);

      // Persistência do estado após recarregar
      localStorage.setItem(`seguindo_${idUsuarioLogado}_${user.idusuario}`, JSON.stringify(novoEstado));
    } catch (erro) {
      console.error("Erro ao seguir/deixar de seguir:", erro);
    } finally {
      setCarregando(false); // Finaliza o estado de carregamento
    }
  };

  // Verifica o estado salvo no localStorage para evitar atrasos na renderização
  useEffect(() => {
    const estadoSalvo = localStorage.getItem(`seguindo_${idUsuarioLogado}_${user.idusuario}`);
    if (estadoSalvo !== null) {
      setEstaSeguindo(JSON.parse(estadoSalvo));
    }
  }, [idUsuarioLogado, user?.idusuario]);

  return (
    <div className="seca-feed-info">
      <p className="secao-feed-text-info">Informações do usuário</p>
      <div className="topo-info">
        <img
          src={user?.foto ? `http://localhost:8080/fotos/${user.foto}` : imgUser}
          alt="Foto do usuário"
          className="img-user-info"
        />
        <div className="info">
          <span>{user?.nome || "Fulano de Tal"}</span>
        </div>
      </div>
      <div className="botao-seguir">
        <button className="btn-seguir" onClick={handleSeguir} disabled={carregando}>
          {carregando ? "Carregando..." : estaSeguindo ? "Deixar de seguir" : "Seguir"}
        </button>
      </div>
    </div>
  );
};

export default SecaoFeedInfo;