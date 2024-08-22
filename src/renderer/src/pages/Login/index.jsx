import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '@/context/AuthContext'
import { cleanErrorMessage } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import LoginImage from '@/assets/locks.png'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai' // Import eye icons from react-icons

const Login = () => {
  const [username, setUsername] = useState('josh@gmail.com')
  const [password, setPassword] = useState('test')
  const [showPassword, setShowPassword] = useState(false) // State for toggling password visibility
  const [error, setError] = useState('')

  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    try {
      e.preventDefault()
      const result = await window.api.login(username, password)
      if (result) {
        setUser(result)
        if (result.has_package === false) {
          navigate('/Packages')
        } else {
          navigate('/ClientDashboard')
        }
      }
    } catch (err) {
      toast.error(`Error during Login attempt: ${cleanErrorMessage(err)}`)
      setError(cleanErrorMessage(err))
    }
  }

  return (
    <div className="flex min-h-screen w-screen">
      {/* Left Side with the Illustration */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <img src={LoginImage} alt="Locks Illustration" className="object-cover w-full h-full" />
      </div>

      {/* Right Side with the Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="max-w-md w-full space-y-8 p-8">
          <h1 className="text-4xl font-bold text-gray-800">Welcome back!</h1>
          <p className="text-gray-500">Please enter your login details to continue.</p>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <Input
                id="email-address"
                name="email"
                type="email"
                placeholder="Email"
                required
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900" // Ensure text is visible
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'} // Toggle between text and password
                  placeholder="Password"
                  required
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900" // Ensure text is visible
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible className="text-gray-500" size={24} />
                  ) : (
                    <AiFillEye className="text-gray-500" size={24} />
                  )}
                </div>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Button
              type="submit"
              className="w-full py-3 mt-6 font-semibold text-white bg-black rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log In
            </Button>
            <div className="flex justify-between items-center">
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
              <p className="text-center text-sm text-gray-600">
                Don’t have an account?{' '}
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
