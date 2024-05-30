import { Route, Routes } from 'react-router-dom'

// Layouts.
import Layout from '../layout'

// Pages.
import Login from '../pages/Login'
import Dashboard from '../pages/dashboard'
import Settings from '../pages/settings'
import ClientRegistration from '../pages/clientRegistration'
import UserRegistration from '../pages/userRegistration'

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index  element={<Login />} />
        <Route path='Login'  element={<Login />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='settings' element={<Settings />} />
        <Route path='clientRegistration' element={<ClientRegistration />} />
        <Route path='userRegistration' element={<UserRegistration />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
