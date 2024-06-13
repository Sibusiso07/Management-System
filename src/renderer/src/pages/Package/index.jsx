import { useNavigate, useLocation } from 'react-router-dom'

function Package() {
  // Hook navigation.
  const navigate = useNavigate()

  // Hook location.
  const location = useLocation()
  const { data } = location.state

  const handleBackClick = () => {
    navigate('/Packages')
  }

  return (
    <div className="text-white m-4 relative min-h-screen">
      <div className="my-8 text-2xl text-center">
        <h1>{data.Name}</h1>
      </div>
      <div className="bg-gray-700 p-4 flex flex-col items-center">
        <img src={data.ImageUrl} alt={data.Name} className="w-full h-32 object-cover mb-4" />
        <h2 className="text-xl mb-2">{data.Name}</h2>
        <p className="text-sm mb-4">{data.Details}</p>
        <p className="text-xl mb-2">{data.Price}</p>
      </div>
      <button onClick={handleBackClick} className="bg-blue-500 text-white px-4 py-2 rounded mt-8">
        Back
      </button>
    </div>
  )
}

export default Package
