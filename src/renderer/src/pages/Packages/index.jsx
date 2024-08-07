import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// Auth Context.
import { AuthContext } from '@/context/AuthContext'

// Components.
import PackageItem from '@/components/util/PackageItem'

// UI Components.
import { Button } from '@/components/ui/button'

// Utils.
import { cleanErrorMessage } from '@/lib/utils'

function Packages() {
  // Hook useNavigation.
  const navigate = useNavigate()
  // Hook auth context.
  const { user } = useContext(AuthContext)

  // State.
  const [packageData, setPackageData] = useState([])
  const [loading, setLoading] = useState(false)

  // On package load.
  useEffect(() => {
    fetchPackageData()
  }, [])

  // Fetching package data from the DB.
  const fetchPackageData = async () => {
    try {
      // Set loading state.
      setLoading(true)
      const paramlist = {}
      // Attempt to execute stored procedure.
      const result = await window.api.executeFunction('get_Packages', paramlist)
      // Making sure the data is in an array.
      setPackageData(result || [])
    } catch (err) {
      toast.error(`Unable to fetch data from DB: ${cleanErrorMessage(err)}`)
      setPackageData([]) // or handle error state
    } finally {
      setLoading(false)
    }
  }

  // Handling package select click.
  const handleClick = async (item) => {
    const itemId = item.id
    try {
      const paramlist = {
        p_package_id: itemId
      }
      // Attempt to execute stored procedure.
      const response = await window.api.executeFunction('get_selected_package_items', paramlist)
      // Combine package details and package items to send to package page.
      const fullPackageDetails = { details: item, items: response }

      navigate(`/Packages/${item.package_id}`, { state: { data: fullPackageDetails } })
    } catch (err) {
      toast.error(`Error fetching package items ${cleanErrorMessage(err)}`)
    }
  }

  // Handling package select click.
  const handleEdit = async (item) => {
    const itemId = item.id
    try {
      navigate(`/EditPackage`, { state: { data: item } })
    } catch (err) {
      toast.error(`Error fetching package items ${cleanErrorMessage(err)}`)
    }
  }

  // Handling add package button.
  const AddPackage = () => {
    navigate('/AddPackage')
  }

  return (
    <div className="text-white m-4 flex flex-col h-screen overflow-hidden">
      <div className="my-8 text-2xl text-center">
        <h1>Packages</h1>
      </div>
      <div className="flex justify-end mb-4">
        {user.is_employee && (
          <Button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={AddPackage}>
            Add Package
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-4 items-center justify-center overflow-y-auto h-[95%] mb-10">
        {loading ? (
          <div>Loading...</div> // Loading indicator
        ) : (
          packageData.map((item) => (
            <PackageItem key={item.id} item={item} handleClick={handleClick} handleEdit={handleEdit}/>
          ))
        )}
      </div>
    </div>
  )
}

export default Packages
