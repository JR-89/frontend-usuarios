import React, { useState, useEffect } from "react";

export function UserForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [cargando, setCargando] = useState(false);

  // Despierta el backend al cargar
  useEffect(() => {
    fetch("https://usuario-api-render.onrender.com/usuarios")
      .then(() => console.log("Backend despierto"))
      .catch(() => console.log("Despertando el backend..."));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      const response = await fetch("https://usuario-api-render.onrender.com/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, email })
      });

      if (response.ok) {
        alert("✅ Usuario creado correctamente");
        setNombre("");
        setEmail("");
      } else {
        alert("❌ Error al crear el usuario");
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
      alert("🚫 El servidor está dormido o no disponible. Intenta de nuevo en unos segundos.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={cargando}>
          {cargando ? "Enviando..." : "Crear Usuario"}
        </button>
      </form>
      {cargando && <p>⏳ Conectando con el servidor...</p>}
    </div>
  );
}
