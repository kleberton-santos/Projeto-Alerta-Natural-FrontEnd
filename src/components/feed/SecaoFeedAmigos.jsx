import React, { useEffect, useState } from "react";
import "../../assets/Css/feed/SecaoFeedAmigos.css";
import imgamigo from "../../assets/images/icon_user.png";

const SecaoFeedAmigos = ({ amigos, onAmigoClick }) => {
    const [amigosComFotos, setAmigosComFotos] = useState([]);

    useEffect(() => {
        const buscarIdUsuarioPorAmigo = async (idAmigo) => {
            try {
                const resposta = await fetch(`http://localhost:8080/amigos/buscar-idusuario/${idAmigo}`);
                if (!resposta.ok) {
                    console.error(`Erro ao buscar idUsuario para o amigo ${idAmigo}: ${resposta.status}`);
                    return null;
                }
                const dados = await resposta.json();
                return dados;
            } catch (erro) {
                console.error("Erro ao buscar idUsuario do amigo:", erro);
                return null;
            }
        };

        const buscarFotos = async () => {
            const amigosAtualizados = await Promise.all(
                amigos.map(async (amigo) => {
                    try {
                        if (!amigo.idAmigo) {
                            console.error("idAmigo não encontrado para:", amigo);
                            return { ...amigo, foto: null };
                        }

                        const idUsuario = await buscarIdUsuarioPorAmigo(amigo.idAmigo);
                        if (!idUsuario) {
                            console.error(`idUsuario não encontrado para o amigo ${amigo.idAmigo}`);
                            return { ...amigo, foto: null };
                        }

                        const resposta = await fetch(`http://localhost:8080/usuarios/${idUsuario}`);
                        const textoResposta = await resposta.text();

                        if (!resposta.ok) {
                            console.error(`Erro ao buscar dados do usuário ${idUsuario}: ${resposta.status}`);
                            console.error("Resposta do servidor:", textoResposta);
                            return { ...amigo, foto: null, nome: null };
                        }

                        let dadosUsuario;
                        try {
                            dadosUsuario = JSON.parse(textoResposta); // Tenta parsear o JSON
                        } catch (erro) {
                            console.error("Erro ao parsear JSON:", erro);
                            console.error("Resposta malformada:", textoResposta);
                            return { ...amigo, foto: null, nome: null };
                        }

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
                        <div
                            key={index}
                            className="secao-feed-amigos-item"
                            onClick={() => onAmigoClick(amigo.nome)}
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                src={fotoUrl}
                                alt="Amigo"
                                onError={(e) => { e.target.src = imgamigo; }}
                            />
                            <p className="secao-feed-amigos-nome">{amigo.nome}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SecaoFeedAmigos;