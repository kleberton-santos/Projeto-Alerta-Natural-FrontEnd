import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/Css/cadastro/EditarPerfil.css";
import imagemGenerica from "../../assets/images/img-default.png"; // Imagem padrão para quando não houver foto

export const SecaoEditarPerfil = () => {
  const [formData, setFormData] = useState({
    name: "",
    sobreNome: "",
    cpf: "",
    telefone: "",
    email: "",
    senha: "",
    foto: null,
    previewFoto: imagemGenerica, // Usa a imagem genérica por padrão
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const usuarioId = userData?.id;

    if (!usuarioId) {
      console.error("ID de usuário não encontrado.");
      return;
    }

    const carregarDadosUsuario = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/usuarios/${usuarioId}`);

        setFormData({
          name: response.data.nome || "",
          sobreNome: response.data.sobreNome || "",
          cpf: response.data.cpf || "",
          telefone: response.data.telefone || "",
          email: response.data.email || "",
          senha: "",
          foto: response.data.foto || null,
          previewFoto: response.data.foto
            ? `http://localhost:8080/fotos/${response.data.foto}`
            : imagemGenerica, // Usa a imagem genérica se não houver foto
        });
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    };

    carregarDadosUsuario();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const usuarioAtualizado = {
      nome: formData.name,
      sobreNome: formData.sobreNome,
      cpf: formData.cpf,
      telefone: formData.telefone,
      email: formData.email.trim(),
    };
  
    if (formData.senha.trim() !== "") {
      usuarioAtualizado.senha = formData.senha;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append("usuario", JSON.stringify(usuarioAtualizado));
  
    if (formData.foto && formData.foto !== imagemGenerica) {
      formDataToSend.append("foto", formData.foto);
    }
  
    try {
      const usuarioId = JSON.parse(localStorage.getItem("user"))?.id;
      if (!usuarioId) {
        console.error("ID de usuário não encontrado.");
        return;
      }
  
      const response = await axios.put(
        `http://localhost:8080/usuarios/${usuarioId}`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      if (response.status === 200) {
        const novoUsuario = response.data;
        const fotoUrl = novoUsuario.foto
          ? `http://localhost:8080/fotos/${novoUsuario.foto}`
          : imagemGenerica;
  
        // ✅ Atualiza o localStorage com a nova foto
        const usuarioLocal = JSON.parse(localStorage.getItem("user"));
        usuarioLocal.foto = novoUsuario.foto;
        localStorage.setItem("user", JSON.stringify(usuarioLocal));
  
        // ✅ Atualiza o estado para refletir a mudança no Header
        setFormData((prev) => ({ ...prev, previewFoto: fotoUrl }));
  
        alert("Perfil atualizado com sucesso!");
  
        // 🚀 Dispara evento para atualizar o Header imediatamente
        window.dispatchEvent(new Event("userUpdate"));
      }
    } catch (error) {
      console.error("Erro ao editar perfil:", error);
      alert("Erro ao editar perfil. Tente novamente.");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      sobreNome: "",
      cpf: "",
      telefone: "",
      email: "",
      senha: "",
      foto: null,
      previewFoto: imagemGenerica, // Reseta para a imagem genérica
    });
  };

  return (
    <div className="container-fluid" style={{ maxWidth: "800px" }}>
      <form className="shadow-none" onSubmit={handleSubmit}>
        {/* Foto */}
        <div className="mb-3 text-center">
          <label className="text-white my-2">Foto</label>
          <div className="d-flex justify-content-center align-items-center flex-column mb-4">
            <img
              src={formData.previewFoto}
              alt="Pré-visualização"
              className="rounded-circle mb-2"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            {/* Botão personalizado para selecionar a foto */}
            <label
            htmlFor="fotoInput"
            className="custom-file-button mt-2"
            style={{ cursor: "pointer", display: "inline-block" }}
          >
            Selecionar Foto
          </label>
          <input
            id="fotoInput"
            type="file"
            accept="image/*"
            onChange={handleFotoChange}
            style={{ display: "none" }} // Oculta o input de arquivo padrão
          />
          </div>
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
              name="sobreNome"
              value={formData.sobreNome}
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
              <button type="button" onClick={handleReset} className="btn btn-secondary w-50">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};