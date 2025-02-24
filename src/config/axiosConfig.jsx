import axios from "axios";

// Configura o Axios para incluir o token JWT no cabeçalho das requisições
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Recupera o token do localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Adiciona o token no cabeçalho
  }
  return config;
});

export default axios;