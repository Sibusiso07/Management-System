import { useNavigate, useLocation } from 'react-router-dom'
import Dependents from '../../components/Dependents'
import CardForm from '../../components/CardForm'

function Package() {
  // Hook navigation.
  const navigate = useNavigate()

  // Hook location.
  const location = useLocation()
  const { data } = location.state

  // Function to convert base64 to URL
  const base64ToUrl = (base64String) => `data:image/jpeg;base64,${base64String}`

  const handleBackClick = () => {
    navigate('/Packages')
  }

  console.log('data >>>> ', data)

  return (
    <div className="text-white m-4 relative min-h-screen">
      <div style={{ display: 'grid' }} className="h-[90%] gap-4">
        <div className="grid-item bg-slate-200 mx-2 mt-2" style={{ gridRow: '1', gridColumn: '1' }}>
          <div className="my-8 text-2xl text-center">
            <h1>{data.package_name}</h1>
          </div>
          <div className="bg-gray-700 p-4 flex flex-col items-center">
            <img
              src={base64ToUrl(data.image)}
              alt={data.package_name}
              className="w-full h-32 object-cover mb-4"
            />
            <h2 className="text-xl mb-2">{data.package_name}</h2>
            <p className="text-sm mb-4">{data.details}</p>
            <p className="text-xl mb-2">{data.price}</p>
          </div>
          <button
            onClick={handleBackClick}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-8"
          >
            Back
          </button>
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
      <button className="justify-center py-2 mx-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Save all
      </button>
    </div>
  )
}

export default Package
