// PackageModal.js
import React, { useState, useEffect, useRef } from 'react'
import Modal from 'react-modal'

// Import UI Components.
import { Button } from '../ui/button'

// Set the app element to your main content's root element
Modal.setAppElement('#root')

// Modal styles
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#1a202c',
    color: 'white',
    borderRadius: '10px',
    padding: '20px',
    width: '80%', // Adjust width to your preference
    maxWidth: '600px' // Adjust maxWidth to your preference
  }
}

const PackageModal = ({ isOpen, onRequestClose, packageData }) => {
  // useRef Hook.
  const fileInputRef = useRef(null)

  // States.
  const [id, setId] = useState()
  const [packageID, setPackageID] = useState()
  const [packageName, setPackageName] = useState()
  const [details, setDetails] = useState()
  const [price, setPrice] = useState()
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (packageData) {
      setId(packageData[0].id || '')
      setPackageID(packageData[0].package_id || '')
      setPackageName(packageData[0].package_name || '')
      setDetails(packageData[0].details || '')
      setPrice(packageData[0].price || '')
    }
  }, [packageData])

  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent the default form submission behavior.

    try {
      let base64String = '' // Initialize the base64 string variable.

      if (image) {
        // Check if an image is selected.
        base64String = await readFileAsBase64(image) // Read the image file as a base64 string.
      } else {
        toast.warning('No image selected!') // Notify the user if no image is selected.
        return // Exit the function early if no image is selected.
      }

      // Ensure all required fields are defined before calling the API.
      if (id && packageID && packageName && details && price && base64String) {
        await window.api.editPackage(id, packageID, packageName, details, price, base64String) // Call the API to edit the package.
        toast.success('Package Added Successfully') // Notify the user of success.
      } 
    } catch (err) {
      toast.error('Unable to update package: ', err)
    }
  }

  // Async function to read file as base64 string.
  const readFileAsBase64 = async (file) => {
    const reader = new FileReader()

    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const base64Result = reader.result.replace('data:', '').replace(/^.+,/, '') // Convert the image to a base64 string.
        resolve(base64Result) // Resolve the promise with the base64 string.
      }

      reader.onerror = (error) => {
        reject(error) // Reject the promise in case of an error.
      }

      reader.readAsDataURL(file) // Read the image file as a data URL.
    })
  }

  const handleFileChange = (event) => {
    setImage(event.target.files[0])
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Package Details"
    >
      <h2 className="text-2xl font-bold mb-4">Package Details</h2>
      {packageData ? (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 md:grid-cols-2">
              <div>
                <Input
                  id="package-id"
                  name="package-id"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={packageID || ''}
                  onChange={(e) => setPackageID(e.target.value)}
                />
              </div>
              <div>
                <Input
                  id="package-name"
                  name="package-name"
                  type="text"
                  placeholder="Package Name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={packageName || ''}
                  onChange={(e) => setPackageName(e.target.value)}
                />
              </div>
              <div>
                <textarea
                  id="details"
                  name="details"
                  placeholder="Details"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={details || ''}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </div>
              <div>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Price"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={price || 0}
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
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit Package
            </Button>
          </div>
        </form>
      ) : (
        <p>No package found</p>
      )}
      <Button onClick={onRequestClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Close
      </Button>
    </Modal>
  )
}

export default PackageModal





// import React, { useState, useEffect, useRef } from 'react'

// // Import UI Components.
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog'

// const PackageModal = ({ isOpen, onRequestClose, packageData }) => {
//   const fileInputRef = useRef(null)

//   const [id, setId] = useState()
//   const [packageID, setPackageID] = useState()
//   const [packageName, setPackageName] = useState()
//   const [details, setDetails] = useState()
//   const [price, setPrice] = useState()
//   const [image, setImage] = useState(null)

//   useEffect(() => {
//     if (packageData) {
//       setId(packageData[0].id || '')
//       setPackageID(packageData[0].package_id || '')
//       setPackageName(packageData[0].package_name || '')
//       setDetails(packageData[0].details || '')
//       setPrice(packageData[0].price || '')
//     }
//   }, [packageData])

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       let base64String = ''

//       if (image) {
//         base64String = await readFileAsBase64(image)
//       } else {
//         toast.warning('No image selected!')
//         return
//       }

//       if (id && packageID && packageName && details && price && base64String) {
//         await window.api.editPackage(id, packageID, packageName, details, price, base64String)
//         toast.success('Package Added Successfully')
//       }
//     } catch (err) {
//       toast.error('Unable to update package: ', err)
//     }
//   }

//   const readFileAsBase64 = async (file) => {
//     const reader = new FileReader()

//     return new Promise((resolve, reject) => {
//       reader.onloadend = () => {
//         const base64Result = reader.result.replace('data:', '').replace(/^.+,/, '')
//         resolve(base64Result)
//       }

//       reader.onerror = (error) => {
//         reject(error)
//       }

//       reader.readAsDataURL(file)
//     })
//   }

//   const handleFileChange = (event) => {
//     setImage(event.target.files[0])
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onRequestClose}>
//       <DialogTrigger>
//         <Button
//           type="button"
//           className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           Search
//         </Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold mb-4 text-gray-800">Package Details</DialogTitle>
//         </DialogHeader>
//         <DialogDescription>
//           {packageData ? (
//             <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//               <div className="rounded-md shadow-sm -space-y-px">
//                 <div className="grid grid-cols-1 gap-y-6 gap-x-4 md:grid-cols-2">
//                   <div>
//                     <Input
//                       id="package-id"
//                       name="package-id"
//                       type="text"
//                       required
//                       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                       value={packageID || ''}
//                       onChange={(e) => setPackageID(e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <Input
//                       id="package-name"
//                       name="package-name"
//                       type="text"
//                       placeholder="Package Name"
//                       required
//                       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                       value={packageName || ''}
//                       onChange={(e) => setPackageName(e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <textarea
//                       id="details"
//                       name="details"
//                       placeholder="Details"
//                       required
//                       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                       value={details || ''}
//                       onChange={(e) => setDetails(e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <Input
//                       id="price"
//                       name="price"
//                       type="number"
//                       placeholder="Price"
//                       required
//                       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                       value={price || 0}
//                       onChange={(e) => setPrice(e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <Input
//                       ref={fileInputRef}
//                       onChange={handleFileChange}
//                       id="image"
//                       name="image"
//                       type="file"
//                       required
//                       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="flex w-full gap-4">
//                 <Button
//                   type="submit"
//                   className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Edit Package
//                 </Button>
//               </div>
//             </form>
//           ) : (
//             <p>No package found</p>
//           )}
//         </DialogDescription>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default PackageModal

