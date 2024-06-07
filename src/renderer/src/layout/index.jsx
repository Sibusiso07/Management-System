import { Outlet } from 'react-router-dom'

// Components.
import Navbar from '../components/Navbar'

const Layout = () => {
  return (
    <div className="h-screen w-screen m-0 ">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout
