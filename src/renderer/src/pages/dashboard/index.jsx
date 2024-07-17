import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// Auth Context.
import { AuthContext } from '@/context/AuthContext'

// UI Components.
import { Button } from '@/components/ui/button'

export default function Dashboard() {
  // Hook navigation.
  const navigate = useNavigate()

  // Hook auth context.
  const { user } = useContext(AuthContext)

  const handleNavigation = (path) => {
    if (path == '/ClientRegistration') {
      navigate(path)
    } else if (path == '/EmployeeRegistration') {
      navigate(path)
    } else if (path == '/Packages') {
      navigate(path)
    } else if (path == '/ClientDashboard') {
      navigate(path)
    } else {
      alert('Feature still in development')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex space-x-4">
        <Button
          onClick={() => handleNavigation('/ClientDashboard')}
          className="relative flex justify-end py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Client Dashboard
        </Button>
      </div>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Dashboard</h2>
        </div>
        <div className="mt-8 space-y-6">
          <Button
            onClick={() => handleNavigation('/ClientRegistration')}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Client Registration
          </Button>
          <Button
            onClick={() => handleNavigation('/Packages')}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Packages
          </Button>
          <Button
            onClick={() => handleNavigation('/Payments')}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Payments
          </Button>
          <Button
            onClick={() => handleNavigation('/Reports')}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reports
          </Button>
          <Button
            onClick={() => handleNavigation('/EmployeeRegistration')}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Employee Registration
          </Button>
          <Button
            onClick={() => handleNavigation('/Settings')}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
