import { useContext } from 'react'
import { Link } from 'react-router-dom'

// Context.
import { AuthContext } from './../context/AuthContext'

const Navbar = () => {
  // Hook auth context.
  const { setUser, user } = useContext(AuthContext)

  const handleLogout = () => {
    // Clear user from context to handle protecting routing.
    setUser(null)
  }

  console.log('user nav >>>', user)

  return (
    <div className="bg-blue-500 flex space-x-2">
      <Link to={'/Login'}>Login</Link>
      <Link to={'/Dashboard'}>Dashboard</Link>
      <Link to={'/Settings'}>Setting</Link>
      <Link to={'/'} onClick={handleLogout}>
        Logout
      </Link>
    </div>
  )
}

export default Navbar
