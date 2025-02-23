import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Register from '../components/Register'

const RegisterPage = () => {
  const navigate = useNavigate()
  const isAuthenticated = !!localStorage.getItem('token')

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks')
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="container container-small">
      <Register />
    </div>
  )
}

export default RegisterPage