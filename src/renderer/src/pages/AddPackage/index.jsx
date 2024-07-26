// AddPackage.js
import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import PackageModal from '@/components/util/PackageModal'
import { toast } from 'react-toastify'

// Utils.
import { cleanErrorMessage } from '@/lib/utils'

// UI Components.
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

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
          // const response = await window.api.addPackage(
          //   packageID,
          //   packageName,
          //   details,
          //   price,
          //   base64String
          // )

          // Build paramlist.
          const paramlist = {
            p_package_id: packageID,
            p_package_name: packageName,
            p_details: details,
            p_price: price,
            p_image: base64String
          }

          // Attempt to execute stored procedure.
          const result = await window.api.executeFunction('package_Registration', paramlist)

          const newPackageId = result[0] // Getting the new package ID
          toast.success('Package Added Successfully')
          clearFormFields()
          navigate('/Items', { state: { package_id: newPackageId.package_id } })
        }
        reader.readAsDataURL(image)
      } else {
        toast.warning('No Image Selected')
      }
    } catch (error) {
      toast.error(`Error adding package ${cleanErrorMessage(error)}`)
      // console.error(error)
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
      // Checking for package.
      if (packageID) {
        const paramlist = {
          p_package_id: packageID
        }
        // Attempt to execute stored procedure.
        const result = await window.api.executeFunction('find_package', paramlist)
        if (result) {
          // Sending results and opening modal.
          setSearchResult(result)
          setIsOpen(true)
        } else {
          alert('Package not found')
        }
      }
    } catch (err) {
      toast.error(`Error searching for the package: ${cleanErrorMessage(err)}`)
      // console.error('Error sending package id: ', err)
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
        <Button
          onClick={handleBackClick}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-8 top-4 left-4 absolute"
        >
          Back
        </Button>
      </div>
      <div className="max-w-lg w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Add New Package</h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 md:grid-cols-2">
              <div>
                <Input
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
                <Input
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
                <Textarea
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
                <Input
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
                <Input
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
            <Button
              type="button"
              onClick={handleNext}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Next
            </Button>
            <PackageModal packageData={searchResult} />
          </div>
        </form>
      </div>
    </div>
  )
}
