import React, { useEffect, useState, useContext } from 'react';
import DependentsModal from './DependentsModal';

// Auth Context.
import { AuthContext } from '../context/AuthContext';

export default function Dependents() {
  // Hook auth context.
  const { user } = useContext(AuthContext)

  // States.
  const [dependents, setDependents] = useState([])
  const [modalIsOpen, setIsOpen] = useState(false)
  const [clientId, setClientId] = useState(user.id)

  // Rendaring dependants.
  useEffect(() => {
    if (clientId) {
      fetchDependants();
    }
  }, [clientId]);

  // Getting dependants.
  const fetchDependants = async () => {
    try {
      const results = await window.api.getDependants(clientId)
      console.log("results >>>", results[0])
      setDependents(results[0])
    } catch (err) {
      console.error('Unable to fetch dependants: ', err)
    }
  }

  // Handle Add button.
  const handleAdd = () => {
    setIsOpen(true)
  }
  
  // Closing the modal and setting the search results to null.
  const closeModal = () => {
    setIsOpen(false)
  }


  return (
    <div className="relative p-4 border border-gray-300 rounded-lg w-full h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Dependents</h2>
        <button 
        className="px-4 py-2 text-white rounded bg-blue-500 hover:bg-blue-700 top-right"
        onClick={handleAdd}
        > 
          Add
        </button>
      </div>
      <div className="flex flex-col items-center justify-center h-40 mt-4">
        {dependents.length === 0 ? (
            <p className="text-gray-500">Add dependents</p>
        ) : (
          <ul>
            {dependents.map((dependent) => (
              <li key={dependent.dependent_id}>{dependent.first_name}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="absolute bottom-4 right-4">
        <button className="px-4 py-2 text-white rounded bg-green-500 hover:bg-green-700">Calculation</button>
      </div>
      <DependentsModal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal}
        clientId={clientId}
        appElement={document.getElementById('root')}  
      />
    </div>
  );
}
