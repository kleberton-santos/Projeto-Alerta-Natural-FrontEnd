import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/Css/cadastro/Cadastro.css";
import Api from "../../service/Api"; // Nome corrigido

export const CadastroForm = () => {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    nome: "",
    sobreNome: "",
    cpf: "",
    telefone: "",
    email: "",
    senha: "",
  });

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");
    setErro("");
  
    console.log("Enviando dados para a API:", formData); // Log para verificar os dados enviados
  
    try {
      await Api.post("/usuarios", formData);
      setMensagem("Cadastro realizado com sucesso!");
      setFormData({
        nome: "",
        sobreNome: "",
        cpf: "",
        telefone: "",
        email: "",
        senha: "",
      });
    } catch (error) {
      setErro(
        error.response?.data?.message ||
          "Erro ao cadastrar. Tente novamente mais tarde."
      );
    }
  };
  

  return (
    <div className="container-fluid p-2" style={{ maxWidth: "800px" }}>
      <form className="shadow-none" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-6 mb-3">
            <label className="text-white mb-2">Nome</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Nome"
              className="bg-cinza-custom form-control"
              required
            />
          </div>
          <div className="col-sm-6 mb-3">
            <label className="text-white mb-2">Sobrenome</label>
            <input
              type="text"
              name="sobreNome"
              value={formData.sobreNome}
              onChange={handleChange}
              placeholder="Sobrenome"
              className="bg-cinza-custom form-control"
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 mb-3">
            <label className="text-white mb-2">CPF</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="CPF"
              className="bg-cinza-custom form-control"
              required
            />
          </div>
          <div className="col-sm-6 mb-3">
            <label className="text-white mb-2">Telefone</label>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="Telefone"
              className="bg-cinza-custom form-control"
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3">
            <label className="text-white mb-2">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="bg-cinza-custom form-control"
              required
            />
          </div>

          <div className="col-sm-12 mb-3">
            <label className="text-white mb-2">Senha</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Senha"
              className="bg-cinza-custom form-control"
              required
            />
          </div>
        </div>

        {mensagem && <div className="alert alert-success">{mensagem}</div>}
        {erro && <div className="alert alert-danger">{erro}</div>}

        <div className="container-fluid my-4">
          <div className="row">
          <div className="col-md-6">
            <button type="submit" className="btn btn-secondary w-100 mb-2">
              Cadastrar
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  nome: "",
                  sobreNome: "",
                  cpf: "",
                  telefone: "",
                  email: "",
                  senha: "",
                });
                navigate("/");
              }}
              className="btn btn-secondary w-100"
            >
              Cancelar
            </button>
          </div>


            <div className="col-md-6 d-flex align-items-center mt-2">
              <div className="bg-white text-black small p-2 w-100 rounded">
                Ao preencher o formulário acima você concorda com os nossos{" "}
                <a href="#" className="text-primary text-decoration-none">
                  Política de Privacidade
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
