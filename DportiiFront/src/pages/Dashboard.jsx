import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <p>Bienvenido: {user?.nombre}</p>
      <p>Email: {user?.email}</p>

      <button onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  )
}