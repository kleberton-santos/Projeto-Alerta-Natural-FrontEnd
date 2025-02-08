import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});


export const editarUsuario = async (usuarioId, formData) => {
  try {
    const response = await axios.put(`http://localhost:8080/usuarios/${usuarioId}`, formData,);
    
    return response;
  } catch (error) {
    console.error("Erro ao editar usuário:", error);
    throw error;
  }
};

export default Api;
