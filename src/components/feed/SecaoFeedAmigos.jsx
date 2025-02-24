import React, { useEffect, useState } from "react";
import "../../assets/Css/feed/SecaoFeedAmigos.css";
import imgamigo from "../../assets/images/icon_user.png";

const SecaoFeedAmigos = ({ amigos }) => {
    const [amigosComFotos, setAmigosComFotos] = useState([]);

    useEffect(() => {
        // Função para buscar o idUsuario do amigo usando o idAmigo
        const buscarIdUsuarioPorAmigo = async (idAmigo) => {
            try {
                const resposta = await fetch(`http://localhost:8080/amigos/buscar-idusuario/${idAmigo}`);
                if (!resposta.ok) {
                    console.error(`Erro ao buscar idUsuario para o amigo ${idAmigo}: ${resposta.status}`);
                    return null;
                }
                const dados = await resposta.json();
                return dados; // Retorna o idUsuario do amigo
            } catch (erro) {
                console.error("Erro ao buscar idUsuario do amigo:", erro);
                return null;
            }
        };

        // Função para buscar a foto do amigo usando o idUsuario
        const buscarFotos = async () => {
            const amigosAtualizados = await Promise.all(
                amigos.map(async (amigo) => {
                    try {
                        // Verifica se o amigo tem um idAmigo válido
                        if (!amigo.idAmigo) {
                            console.error("idAmigo não encontrado para:", amigo);
                            return { ...amigo, foto: null };
                        }

                        // Busca o idUsuario do amigo com base no idAmigo
                        const idUsuario = await buscarIdUsuarioPorAmigo(amigo.idAmigo);
                        if (!idUsuario) {
                            console.error(`idUsuario não encontrado para o amigo ${amigo.idAmigo}`);
                            return { ...amigo, foto: null };
                        }

                        // Busca os dados do amigo pelo idUsuario
                        const resposta = await fetch(`http://localhost:8080/usuarios/${idUsuario}`);
                        if (!resposta.ok) {
                            console.error(`Erro ao buscar foto do amigo ${idUsuario}: ${resposta.status}`);
                            return { ...amigo, foto: null };
                        }

                        const dadosUsuario = await resposta.json();
                        // Supondo que a foto do usuário esteja no campo "foto"
                        return { ...amigo, foto: dadosUsuario.foto ? dadosUsuario.foto : null, nome: dadosUsuario.nome };

                    } catch (erro) {
                        console.error("Erro ao buscar foto do amigo:", erro);
                        return { ...amigo, foto: null, nome: null };
                    }
                })
            );
            setAmigosComFotos(amigosAtualizados);
        };

        if (amigos && amigos.length > 0) {
            buscarFotos();
        }
    }, [amigos]);

    return (
        <div className="secao-feed-amigos-container">
            <p className="secao-feed-amigos-titulo">Amigos</p>
            <div className="secao-feed-amigos-galeria">
                {amigosComFotos.map((amigo, index) => {
                    const fotoUrl = amigo?.foto ? `http://localhost:8080/fotos/${amigo.foto}` : imgamigo;

                    return (
                        <div key={index} className="secao-feed-amigos-item">
                            <img
                                src={fotoUrl} // Usando a URL correta da foto
                                alt="Amigo"
                                onError={(e) => { e.target.src = imgamigo; }} // Fallback para imagem padrão em caso de erro
                            />
                            <p className="secao-feed-amigos-nome">{amigo.nome}</p> {/* Exibe o nome do amigo */}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SecaoFeedAmigos;