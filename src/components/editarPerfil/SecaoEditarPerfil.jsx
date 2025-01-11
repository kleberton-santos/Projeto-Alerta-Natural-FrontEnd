import React, { useState } from "react";

export const SecaoEditarPerfil = () => {
  const [formData, setFormData] = useState({
    name: "",
    sobrenome: "",
    cpf: "",
    telefone: "",
    email: "",
    senha: "",
    foto: null,
    previewFoto: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        foto: file,
        previewFoto: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      sobrenome: "",
      cpf: "",
      telefone: "",
      email: "",
      senha: "",
      foto: null,
      previewFoto: null,
    });
  };

  return (
    <div className="container-fluid" style={{ maxWidth: "800px" }}>
      <form className="shadow-none" onSubmit={handleSubmit}>
        {/* Foto */}
        <div className="mb-3 text-center">
          <label className="text-white my-2">Foto</label>
          <div className="d-flex justify-content-center align-items-center flex-column mb-4">
            {formData.previewFoto ? (
              <img
                src={formData.previewFoto}
                alt="Pré-visualização"
                className="rounded-circle mb-2"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            ) : (
              <div
                className="bg-light rounded-circle"
                style={{ width: "150px", height: "150px" }}
              />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFotoChange}
            className="form-control"
          />
        </div>

        {/* Nome e Sobrenome */}
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

        {/* CPF e Telefone */}
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

        {/* E-mail e Senha */}
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

        {/* Botões */}
        <div className="container-fluid my-4">
          <div className="row">
            <div className="col-12 d-flex gap-2">
              <button type="submit" className="btn btn-secondary w-50">
                Atualizar
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-secondary w-50"
              >
                Cancelar
              </button>
            </div>



          </div>
        </div>


      </form>
    </div>
  );
};