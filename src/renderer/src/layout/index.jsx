import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Components.
import Navbar from '../components/Navbar'

const Layout = () => {
  return (
    <div className="h-screen w-screen m-0 ">
      <Navbar />
      <Outlet />
      <ToastContainer />
    </div>
  )
}

export default Layout
