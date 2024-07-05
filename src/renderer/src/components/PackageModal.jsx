// PackageModal.js
import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';

// Set the app element to your main content's root element
Modal.setAppElement('#root');

// Modal styles
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#1a202c',
    color: 'white',
    borderRadius: '10px',
    padding: '20px',
    width: '80%', // Adjust width to your preference
    maxWidth: '600px', // Adjust maxWidth to your preference
  },
};

const PackageModal = ({ isOpen, onRequestClose, packageData }) => {
    // useRef Hook.
    const fileInputRef = useRef(null)

    // States.
    const [id, setId] = useState();
    const [packageID, setPackageID] = useState();
    const [packageName, setPackageName] = useState();
    const [details, setDetails] = useState();
    const [price, setPrice] = useState();
    const [image, setImage] = useState(null)

    useEffect(() => {
        // console.log("package data >>> ", packageData[0].id)
        if (packageData) {
          setId(packageData[0].id || '');
          setPackageID(packageData[0].package_id || '');
          setPackageName(packageData[0].package_name || '');
          setDetails(packageData[0].details || '');
          setPrice(packageData[0].price || '');
        }
      }, [packageData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (image) {
                const reader = new FileReader();
                reader.onloadend = async () => {
                const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
                await window.api.editPackage(id, packageID, packageName, details, price, base64String);
                alert('Package Edited Successfully');
                onRequestClose;
                };
                reader.readAsDataURL(image);
            } else {
                alert('No Image Selected');
            }
        } catch (error) {
        alert('Error adding package', error.message);
        console.error(error);
        }
    };

    const handleFileChange = (event) => {
        setImage(event.target.files[0])
      }

    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel="Package Details"
        >
        <h2 className="text-2xl font-bold mb-4">Package Details</h2>
        {packageData ? (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm -space-y-px">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 md:grid-cols-2">
                    <div>
                    <input
                        id="package-id"
                        name="package-id"
                        type="text"
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
                        ref={fileInputRef}
                        onChange={handleFileChange}   
                        id="image"
                        name="image"
                        type="file"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                    </div>
                </div>
                </div>
                <div className="flex w-full gap-4">
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Edit Package
                </button>
                </div>
            </form>
        ) : (
            <p>No package found</p>
        )}
        <button onClick={onRequestClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Close</button>
        </Modal>
    );
};

export default PackageModal;
