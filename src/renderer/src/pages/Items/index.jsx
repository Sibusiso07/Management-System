import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

// Utils.
import { cleanErrorMessage } from '@/lib/utils'

// UI Components.
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export default function Items() {
  const navigate = useNavigate()
  const location = useLocation()

  // State.
  const [packageItems, setPackageItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])

  // Extracting id from location state
  const { package_id } = location.state || {}

  // On package load.
  useEffect(() => {
    fetchPackageItems()
  }, [])

  // Fetching package data from the DB.
  const fetchPackageItems = async () => {
    try {
      // Set loading state.
      setLoading(true)

      const paramlist = {}
      // Attempt to execute stored procedure.
      const results = await window.api.executeFunction('get_all_package_items', paramlist)
      setPackageItems(results) // Making sure the data is in an array.
    } catch (err) {
      toast.error(`Unable to fetch package items: ${cleanErrorMessage(err)}`)
      setPackageItems([]) // or handle error state
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = (item_id) => {
    if (selectedItems.includes(item_id)) {
      setSelectedItems((prevSelectedItems) => prevSelectedItems.filter((id) => id !== item_id))
    } else {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item_id])
    }
  }

  const handleDone = async () => {
    try {
      const paramlist = {
        p_package_id: package_id, 
        p_item_ids: selectedItems
      }
      // Attempt to execute stored procedure.
      const results = await window.api.executeFunction('link_package_items', paramlist)
      toast.success('Successfully linked the package and items')
      navigate('/Packages')
    } catch (err) {
      toast.error(`Unable to link the package and items: ${cleanErrorMessage(err)}`)
    }
  }

  return (
    <div className="text-white m-4">
      <div className="my-8 text-2xl text-center">
        <h1>Select Package Items</h1>
      </div>
      <div className="overflow-x-auto">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader className="bg-gray-800">
            <TableRow>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Item Name
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Select Item
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-gray-800 divide-y divide-gray-200">
            {loading ? (
              <TableRow>
                <TableCell className="px-6 py-3 whitespace-nowrap" colSpan="2">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              packageItems.map((item) => (
                <TableRow key={item.item_id}>
                  <TableCell className="px-6 py-3 whitespace-nowrap">{item.item_name}</TableCell>
                  <TableCell className="px-6 py-3 whitespace-nowrap">
                    <Button
                      className={`w-10 h-5 rounded-full p-1 transition-colors ${selectedItems.includes(item.item_id) ? 'bg-green-500' : 'bg-gray-300'}`}
                      onClick={() => handleToggle(item.item_id)}
                    >
                      <span
                        className={`block rounded-full w-3 h-3 bg-white shadow-md transform transition-transform ${selectedItems.includes(item.item_id) ? 'translate-x-5' : 'translate-x-0'}`}
                      ></span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end mt-4">
        <Button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleDone}>
          Done
        </Button>
      </div>
    </div>
  )
}
