import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PackageItem from '../../components/PackageItem'
import { toast } from 'react-toastify'

function Packages() {
  // Hook useNavigation.
  const navigate = useNavigate()

  // State.
  const [packageData, setPackageData] = useState([])
  const [loading, setLoading] = useState(false)

  // Handling toast msg.
  const warningToast = () => toast.warning('No Image Selected')
  const successToast = () => toast.success('Package Added Successfully')
  const errorToast = () => toast.error(`Error fetching package items`)

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
      console.error('Unable to fetch data from DB: ', err)
      setPackageData([]) // or handle error state
    } finally {
      setLoading(false)
    }
  }

  // Handing package select click.
  const handleClick = async (item) => {
    try {
      const response = await window.api.getPackageItems(item.package_id)
    } catch (error) {
      errorToast()
    } finally {
      navigate(`/Packages/${item.package_id}`, { state: { data: item } })
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
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={AddPackage}>
          Add Package
        </button>
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
