import { Route, Routes } from 'react-router-dom'

// Layouts.
import Layout from '../layout'

// Protected route.
import ProtectedRoute from './ProtectedRoute'

// Pages.
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Settings from '../pages/Settings'
import ClientRegistration from '../pages/ClientRegistration'
import EmployeeRegistration from '../pages/EmployeeRegistration'
import Packages from '../pages/Packages'
import Package from '../pages/Package'
import AddPackage from '../pages/AddPackage'
import ClientDashboard from '../pages/ClientDashboard'
const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Settings" element={<Settings />} />
          <Route path="ClientRegistration" element={<ClientRegistration />} />
          <Route path="EmployeeRegistration" element={<EmployeeRegistration />} />
          <Route path="Packages" element={<Packages />} />
          <Route path="Packages/:PackageID" element={<Package />} />
          <Route path="AddPackage" element={<AddPackage />} />
          <Route path="ClientDashboard" element={<ClientDashboard />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRouter
