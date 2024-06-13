import React from 'react'

const PackageItem = ({ item, handleClick }) => {
  return (
    <div
      key={item.PackageId}
      className="bg-gray-700 p-4 flex flex-col items-center h-[300px] w-64 space-x-4"
    >
      <img src={item.ImageUrl} alt={item.Name} className="w-full h-32 object-cover mb-4" />
      <h2 className="text-xl mb-2">{item.Name}</h2>
      <p className="text-sm mb-4">{item.Details}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => handleClick(item)}
      >
        More Info
      </button>
    </div>
  )
}

export default PackageItem
