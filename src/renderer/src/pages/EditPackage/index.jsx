import React, { useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

// Utils.
import { cleanErrorMessage } from '@/lib/utils'

// UI Components.
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function EditPackage() {
  // Navigation hook.
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  // Hook location.
  const location = useLocation()
  const item = location.state.data

  // States.
  const [packageID, setPackageID] = useState(item.package_id)
  const [packageName, setPackageName] = useState(item.package_name)
  const [details, setDetails] = useState(item.details)
  const [price, setPrice] = useState(item.price)
  const [image, setImage] = useState(null)

  // Handle Submit.
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (image) {
        const reader = new FileReader()
        // Converting image to base64.
        reader.onloadend = async () => {
          const base64String = reader.result.replace('data:', '').replace(/^.+,/, '')

          // Build paramlist.
          const paramlist = {
            p_id: item.id, 
            p_package_id: packageID,
            p_package_name: packageName,
            p_details: details,
            p_price: price,
            p_image: base64String
          }

          // Attempt to execute stored procedure.
          await window.api.executeFunction('package_Update', paramlist)
          toast.success('Package Edited Successfully')
          clearFormFields()
          navigate('/Packages')
        }
        reader.readAsDataURL(image)
      } else {
        toast.warning('No Image Selected')
      }
    } catch (error) {
      toast.error(`Error editing package ${cleanErrorMessage(error)}`)
      // console.error(error)
    }
  }

  // Clearing form fields.
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

  // Handle Back button.
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
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Edit Package</h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 md:grid-cols-2">
            <div>
                <label htmlFor="package-id" className="block text-sm font-medium text-gray-700">Package ID</label>
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
                <label htmlFor="package-name" className="block text-sm font-medium text-gray-700">Package Name</label>
                <Input
                  id="package-name"
                  name="package-name"
                  type="text"
                  placeholder="Package Name"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="details" className="block text-sm font-medium text-gray-700">Details</label>
                <Textarea
                  id="details"
                  name="details"
                  placeholder="Details"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Price"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                <Input
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  id="image"
                  name="image"
                  type="file"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <Button
              type="button"
              onClick={handleSubmit}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}