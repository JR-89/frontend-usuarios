import React, { useState, useEffect } from "react";

export function UserForm({ usuarioEditar, onUserSaved }) {
  const [formData, setFormData] = useState({ nombre: "", email: "" });
  const [cargando, setCargando] = useState(false);

  // Despierta el backend al cargar el formulario
  useEffect(() => {
    fetch("https://usuario-api-render.onrender.com/usuarios")
      .then(() => console.log("Backend despierto"))
      .catch(() => console.log("Despertando el backend..."));
  }, []);

  // Carga datos del usuario a editar si existe
  useEffect(() => {
    if (usuarioEditar) {
      setFormData({
        nombre: usuarioEditar.nombre || "",
        email: usuarioEditar.email || ""
      });
    } else {
      setFormData({ nombre: "", email: "" });
    }
  }, [usuarioEditar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    const url = usuarioEditar
      ? `https://usuario-api-render.onrender.com/usuarios/${usuarioEditar.id}`
      : "https://usuario-api-render.onrender.com/usuarios";

    const metodo = usuarioEditar ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert(usuarioEditar ? "✅ Usuario actualizado" : "✅ Usuario creado");
        setFormData({ nombre: "", email: "" });
        onUserSaved(); // recarga la lista
      } else {
        alert("❌ Error al guardar el usuario");
      }
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("🚫 Error al conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{usuarioEditar ? "Editar Usuario" : "Crear Usuario"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <button type="submit" disabled={cargando}>
          {cargando ? "Enviando..." : usuarioEditar ? "Actualizar" : "Crear Usuario"}
        </button>
      </form>
      {cargando && <p>⏳ Conectando con el servidor...</p>}
    </div>
  );
}
