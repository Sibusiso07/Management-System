import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PackageItem from '../../components/PackageItem'

function Packages() {
  // Hook useNavigation.
  const navigate = useNavigate()

  // State.
  const [packageData, setPackageData] = useState([])

  // On package load.
  useEffect(() => {
    // Fetching package data from the DB.
    const fetchPackageData = async () => {
      try {
        const result = await window.api.getPackage();
        // console.log('results >>>> ', result)
        
        // Making sure the data is in an array.
        setPackageData(result || []);
      } catch (err) {
        console.error('Unable to fetch data from DB: ', err)
        setPackageData([]); // or handle error state
      }
    };

    fetchPackageData();
  }, [])

  // Handing package click.
  const handleClick = (item) => {
    navigate(`/Packages/${item.package_id}`, { state: { data: item } })
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
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={AddPackage}
        >
          Add Package
        </button>
      </div>
      <div className="flex flex-wrap gap-4 items-center justify-center overflow-y-auto h-[95%] mb-10">
        {packageData.length === 0 ? (
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
