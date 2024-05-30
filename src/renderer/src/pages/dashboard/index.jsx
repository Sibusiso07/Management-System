import { useNavigate } from "react-router-dom"

export default function Dashboard() {

  const navigate = useNavigate()
    
  const handleNavigation = (path) => {
    if (path == '/clientRegistration') {
      navigate(path)
    } else if (path == '/userRegistration') {
      navigate(path)
    } else {
      alert('Feature still in development')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Dashboard
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <button
            onClick={() => handleNavigation('/clientRegistration')}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Client Registration
          </button>
          <button
            onClick={() => handleNavigation('/packages')}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Packages
          </button>
          <button
            onClick={() => handleNavigation('/payments')}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Payments
          </button>
          <button
            onClick={() => handleNavigation('/reports')}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reports
            </button>
            <button
            onClick={() => handleNavigation('/userRegistration')}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            User Registration
          </button>
          <button
            onClick={() => handleNavigation('/settings')}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Settings
          </button>
        </div>
      </div>
    </div>
  )
}
    