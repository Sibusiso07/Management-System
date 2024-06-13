import React, { useState } from 'react';

function Packages() {
    // Creating Packages.
    const dummyData = [
        {
            PackageId: 1,
            Name: "Package 1",
            Details: "This is package 1 and what you get from it",
            ImageUrl: "https://via.placeholder.com/150"
        },
        {
            PackageId: 2,
            Name: "Package 2",
            Details: "This is package 2 and what you get from it",
            ImageUrl: "https://via.placeholder.com/150"
        },
        {
            PackageId: 3,
            Name: "Package 3",
            Details: "This is package 3 and what you get from it",
            ImageUrl: "https://via.placeholder.com/150"
        }
    ];

    // State to hold the packages.
    const [packageData, setPackageData] = useState(dummyData);

    return (
        <div className="text-white m-4">
            <div className="my-8 text-2xl text-center">
                <h1>Packages</h1>
            </div>
            <div className="flex flex-wrap gap-4 items-center justify-center">
                {Array.isArray(packageData) && packageData.map((item) => (
                    <div 
                        key={item.PackageId}
                        className="bg-gray-700 p-4 flex flex-col items-center w-64"
                    >
                        <img src={item.ImageUrl} alt={item.Name} className="w-full h-32 object-cover mb-4" />
                        <h2 className="text-xl mb-2">{item.Name}</h2>
                        <p className="text-sm mb-4">{item.Details}</p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded">More Info</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Packages;
