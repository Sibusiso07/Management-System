import React, { useState } from 'react';
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

const DependentsModal = ({ isOpen, onRequestClose }) => {

  // States.
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [idnumber, setIdnumber] = useState();

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          await window.api.addDependent(firstname, lastname, idnumber);
          alert('Dependent Added Successfully');
          onRequestClose;      
      } catch (error) {
      alert('Error adding dependent', error.message);
      console.error(error);
      }
  };

  return (
      <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Dependent Details"
      >
      <h2 className="text-2xl font-bold mb-4">Add Dependent</h2>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 md:grid-cols-2">
                  <div>
                  <input
                      id="firstname"
                      name="firstname"
                      type="text"
                      placeholder="First Name"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                  />
                  </div>
                  <div>
                  <input
                      id="lastname"
                      name="lastname"
                      type="text"
                      placeholder="Last Name"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                  />
                  </div>
                  <div>
                  <input
                      id="idnumber"
                      name="idnumber"
                      placeholder="ID Number"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      value={idnumber}
                      onChange={(e) => setIdnumber(e.target.value)}
                  />
                  </div>
              </div>
              </div>
              <div className="flex w-full gap-4">
                  <button
                      type="submit"
                      className="relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                      Add Dependent
                  </button>
              </div>
          </form>
      <button onClick={onRequestClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Close</button>
      </Modal>
  );
};

export default DependentsModal;
