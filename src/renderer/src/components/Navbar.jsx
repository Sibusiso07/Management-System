import { useContext } from 'react'
import { Link } from 'react-router-dom'

// Context.
import { AuthContext } from './../context/AuthContext'

const Navbar = () => {
  // Hook auth context.
  const { setUser } = useContext(AuthContext)

  const handleLogout = () => {
    // Clear user from context to handle protecting routing.
    setUser(null)
  }

  return (
    <div className="bg-blue-500 flex space-x-2">
      <Link to={'/Login'}>Login</Link>
      <Link to={'/dashboard'}>Dashboard</Link>
      <Link to={'/settings'}>Setting</Link>
      <Link to={'/'} onClick={handleLogout}>
        Logout
      </Link>
    </div>
  )
}

export default Navbar
