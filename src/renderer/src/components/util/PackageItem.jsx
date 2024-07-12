import React from 'react'


const PackageItem = ({ item, handleClick }) => {
  
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
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => handleClick(item)}
      >
        Select
      </button>
    </div>
  )
}

export default PackageItem
