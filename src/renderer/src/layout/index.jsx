import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="h-screen w-screen m-0 ">
      <div className="bg-blue-500 ">Nav Bar</div>
      <Outlet />
    </div>
  )
}

export default Layout
