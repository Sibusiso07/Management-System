import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddPackage() {
    // Hook navigation.
    const navigate = useNavigate()

    // States.
    const [packageID, setPackageID] = useState('');
    const [packageName, setPackageName] = useState('');
    const [details, setDetails] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

  // Handle Submit button.
  const handleSubmit = async (e) => {
    e.preventDefault();

     // Covert the Image to base64
     const fileInput = document.getElementById('image')
     const file = fileInput.files[0]

     if (file) {
       const reader = new FileReader()
       reader.onloadend = async () => {
         // Remove the Data URL prefix to get the pure base64 string
         const base64String = reader.result.replace('data:', '').replace(/^.+,/, '')
         setImage(base64String)

            try {
            const result = await window.api.addPackage(packageID, packageName, details, price, image);

            if (result) {
                alert('Package Added Successfully');
            } else {
                alert('Failed to Add Package');
            }
            } catch (error) {
            console.error(error);
            }

        }
        reader.readAsDataURL(file)
    } else {
        alert('No Image Selected')
    }
  };

  // Handle back button.
  const handleBackClick = () => {
    navigate('/Packages')
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div>
            <button onClick={handleBackClick} className="bg-blue-500 text-white px-4 py-2 rounded mt-8 top-4 left-4 absolute">
                Back
            </button>
        </div>
      <div className="max-w-lg w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Add New Package
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 md:grid-cols-2">
              <div>
                <input
                  id="package-id"
                  name="package-id"
                  type="text"
                  placeholder="Package ID"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={packageID}
                  onChange={(e) => setPackageID(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="package-name"
                  name="package-name"
                  type="text"
                  placeholder="Package Name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={packageName}
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
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Price"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="image"
                  name="image"
                  type="file"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Package
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
