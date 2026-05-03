import { useEffect, useState } from 'react'
import { getUsersRequest } from '../../api/authApi'

export default function Users() {
  const [users, setUsers] = useState([])
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsersRequest()
        setUsers(data)
      } catch (error) {
        setMensaje(error.response?.data?.error || 'Error al obtener usuarios')
      }
    }

    loadUsers()
  }, [])

  return (
    <div>
      <h1>Usuarios</h1>

      {mensaje && <p>{mensaje}</p>}

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.nombre}</li>
        ))}
      </ul>
    </div>
  )
}