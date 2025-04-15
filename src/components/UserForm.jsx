import { useState, useEffect } from 'react';

const API_URL = "https://usuario-api-render.onrender.com/usuarios";

export function UserForm({ onUserSaved, usuarioEditar }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (usuarioEditar) {
      setNombre(usuarioEditar.nombre);
      setEmail(usuarioEditar.email);
    }
  }, [usuarioEditar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datosUsuario = { nombre, email };

    let response;
    if (usuarioEditar) {
      // EDITAR
      response = await fetch(`${API_URL}/${usuarioEditar.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosUsuario),
      });
    } else {
      // CREAR
      response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosUsuario),
      });
    }

    if (response.ok) {
      setNombre("");
      setEmail("");
      onUserSaved(); // recarga lista
    } else {
      alert("Error al guardar el usuario");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{usuarioEditar ? "Editar usuario" : "Crear nuevo usuario"}</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">
        {usuarioEditar ? "Guardar cambios" : "Crear"}
      </button>
    </form>
  );
}
