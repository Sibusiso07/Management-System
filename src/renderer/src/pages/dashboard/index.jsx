import { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactToPrint } from 'react-to-print'
import { toast } from 'react-toastify'

// Auth Context.
import { AuthContext } from '@/context/AuthContext'

// UI Components.
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Import the Report.
import Report from '@/components/util/Report'

export default function Dashboard() {
  // Hook navigation.
  const navigate = useNavigate()
  
  // Hook useRef for report div and printing.
  const reportRef = useRef()
  const reactToPrintRef = useRef()

  // Hook auth context.
  const { user } = useContext(AuthContext)

  // State for printers
  const [printers, setPrinters] = useState([])
  const [selectedPrinter, setSelectedPrinter] = useState('')

  // Function to fetch printers
  const fetchPrinters = async () => {
    const printers = await window.api.getPrinters()
    setPrinters(printers)
  }

  // Fetch printers when the component mounts
  useEffect(() => {
    fetchPrinters()
  }, [])

  // Path Navigation.
  const handleNavigation = (path) => {
    if (['/ClientRegistration', '/EmployeeRegistration', '/Packages', '/ClientDashboard'].includes(path)) {
      navigate(path)
    } else {
      toast.warning('Feature still in development')
    }
  }

  // Handing the printing functionality.
  const handleAfterPrint = async () => {
    const reportContent = reportRef.current.innerHTML;
    await window.api.printReport(selectedPrinter, reportContent);
  }

  // Handle Selected Printer.
  const handleSelectPrinter = (printerName) => {
    setSelectedPrinter(printerName)
    console.log("selected printer >>>", selectedPrinter)
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
          {/* <div className="relative w-full flex justify-center text-black font-medium">
            <DropdownMenu>
              <DropdownMenuTrigger className="mt-4 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                {selectedPrinter || 'Select a printer'}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                {printers.map((printer) => (
                  <DropdownMenuItem key={printer.name} onClick={() => handleSelectPrinter(printer.name)}>
                    {printer.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div> */}
          <ReactToPrint
            trigger={() => <Button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Print Report</Button>}
            content={() => reportRef.current}
            onAfterPrint={handleAfterPrint}
            ref={reactToPrintRef}
          />
        </div>
        <div ref={reportRef} className="hidden">
          <Report />
        </div>
      </div>
    </div>
  )
}
