import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'

// Auth Context.
import { AuthContext } from '../context/AuthContext';

function PackageItem() {
    // Hook auth context.
    const { packageItem } = useContext(AuthContext);

    // Hook navigation.
    const navigate = useNavigate()

    const handleBackClick = () => {
        navigate('/Packages')
    };

    return (
        <div className="text-white m-4 relative min-h-screen">
            <div className="my-8 text-2xl text-center">
                <h1>{packageItem.Name}</h1>
            </div>
            <div className="bg-gray-700 p-4 flex flex-col items-center">
                <img src={packageItem.ImageUrl} alt={packageItem.Name} className="w-full h-32 object-cover mb-4" />
                <h2 className="text-xl mb-2">{packageItem.Name}</h2>
                <p className="text-sm mb-4">{packageItem.Details}</p>
                <p className="text-xl mb-2">{packageItem.Price}</p>
            </div>
            <button 
                onClick={handleBackClick}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-8"
            >
                Back
            </button>
        </div>
    );
}

export default PackageItem;
