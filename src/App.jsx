import './App.css'
import { UserList } from './components/UserList'
import { UserForm } from './components/UserForm'
import { useState } from 'react'

function App() {
  const [recargar, setRecargar] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);

  const handleRecargar = () => {
    setRecargar(!recargar);
    setUsuarioEditar(null); // reinicia edición
  };

  return (
    <div className="App">
      <h1>CRUD de Usuarios</h1>
      <UserForm onUserSaved={handleRecargar} usuarioEditar={usuarioEditar} />
      <UserList recargar={recargar} onEdit={setUsuarioEditar} />
    </div>
  )
}

export default App
