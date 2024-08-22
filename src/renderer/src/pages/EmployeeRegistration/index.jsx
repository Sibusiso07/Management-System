// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'

// // Utils.
// import { cleanErrorMessage } from '@/lib/utils'

// // UI Components.
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'

// export default function EmployeeRegistration() {
//   // Hook navigation.
//   const navigate = useNavigate()

//   const [employeeData, setEmployeeData] = useState({
//     employeeID: '',
//     firstName: '',
//     lastName: '',
//     idNumber: '',
//     email: '',
//     password: '',
//     department: '',
//     position: '',
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setEmployeeData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const { employeeID, firstName, lastName, idNumber, email, department, position, password } = employeeData
//       const result = await window.api.employeeReg(
//         employeeID,
//         firstName,
//         lastName,
//         idNumber,
//         email,
//         department,
//         position,
//         password
//       )

//       // Checking if employee is registered successfully and redirecting
//       if (result) {
//         toast.success('Employee Registered Successfully')
//         navigate('/Dashboard')
//       }
//     } catch (err) {
//       toast.error(`Unable to register employee: ${cleanErrorMessage(err)}`)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Register Employee</h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <input type="hidden" name="remember" defaultValue="true" />
//           <div className="rounded-md shadow-sm space-y-6">
//             <div className="grid grid-cols-1 gap-y-6 gap-x-4 md:grid-cols-2">
//               <div>
//                 <label htmlFor="employee-id" className="block text-sm font-medium text-gray-700">Employee ID</label>
//                 <Input
//                   id="employee-id"
//                   name="employeeID"
//                   type="text"
//                   placeholder="Employee ID"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   value={employeeData.employeeID}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First Name</label>
//                 <Input
//                   id="first-name"
//                   name="firstName"
//                   type="text"
//                   placeholder="First Name"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   value={employeeData.firstName}
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
//                   value={employeeData.lastName}
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
//                   value={employeeData.idNumber}
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
//                   value={employeeData.email}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//                 <Input
//                   id="password"
//                   name="password"
//                   type="password"
//                   placeholder="Password"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   value={employeeData.password}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
//                 <Input
//                   id="department"
//                   name="department"
//                   type="text"
//                   placeholder="Department"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   value={employeeData.department}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position</label>
//                 <Input
//                   id="position"
//                   name="position"
//                   type="text"
//                   placeholder="Position"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   value={employeeData.position}
//                   onChange={handleChange}
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
import EmployeeImage from '@/assets/locks.png' // Update with your image path

export default function EmployeeRegistration() {
  const navigate = useNavigate()

  const [employeeData, setEmployeeData] = useState({
    employeeID: '',
    firstName: '',
    lastName: '',
    idNumber: '',
    email: '',
    password: '',
    department: '',
    position: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { employeeID, firstName, lastName, idNumber, email, department, position, password } =
        employeeData
      const result = await window.api.employeeReg(
        employeeID,
        firstName,
        lastName,
        idNumber,
        email,
        department,
        position,
        password
      )

      if (result) {
        toast.success('Employee Registered Successfully')
        navigate('/Dashboard')
      }
    } catch (err) {
      toast.error(`Unable to register employee: ${cleanErrorMessage(err)}`)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side with the Image */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <img
          src={EmployeeImage}
          alt="Employee Registration Illustration"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Side with the Form */}
      <div className="w-1/2 flex items-center justify-center bg-white p-8">
        <div className="max-w-lg w-full space-y-8">
          <div>
            <h2 className="text-center text-4xl font-bold text-gray-800">Register Employee</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 md:grid-cols-2">
              <div>
                <label htmlFor="employee-id" className="block text-sm font-medium text-gray-700">
                  Employee ID
                </label>
                <Input
                  id="employee-id"
                  name="employeeID"
                  type="text"
                  placeholder="Employee ID"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  value={employeeData.employeeID}
                  onChange={handleChange}
                />
              </div>
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
                  value={employeeData.firstName}
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
                  value={employeeData.lastName}
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
                  value={employeeData.idNumber}
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
                  value={employeeData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  value={employeeData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <Input
                  id="department"
                  name="department"
                  type="text"
                  placeholder="Department"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  value={employeeData.department}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                  Position
                </label>
                <Input
                  id="position"
                  name="position"
                  type="text"
                  placeholder="Position"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  value={employeeData.position}
                  onChange={handleChange}
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
    </div>
  )
}
