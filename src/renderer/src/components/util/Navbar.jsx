import { useContext } from 'react'
import { Link } from 'react-router-dom'

// Context.
import { AuthContext } from '@/context/AuthContext'

const Navbar = () => {
  // Hook auth context.
  const { setUser, user } = useContext(AuthContext)

  const handleLogout = () => {
    // Clear user from context to handle protecting routing.
    setUser(null)
  }

  return (
    <div className="bg-blue-500 flex justify-between items-center">
      <div className="flex gap-2 ml-2">
        <Link to={'/Login'}>Login</Link>
        <Link to={'/Dashboard'}>Dashboard</Link>
        <Link to={'/Settings'}>Setting</Link>
        <Link to={'/'} onClick={handleLogout}>
          Logout
        </Link>
      </div>
      <div className="flex gap-2 items-center mr-2">
        <p>{user.firstname}</p>
      </div>
    </div>
  )
}

export default Navbar
