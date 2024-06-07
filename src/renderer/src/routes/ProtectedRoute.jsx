import { useContext, useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoute = () => {
  // Hook navigation.
  const navigate = useNavigate()
  // Hook Auth Conext.
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  return user ? <Outlet /> : null
}

export default ProtectedRoute
