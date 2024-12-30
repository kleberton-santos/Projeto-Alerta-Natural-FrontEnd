import React, { useState } from "react";
import "../../assets/Css/cadastro/Cadastro.css";

export const CadastroForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    sobrenome: "",
    cpf: "",
    telefone: "",
    email: "",
    senha: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
  };

  return (
    <div
      className="container-fluid min-vh-100 py-5"
      style={{ maxWidth: "800px" }}
    >
      <form onSubmit={handleSubmit} >
        <div className="row">
          <div className="col-sm-6 mb-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nome"
              className="bg-cinza-custom form-control"
              required
            />
          </div>
          <div className="col-sm-6 mb-3">
            <input
              type="text"
              name="sobrenome"
              value={formData.sobrenome}
              onChange={handleChange}
              placeholder="Sobrenome"
              className="bg-cinza-custom form-control"
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 mb-3">
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
          <div className="col-sm-6 mb-3">
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

          <div className="col-sm-6">
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

        <div className="container-fluid">
          <div className="row justify-content-center">
            <button
              type="submit"
              className="btn btn-secondary col-sm-6 mt-4 "
            >
              Cadastrar
            </button>

            <button
              type="button"
              onClick={() =>
                setFormData({
                  name: "",
                  sobrenome: "",
                  cpf: "",
                  telefone: "",
                  email: "",
                  senha: "",
                })
              }
              className="btn btn-secondary col-sm-6 m-2 "
            >
              Cancelar
            </button>
          </div>

          <div className="text-center text-black">
            Ao preencher o formulário acima você concorda com os nossos{" "}
            <a href="#" className="text-primary small text-decoration-none">
              Política de Privacidade
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};
