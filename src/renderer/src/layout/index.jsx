import { Outlet, Link} from 'react-router-dom'

const Layout = () => {

  return (
    <div className="h-screen w-screen m-0 ">
      <div className="bg-blue-500 flex space-x-2">
        <Link to={'/Login'}>Login</Link>
        <Link to={'/dashboard'}>Dashboard</Link>
        <Link to={'/settings'}>Setting</Link>
        <Link to={'/clientRegistration'}>Client Registration</Link>
      </div>
      <Outlet />
    </div>
  )
}

export default Layout
