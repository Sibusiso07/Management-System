import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// Components.
import PackageItem from '@/components/util/PackageItem'

// UI Components.
import { Button } from '@/components/ui/button'

// Utils.
import { cleanErrorMessage } from '@/lib/utils'

function Packages() {
  // Hook useNavigation.
  const navigate = useNavigate()

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
      // Make call to retrieve packages.
      const result = await window.api.getPackage()
      // Making sure the data is in an array.
      setPackageData(result || [])
    } catch (err) {
      toast.error(`Unable to fetch data from DB:`, cleanErrorMessage(err))
      setPackageData([]) // or handle error state
    } finally {
      setLoading(false)
    }
  }

  // Handing package select click.
  const handleClick = async (item) => {
    try {
      const response = await window.api.getPackageItems(item.id)
      // console.log('response >>>', response, typeof item)

      // Combine package details and package items to send to package page.
      const fullPackageDetails = { details: item, items: response }

      // console.log('fullPackageDetails >>>', fullPackageDetails)

      navigate(`/Packages/${item.package_id}`, { state: { data: fullPackageDetails } })
    } catch (err) {
      toast.error(`Error fetching package items`, cleanErrorMessage(err))
    }
  }

  // Handing add package button.
  const AddPackage = () => {
    navigate('/AddPackage')
  }

  return (
    <div className="text-white m-4 flex flex-col h-screen overflow-hidden">
      <div className="my-8 text-2xl text-center">
        <h1>Packages</h1>
      </div>
      <div className="flex justify-end mb-4">
        <Button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={AddPackage}>
          Add Package
        </Button>
      </div>
      <div className="flex flex-wrap gap-4 items-center justify-center overflow-y-auto h-[95%] mb-10">
        {loading ? (
          <div>Loading...</div> // Loading indicator
        ) : (
          packageData.map((item) => (
            <PackageItem key={item.id} item={item} handleClick={handleClick} />
          ))
        )}
      </div>
    </div>
  )
}

export default Packages
