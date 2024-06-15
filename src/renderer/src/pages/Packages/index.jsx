import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Components.
import PackageItem from '../../components/PackageItem'

function Packages() {
  // Hook navigation.
  const navigate = useNavigate()

  // States.
  const [packageData, setPackageData] = useState([])

  // Creating Packages.
  const dummyData = [
    {
      PackageId: 1,
      Name: 'Package 1',
      Details: 'This is package 1 and what you get from it',
      ImageUrl: 'https://via.placeholder.com/150',
      Price: 'R100'
    },
    {
      PackageId: 2,
      Name: 'Package 2',
      Details: 'This is package 2 and what you get from it',
      ImageUrl: 'https://via.placeholder.com/150',
      Price: 'R200'
    },
    {
      PackageId: 3,
      Name: 'Package 3',
      Details: 'This is package 3 and what you get from it',
      ImageUrl: 'https://via.placeholder.com/150',
      Price: 'R300'
    },
    {
      PackageId: 4,
      Name: 'Package 4',
      Details: 'This is package 4 and what you get from it',
      ImageUrl: 'https://via.placeholder.com/150',
      Price: 'R400'
    },
    {
      PackageId: 5,
      Name: 'Package 5',
      Details: 'This is package 5 and what you get from it',
      ImageUrl: 'https://via.placeholder.com/150',
      Price: 'R500'
    },
    {
      PackageId: 6,
      Name: 'Package 6',
      Details: 'This is package 6 and what you get from it',
      ImageUrl: 'https://via.placeholder.com/150',
      Price: 'R600'
    }
  ]

  useEffect(() => {
    setPackageData(dummyData)
  }, [])

  const handleClick = (item) => {
    // Navigate to page.
    navigate(`/Packages/${item.PackageId}`, { state: { data: item } })
  }

  const AddPackage = () => {
    // Navigate to page.
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
        {packageData.map((item) => (
          <PackageItem key={item.id} item={item} handleClick={handleClick} />
        ))}
      </div>
    </div>
  )
}

export default Packages
