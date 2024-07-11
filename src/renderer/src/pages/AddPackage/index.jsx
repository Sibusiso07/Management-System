// AddPackage.js
import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import PackageModal from '../../components/PackageModal'

export default function AddPackage() {
  // Navigation hook.
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  // States.
  const [packageID, setPackageID] = useState('')
  const [packageName, setPackageName] = useState('')
  const [details, setDetails] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const [searchResult, setSearchResult] = useState(null)
  const [modalIsOpen, setIsOpen] = useState(false)
  
  // Handle Next.
  const handleNext = async (e) => {
    e.preventDefault()
    try {
      if (image) {
        const reader = new FileReader()
        // Converting image to base64.
        reader.onloadend = async () => {
          const base64String = reader.result.replace('data:', '').replace(/^.+,/, '')
          const response = await window.api.addPackage(packageID, packageName, details, price, base64String)
          const newPackageId = response[0]; // Getting the new package ID
          alert('Package Added Successfully');
          clearFormFields();
          console.log("package_id >>>", newPackageId.package_id)
          navigate('/Items', { state: { package_id: newPackageId.package_id } })
        }
        reader.readAsDataURL(image)
      } else {
        alert('No Image Selected')
      }
    } catch (error) {
      alert('Error adding package', error.message)
      console.error(error)
    }
  }

  const clearFormFields = () => {
    setPackageID('')
    setPackageName('')
    setDetails('')
    setPrice('')
    setImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleFileChange = (event) => {
    setImage(event.target.files[0])
  }

  const handleSearch = async () => {
    try {
      // console.log('package id >>>> ', packageID)
      // Checking for package.
      if (packageID) {
        const result = await window.api.findPackage(packageID)
        // console.log("results >>> ", result)
        if (result) {
          // Sending results and opening modal.
          setSearchResult(result)
          setIsOpen(true)
        } else {
          alert('Package not found')
        }
      }
    } catch (error) {
      console.log('package id >>>> ', packageID, packageID.length)
      alert('Error searching package', error.message)
      console.error('Error sending package id: ', error)
    }
  }

  // Closing the modal and setting the search results to null.
  const closeModal = () => {
    setIsOpen(false)
    setSearchResult(null)
  }

  const handleBackClick = () => {
    navigate('/Packages')
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div>
        <button
          onClick={handleBackClick}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-8 top-4 left-4 absolute"
        >
          Back
        </button>
      </div>
      <div className="max-w-lg w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Add New Package</h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 md:grid-cols-2">
              <div>
                <input
                  id="package-id"
                  name="package-id"
                  type="text"
                  placeholder="Package ID"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={packageID}
                  onChange={(e) => setPackageID(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="package-name"
                  name="package-name"
                  type="text"
                  placeholder="Package Name"
                  // required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                />
              </div>
              <div>
                <textarea
                  id="details"
                  name="details"
                  placeholder="Details"
                  // required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Price"
                  // required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <input
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  id="image"
                  name="image"
                  type="file"
                  // required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <button
              type="button"
              onClick={handleNext}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Next
            </button>
            <button
              type="button"
              onClick={handleSearch}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <PackageModal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal} 
        packageData={searchResult} 
        appElement={document.getElementById('root')}  
      />
    </div>
  )
}
