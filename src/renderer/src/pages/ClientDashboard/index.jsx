import { useState, useContext, useEffect } from 'react'
import { toast } from 'react-toastify'

// Auth Context.
import { AuthContext } from '@/context/AuthContext'

// UI Components.
import { Button } from '@/components/ui/button'

// Utils.
import { cleanErrorMessage } from '@/lib/utils'

export default function ClientDashboard() {
  // Hook auth context.
  const { user } = useContext(AuthContext)

  // States.
  const [dependents, setDependents] = useState([])
  const [activePackages, setActivePackages] = useState([])
  const [clientId, setClientId] = useState(user.id)

  // Getting dependants.
  const fetchDependants = async () => {
    try {
      const paramlist = {clientId}
      // Attempt to execute stored procedure.
      const results = await window.api.executeFunction('get_Dependants', paramlist)
      setDependents(results)
    } catch (err) {
      toast.error(`Error fetching dependents: ${cleanErrorMessage(err)}`)
    }
  }

   // Getting active package.
   const fetchActivePackage = async () => {
    try {
      const paramlist = {clientId}
      // Attempt to execute stored procedure.
      const results = await window.api.executeFunction('get_active_package', paramlist)
      setActivePackages(results)
    } catch (err) {
      toast.error(`Error fetching active package: ${cleanErrorMessage(err)}`)
    }
  }

   // Rendaring packages.
   useEffect(() => {
    if (clientId) {
      fetchDependants()
      fetchActivePackage()
    }
  }, [clientId])



  return (
    <div className='h-full w-full overflow-hidden flex flex-col'>
      <div
        className='gap-3 flex-grow grid'
        style={{ gridTemplateColumns: '40% 60%', gridTemplateRows: 'repeat(5, 1fr)' }}
      >
        <div
          className="bg-slate-200 ml-2 mt-2"
          style={{ gridColumn: '1', gridRow: '1 / span 5' }}
        >
          <p>Part 1</p>
        </div>
        <div
          className="mr-4 mt-2 border-white"
          style={{ gridColumn: '2', gridRow: '1' }}
        >
          <div className="flex items-center justify-center">
            <div className="flex space-x-4">
              <Button className="bg-blue-500 text-white px-4 py-2 rounded">Client Report</Button>
              <Button className="bg-green-500 text-white px-4 py-2 rounded">Payment Report</Button>
              <Button className="bg-red-500 text-white px-4 py-2 rounded">Button 3</Button>
            </div>
          </div>
        </div>
        <div
          className="mr-4 border border-gray-300 rounded-lg"
          style={{ gridColumn: '2', gridRow: '2 / span 4' }}
        >
          <div className="flex flex-col h-full">
            <div className="flex-grow p-4 bg-gray-700">
              <h2 className="text-xl text-center mb-4">Active Package</h2>
              {activePackages ? (
                activePackages.map((activePackage, index) => (
                  <div key={index}>
                    <p>{activePackage.package_name}</p>
                    <p>{activePackage.details}</p>
                    <p>{activePackage.price}</p>
                  </div>
                ))
              ) : (
                <p>No active package</p>
              )}
            </div>
            <div className="flex-grow p-4 bg-gray-800">
              <h2 className="text-xl text-center mb-4">Dependents</h2>
              {dependents.length > 0 ? (
                dependents.map((dependent, index) => (
                  <div key={index} className="mb-2">
                    <p>{dependent.first_name} {dependent.last_name}</p>
                  </div>
                ))
              ) : (
                <p>No dependents</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Button className="bg-yellow-300 self-center m-4 p-2">Next</Button>
    </div>
  );
}
