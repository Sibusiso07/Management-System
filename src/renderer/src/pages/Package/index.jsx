import { useNavigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { toast } from 'react-toastify'

// Components
import Dependents from '@/components/util/Dependents'
import CardForm from '@/components/util/CardForm'

// UI Components.
import { Button } from '@/components/ui/button'

// Auth Context.
import { AuthContext } from '@/context/AuthContext'

// Utils.
import { cleanErrorMessage } from '@/lib/utils'

function Package() {
  // Hook navigation.
  const navigate = useNavigate()
  // Hook auth context.
  const { user } = useContext(AuthContext)

  // Hook location.
  const location = useLocation()
  const { details, items } = location.state.data

  // console.log('package form data >>>', details, items)

  // Function to convert base64 to URL
  const base64ToUrl = (base64String) => `data:image/jpeg;base64,${base64String}`

  const handleBackClick = () => {
    navigate('/Packages')
  }

  const handleSavePackage = async (e) => {
    e.preventDefault()
    try {
      const response = await window.api.linkClientPackage(user.id, details.id)
      toast.success('Successfully linked client to package')
    } catch (err) {
      console.log('frontend :', err)
      toast.error(`Unable to link client to package: ${cleanErrorMessage(err)}`)
    }
  }

  return (
    <div className="text-white m-4 relative min-h-screen">
      <div style={{ display: 'grid' }} className="h-[90%] gap-4">
        <div
          className="grid-item p-4 border border-gray-300 rounded-lg mx-2 mt-2"
          style={{ gridRow: '1', gridColumn: '1' }}
        >
          <div className="text-center my-8">
            <h1 className="text-2xl">{details.package_name}</h1>
          </div>
          <div className="flex">
            <div className="w-1/2 p-4">
              <h2 className="text-xl mb-2">Package Details</h2>
              <p className="text-sm mb-4">{details.details}</p>
              <p className="text-xl mb-2">{details.price}</p>
            </div>
            <div className="w-1/2 p-4">
              <h2 className="text-xl mb-2">Package Items</h2>
              {items.map((item, index) => (
                <div key={index} className="mb-2">
                  <p>{item.item_name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Button
              onClick={handleBackClick}
              className="bg-blue-500 text-white px-4 py-2 rounded mx-2"
            >
              Back
            </Button>
            <Button
              onClick={handleSavePackage}
              className="bg-blue-500 text-white px-4 py-2 rounded mx-2"
            >
              Save Package
            </Button>
          </div>
        </div>
        <div className="flex gap-4 mb-2">
          <div className="grid-item w-[50%] ml-2" style={{ gridRow: '2', gridColumn: '1' }}>
            <Dependents />
          </div>
          <div className="grid-item w-[50%] mr-2" style={{ gridRow: '2', gridColumn: '2' }}>
            <CardForm />
          </div>
        </div>
      </div>
      <Button className="justify-center py-2 mx-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Save all
      </Button>
    </div>
  )
}

export default Package
