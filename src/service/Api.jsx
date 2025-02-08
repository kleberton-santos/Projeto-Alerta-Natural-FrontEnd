import axios from "axios";

const ApiUsuarios = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
});

export default ApiUsuarios;