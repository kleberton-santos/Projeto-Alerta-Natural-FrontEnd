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
      className="container-fluid p-2"
      style={{ maxWidth: "800px" }}
    >
      <form className="shadow-none" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-6 mb-3">
            <label className="text-white mb-2">Nome</label>
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
            <label className="text-white mb-2">Sobrenome</label>
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
            <label className="text-white mb-2">Senha</label>
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

          <div className="col-sm-12">
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

        <div className="container-fluid my-4">
          <div className="row">
            <div className="col-md-6">
              <button type="submit" className="btn btn-secondary w-100 mb-2">
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
