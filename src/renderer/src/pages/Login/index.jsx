import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// Auth Context.
import { AuthContext } from './../../context/AuthContext'

const Login = () => {
  const [username, setUsername] = useState('josh@gmail.com')
  const [password, setPassword] = useState('test')

  // Hook auth context.
  const { setUser } = useContext(AuthContext)

  // Hook navigation.
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    try {
      e.preventDefault()

      // TODO: Trigger login and save user result to context.
      const result = await window.api.login(username, password)

      // console.log('login result >>>', result)

      if (result) {
        // Set user context.
        setUser(result)

        // Check if a client has an packages assigned to them.
        if (result.Haspackage) {
          return
        } else {
          // Client has no packages assigned to them so navigate to packages page.
          navigate('/packages')
        }
      }
    } catch (error) {
      console.error('Error during login attempt:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="mt-6 text-center text-4xl font-extrabold text-white-600">
          Management System
        </h1>
        <div>
          <h2 className="mt-6 text-center text-3xl font-semibold text-white-400">Sign In</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => handleLogin(e)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                placeholder="Email address"
                required
                className="
              appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 
              placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 
              focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
                className="
              appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 
              placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 
              focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="
            group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium 
            rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
            focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
