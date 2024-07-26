import React, { useEffect, useState, useContext } from 'react'
import DependentsModal from './DependentsModal'
import { toast } from 'react-toastify'

// Import UI Components.
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'

// Auth Context.
import { AuthContext } from '@/context/AuthContext'
import { Button } from '../ui/button'

export default function Dependents() {
  // Hook auth context.
  const { user } = useContext(AuthContext)

  // States.
  const [dependents, setDependents] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [clientId, setClientId] = useState(user.id)

  // Rendaring dependants.
  useEffect(() => {
    if (clientId) {
      fetchDependants()
    }
  }, [clientId])

  // Getting dependants.
  const fetchDependants = async () => {
    try {
      const results = await window.api.getDependants(clientId)
      setDependents(results)
    } catch (err) {
      toast.error(`Error fetching dependents: ${cleanErrorMessage(err)}`)
    }
  }

  // Handle Add button.
  const handleAdd = () => {
    setIsOpen(true)

    // Refetch dependents.
    fetchDependants()
  }

  // Closing the modal and setting the search results to null.
  const closeModal = () => {
    setIsOpen(false)

    // Refetch dependants.
    fetchDependants()
  }

  return (
    <div className="relative p-4 border border-gray-300 rounded-lg w-full h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Dependents</h2>
        {/* <Button
          className="px-4 py-2 text-white rounded bg-blue-500 hover:bg-blue-700 top-right"
          onClick={handleAdd}
        >
          Add
        </Button> */}
        <DependentsModal 
          clientId={clientId}
        />
      </div>
      <div className="flex flex-col items-center justify-center h-40 mt-4 w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>ID Number</TableHead>
            </TableRow>
          </TableHeader>
          {dependents.length === 0 ? (
            <p className="text-gray-500">Add dependents</p>
          ) : (
            <TableBody>
              {dependents.map((dependent) => (
                <TableRow key={dependent.dependent_id}>
                  <TableCell>{dependent.first_name}</TableCell>
                  <TableCell>{dependent.last_name}</TableCell>
                  <TableCell>{dependent.id_number}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
      <div className="absolute bottom-4 right-4">
        <button className="px-4 py-2 text-white rounded bg-green-500 hover:bg-green-700">
          Calculation
        </button>
      </div>
    </div>
  )
}

