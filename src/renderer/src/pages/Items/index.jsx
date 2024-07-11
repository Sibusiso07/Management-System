import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

export default function Items() {
  const navigate = useNavigate()
  const location = useLocation()

  // State.
  const [packageItems, setPackageItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])

  // Extracting id from location state
  const { package_id } = location.state || {}

  // On package load.
  useEffect(() => {
    fetchPackageItems();
    console.log("package_id >>> ", package_id)
  }, [])

  // Fetching package data from the DB.
  const fetchPackageItems = async () => {
    try {
      // Set loading state.
      setLoading(true);

      // Make call to retrieve packages.
      const result = await window.api.getItems()
      // console.log('results >>>> ', result);

      // Making sure the data is in an array.
      setPackageItems(result);
    } catch (err) {
      console.error('Unable to fetch data from DB: ', err)
      setPackageItems([]) // or handle error state
    } finally {
      setLoading(false)
    }
  };

  const handleToggle = (item_id) => {
    if (selectedItems.includes(item_id)) {
      setSelectedItems(prevSelectedItems => prevSelectedItems.filter(id => id !== item_id))
    } else {
      setSelectedItems(prevSelectedItems => [...prevSelectedItems, item_id])
    }
  }

  const handleDone = async () => {
    try {
      // Linking items to package
      await window.api.linkPackageItems(package_id, selectedItems)
      console.log(`Successfully linked package and its items`)
      navigate('/Packages')
    } catch (error) {
      console.error('Error writing to DB:', error)
    }
  }

  return (
    <div className="text-white m-4">
      <div className="my-8 text-2xl text-center">
        <h1>Select Package Items</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Item Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Select Item</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td className="px-6 py-3 whitespace-nowrap" colSpan="2">Loading...</td>
              </tr>
            ) : (
              packageItems.map((item) => (
                <tr key={item.item_id}>
                  <td className="px-6 py-3 whitespace-nowrap">{item.item_name}</td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <button
                      className={`w-10 h-5 rounded-full p-1 transition-colors ${selectedItems.includes(item.item_id) ? 'bg-green-500' : 'bg-gray-300'}`}
                      onClick={() => handleToggle(item.item_id)}
                    >
                      <span className={`block rounded-full w-3 h-3 bg-white shadow-md transform transition-transform ${selectedItems.includes(item.item_id) ? 'translate-x-5' : 'translate-x-0'}`}></span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleDone}>
          Done
        </button>
      </div>
    </div>
  );
}
