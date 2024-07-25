import React, { useState } from 'react'
import Modal from 'react-modal'
import { toast } from 'react-toastify'

// Import UI Components.
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { cleanErrorMessage } from '@/lib/utils'

const DependentsModal = ({ clientId }) => {
  // States.
  const [firstname, setFirstname] = useState()
  const [lastname, setLastname] = useState()
  const [idnumber, setIdnumber] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await window.api.addDependent(firstname, lastname, idnumber, clientId)
      toast.success('Dependant Added Successfully')
    } catch (err) {
      toast.error(`Unable to add dependant: ${cleanErrorMessage(err)}`)
      console.error(err)
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="px-4 py-2 text-white rounded bg-blue-500 hover:bg-blue-700 top-right">
          Add
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4 text-gray-800">Add Dependent</DialogTitle>
          <DialogDescription>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 md:grid-cols-2">
                <div>
                  <Input
                    id="firstname"
                    name="firstname"
                    type="text"
                    placeholder="First Name"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={firstname || ''}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    id="lastname"
                    name="lastname"
                    type="text"
                    placeholder="Last Name"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={lastname || ''}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    id="idnumber"
                    name="idnumber"
                    placeholder="ID Number"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={idnumber || ''}
                    onChange={(e) => setIdnumber(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full gap-4">
              <button
                type="submit"
                onClick={handleSubmit}
                className="relative flex justify-center py-2 px-4 mt-6 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Dependent
              </button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default DependentsModal
