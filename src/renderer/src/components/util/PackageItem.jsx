import React, { useContext } from 'react'

// Auth Context.
import { AuthContext } from '@/context/AuthContext'

// Import UI Components.
import { Button } from '../ui/button'


const PackageItem = ({ item, handleClick, handleEdit }) => {
  // Hook auth context.
  const { user } = useContext(AuthContext)
  
   // Function to convert base64 to URL
   const base64ToUrl = (base64String) => `data:image/jpeg;base64,${base64String}`

  return (
    <div
      key={item.package_id}
      className="bg-gray-700 p-4 flex flex-col items-center h-[300px] w-64 space-x-4"
    >
      <img src={base64ToUrl(item.image)} alt={item.packge_name} className="w-full h-32 object-cover mb-4" />
      <h2 className="text-xl mb-2">{item.package_name}</h2>
      <p className="text-sm mb-4">{item.details}</p>
      <div className='flex flex-row gap-4'>
        <Button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => handleClick(item)}
        >
          Select
        </Button>
          {user.is_employee && (
            <Button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => handleEdit(item)}
          >
            Edit
          </Button>
          )}
      </div>
    </div>
  )
}

export default PackageItem
