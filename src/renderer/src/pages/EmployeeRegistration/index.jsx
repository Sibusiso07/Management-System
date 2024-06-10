import { useState } from "react";

export default function EmployeeRegistration() {

  const [employeeID, setEmployeeId] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [idNumber, setIdNumber] = useState('')
  const [email, setEmail] = useState('')
  const [department, setDepartment] = useState('')
  const [position, setPosition] = useState('')

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const result = await window.api.employeeReg(employeeID, firstName, lastName, idNumber, email, department, position)

      if (result) {
        alert('User Registered Successfully')
      } else {
        alert('Failed to Register User')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Register Employee
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 md:grid-cols-2">
              <div>
                <input
                  id="employee-id"
                  name="employee-id"
                  type="text"
                  placeholder="Employee ID"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={employeeID}
                  onChange={(e) => setEmployeeId(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  placeholder="First Name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  placeholder="Last Name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="id-number"
                  name="id-number"
                  type="text"
                  placeholder="ID Number"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="department"
                  name="department"
                  type="text"
                  placeholder="Department"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="position"
                  name="position"
                  type="text"
                  placeholder="Position"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
