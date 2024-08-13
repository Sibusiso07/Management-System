import React, { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'

// Auth Context.
import { AuthContext } from '@/context/AuthContext'

export default function ClientReport() {
  // Hook context.
  const { user } = useContext(AuthContext)
  // States.
  const [dependents, setDependents] = useState([])
  const [activePackage, setActivePackage] = useState(null)

  useEffect(() => {
    fetchDependants()
    fetchActivePackage()
  }, [user.id])

  // Fetching dependents.
  const fetchDependants = async () => {
    try {
      const paramlist = { clientId: user.id }
      const results = await window.api.executeFunction('get_Dependants', paramlist)
      setDependents(results)
    } catch (err) {
      toast.error(`Error fetching dependents: ${err.message}`)
    }
  }

  // Fetching packages.
  const fetchActivePackage = async () => {
    try {
      const paramlist = { clientId: user.id }
      const results = await window.api.executeFunction('get_active_package', paramlist)
      setActivePackage(results)
    } catch (err) {
      toast.error(`Error fetching active package: ${err.message}`)
    }
  }

  return (
    <div id="report" className="p-4">
      <h1 className="text-2xl font-bold">Client Report</h1>

      {/* Client Details */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Client Details</h2>
        <p><strong>Name & Surname:</strong> {user.firstname} {user.lastname}</p>
        <p><strong>ID Number:</strong> {user.id_number}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Phone Number:</strong> {user.phone_number}</p>
      </div>

      {/* Package Details */}
      {activePackage && activePackage.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Package Details</h2>
          {activePackage.map((pkg, index) => (
            <div key={index} className="mb-4">
              <p><strong>Package Name:</strong> {pkg.package_name}</p>
              <p><strong>Number of Dependents:</strong> {dependents.length}</p>
              {/* <p><strong>Status:</strong> {pkg.status}</p> */}
            </div>
          ))}
        </div>
      )}


      {/* Dependent Details */}
      {dependents.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Dependent Details</h2>
          <table className="w-full table-auto border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name & Surname</th>
                <th className="border border-gray-300 px-4 py-2">ID Number</th>
              </tr>
            </thead>
            <tbody>
              {dependents.map((dependent, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {dependent.first_name} {dependent.last_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{dependent.id_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
