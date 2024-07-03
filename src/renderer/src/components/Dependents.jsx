import React, { useState } from 'react';

export default function Dependents() {
  // States.
  const [dependents, setDependents] = useState([]);

  return (
    <div className="relative p-4 border border-gray-300 rounded-lg w-full h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Dependents</h2>
        <button className="px-4 py-2 text-white rounded bg-blue-500 hover:bg-blue-700 top-right">Add</button>
      </div>
      <div className="flex flex-col items-center justify-center h-40 mt-4">
        {dependents.length === 0 ? (
            <p className="text-gray-500">Add dependents</p>
        ) : (
          <ul>
              {dependents.map((dependent, index) => (
                  <li key={index}>{dependent}</li>
              ))}
          </ul>
        )}
      </div>
      <div className="absolute bottom-4 right-4">
        <button className="px-4 py-2 text-white rounded bg-green-500 hover:bg-green-700">Calculation</button>
      </div>
    </div>
  );
}
