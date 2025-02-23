import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Login from '../components/Login'

const LoginPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useContext(AppContext)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks')
    }
  }, [isAuthenticated, navigate])

  if (isAuthenticated) {
    navigate('/tasks')
  }

  return (
    <div className="container container-small">
      <Login />
    </div>
  )
}

export default LoginPage