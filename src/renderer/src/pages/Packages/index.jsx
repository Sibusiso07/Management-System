import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'

// Auth Context.
import { AuthContext } from './../../context/AuthContext'

function Packages() {
    // Creating Packages.
    const dummyData = [
        {
            PackageId: 1,
            Name: "Package 1",
            Details: "This is package 1 and what you get from it",
            ImageUrl: "https://via.placeholder.com/150",
            Price: "R100"
        },
        {
            PackageId: 2,
            Name: "Package 2",
            Details: "This is package 2 and what you get from it",
            ImageUrl: "https://via.placeholder.com/150",
            Price: "R200"
        },
        {
            PackageId: 3,
            Name: "Package 3",
            Details: "This is package 3 and what you get from it",
            ImageUrl: "https://via.placeholder.com/150",
            Price: "R300"
        }
    ];
    
    // Hook navigation.
    const navigate = useNavigate()

    // State to hold the packages.
    const [packageData, setPackageData] = useState(dummyData);

    // Hook auth context.
    const { setPackageItem } = useContext(AuthContext)

    const handleClick = (item) => {
        // Set the package
        setPackageItem(item)
        // Navigate to page.
        navigate(`/Packages/${item.PackageId}`)
    };

    return (
        <div className="text-white m-4">
            <div className="my-8 text-2xl text-center">
                <h1>Packages</h1>
            </div>
            <div className="flex flex-wrap gap-4 items-center justify-center">
                {packageData.map((item) => (
                    <div 
                        key={item.PackageId}
                        className="bg-gray-700 p-4 flex flex-col items-center w-64"
                    >
                        <img src={item.ImageUrl} alt={item.Name} className="w-full h-32 object-cover mb-4" />
                        <h2 className="text-xl mb-2">{item.Name}</h2>
                        <p className="text-sm mb-4">{item.Details}</p>
                        <button 
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => handleClick(item)}
                        >
                            More Info
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Packages;
