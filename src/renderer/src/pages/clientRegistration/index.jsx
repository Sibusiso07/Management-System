// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'

// // Utils.
// import { cleanErrorMessage } from '@/lib/utils'

// // UI Components.
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'

// export default function ClientRegistration() {
//   // Hook navigation.
//   const navigate = useNavigate()

//   const [clientData, setClientData] = useState({
//     firstName: '',
//     middleName: '',
//     lastName: '',
//     idNumber: '',
//     address: '',
//     email: '',
//     phoneNumber: '',
//     idCopy: '',
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setClientData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const fileInput = document.getElementById('id-copy')
//     const file = fileInput.files[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = async () => {
//         const base64String = reader.result.replace('data:', '').replace(/^.+,/, '')
//         setClientData((prevData) => ({
//           ...prevData,
//           idCopy: base64String,
//         }))

//         try {
//           const { firstName, middleName, lastName, idNumber, address, email, phoneNumber, idCopy } = clientData
//           const result = await window.api.clientReg(
//             firstName, middleName, lastName, idNumber, address, email, phoneNumber, idCopy
//           )

//           if (result) {
//             toast.success('Client Registered Successfully')
//             navigate('/Dashboard')
//           }
//         } catch (err) {
//           toast.error(`Unable to register client: ${cleanErrorMessage(err)}`)
//         }
//       }
//       reader.readAsDataURL(file)
//     } else {
//       toast.warning('Please select an ID copy for the client')
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-lg w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
//             Register New Client
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm space-y-6">
//             <div className="grid grid-cols-1 gap-y-6 gap-x-4 md:grid-cols-2">
//               <div>
//                 <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First Name</label>
//                 <Input
//                   id="first-name"
//                   name="firstName"
//                   type="text"
//                   placeholder="First Name"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   value={clientData.firstName}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="middle-name" className="block text-sm font-medium text-gray-700">Middle Name</label>
//                 <Input
//                   id="middle-name"
//                   name="middleName"
//                   type="text"
//                   placeholder="Middle Name"
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   value={clientData.middleName}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last Name</label>
//                 <Input
//                   id="last-name"
//                   name="lastName"
//                   type="text"
//                   placeholder="Last Name"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   value={clientData.lastName}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="id-number" className="block text-sm font-medium text-gray-700">ID Number</label>
//                 <Input
//                   id="id-number"
//                   name="idNumber"
//                   type="text"
//                   placeholder="ID Number"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   value={clientData.idNumber}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
//                 <Input
//                   id="address"
//                   name="address"
//                   type="text"
//                   placeholder="Address"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   value={clientData.address}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Email Address</label>
//                 <Input
//                   id="email-address"
//                   name="email"
//                   type="email"
//                   placeholder="Email address"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   value={clientData.email}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">Phone Number</label>
//                 <Input
//                   id="phone-number"
//                   name="phoneNumber"
//                   type="text"
//                   placeholder="Phone Number"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   value={clientData.phoneNumber}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="id-copy" className="block text-sm font-medium text-gray-700">ID Copy</label>
//                 <Input
//                   id="id-copy"
//                   name="id-copy"
//                   type="file"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 />
//               </div>
//             </div>
//           </div>

//           <div>
//             <Button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Register
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { cleanErrorMessage } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import RegistrationImage from '@/assets/locks.png' // Update with your image path

export default function ClientRegistration() {
  const navigate = useNavigate()

  const [clientData, setClientData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    idNumber: '',
    address: '',
    email: '',
    phoneNumber: '',
    idCopy: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setClientData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fileInput = document.getElementById('id-copy')
    const file = fileInput.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '')
        setClientData((prevData) => ({
          ...prevData,
          idCopy: base64String
        }))

        try {
          const { firstName, middleName, lastName, idNumber, address, email, phoneNumber, idCopy } =
            clientData
          const result = await window.api.clientReg(
            firstName,
            middleName,
            lastName,
            idNumber,
            address,
            email,
            phoneNumber,
            idCopy
          )

          if (result) {
            toast.success('Client Registered Successfully')
            navigate('/Dashboard')
          }
        } catch (err) {
          toast.error(`Unable to register client: ${cleanErrorMessage(err)}`)
        }
      }
      reader.readAsDataURL(file)
    } else {
      toast.warning('Please select an ID copy for the client')
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side with the Form */}
      <div className="w-1/2 flex items-center justify-center bg-white p-8">
        <div className="max-w-lg w-full space-y-8">
          <div>
            <h2 className="text-center text-4xl font-bold text-gray-800">Register New Client</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 md:grid-cols-2">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <Input
                  id="first-name"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  value={clientData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="middle-name" className="block text-sm font-medium text-gray-700">
                  Middle Name
                </label>
                <Input
                  id="middle-name"
                  name="middleName"
                  type="text"
                  placeholder="Middle Name"
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  value={clientData.middleName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <Input
                  id="last-name"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  value={clientData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="id-number" className="block text-sm font-medium text-gray-700">
                  ID Number
                </label>
                <Input
                  id="id-number"
                  name="idNumber"
                  type="text"
                  placeholder="ID Number"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  value={clientData.idNumber}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Address"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  value={clientData.address}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  value={clientData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <Input
                  id="phone-number"
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  value={clientData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="id-copy" className="block text-sm font-medium text-gray-700">
                  ID Copy
                </label>
                <Input
                  id="id-copy"
                  name="id-copy"
                  type="file"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                />
              </div>
            </div>
            <div>
              <Button
                type="submit"
                className="w-full py-3 mt-6 font-semibold text-white bg-black rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side with the Image */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <img
          src={RegistrationImage}
          alt="Client Registration Illustration"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  )
}
