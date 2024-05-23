import { Route, Routes } from 'react-router-dom'

// Layouts.
import Layout from '../layout'

// Pages.
import Login from '../pages/Login'

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Login />} />
        {/* <Route path='dashboard' element={<Dashboard />} /> */}
      </Route>
    </Routes>
  )
}

export default AppRouter
