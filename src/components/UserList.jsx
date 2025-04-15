import { useEffect, useState } from 'react';

const API_URL = "https://usuario-api-render.onrender.com/usuarios";

export function UserList({ recargar, onEdit }) {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error("Error al obtener usuarios:", err));
  }, [recargar]);

  const eliminarUsuario = async (id) => {
    const confirmacion = confirm("¿Seguro que deseas eliminar este usuario?");
    if (!confirmacion) return;

    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setUsuarios(usuarios.filter(user => user.id !== id));
    } else {
      alert("Error al eliminar usuario");
    }
  };

  return (
    <div>
      <h2>Lista de usuarios</h2>
      <ul>
        {usuarios.map(user => (
          <li key={user.id}>
            {user.nombre} ({user.email})
            <button onClick={() => eliminarUsuario(user.id)} style={{ marginLeft: '10px' }}>
              Eliminar
            </button>
            <button onClick={() => onEdit(user)} style={{ marginLeft: '10px' }}>
              Editar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
