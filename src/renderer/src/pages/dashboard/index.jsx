import { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// Context.
import { AuthContext } from '@/context/AuthContext'
import { SettingsContext } from '@/context/SettingsContext'

// UI Components.
import { Button } from '@/components/ui/button'

// Import the Report.
import ClientReport from '@/components/util/ClientReport'

export default function Dashboard() {
  // Hook navigation.
  const navigate = useNavigate()

  // Hook useRef for report div and printing.
  const reportRef = useRef()

  // Hook context.
  const { user } = useContext(AuthContext)
  const { printer } = useContext(SettingsContext)

  // Path Navigation.
  const handleNavigation = (path) => {
    if (
      ['/ClientRegistration', '/EmployeeRegistration', '/Packages', '/ClientDashboard', '/Settings'].includes(
        path
      )
    ) {
      navigate(path)
    } else {
      toast.warning('Feature still in development')
    }
  }

  // Handing the printing functionality.
  const handleAfterPrint = async () => {
    const reportContent = reportRef.current.innerHTML
    await window.api.printReport(printer, reportContent)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Dashboard</h2>
        </div>
        <div className="mt-8 space-y-6">
          <Button
            onClick={() => handleNavigation('/ClientDashboard')}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Client Dashboard
          </Button>
          {user.is_employee && (
            <Button
              onClick={() => handleNavigation('/ClientRegistration')}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Client Registration
            </Button>
          )}
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
          {user.is_employee && (
            <Button
              onClick={() => handleNavigation('/EmployeeRegistration')}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Employee Registration
            </Button>
          )}
          <Button
            onClick={() => handleNavigation('/Settings')}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Settings
          </Button>
          <Button
            onClick={handleAfterPrint}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Print
          </Button>
        </div>
        <div ref={reportRef} className="hidden">
          <ClientReport />
        </div>
      </div>
    </div>
  )
}
