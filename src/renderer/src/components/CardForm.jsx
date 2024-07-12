import React, { useState, useContext } from 'react';

// Auth Context.
import { AuthContext } from '../context/AuthContext'

export default function CardForm() {
  // Hook auth context.
  const { user } = useContext(AuthContext)

  // States.
  const [cardNumber, setCardNumber] = useState('')
  const [cardholderName, setCardholderName] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')

  // Handle Submit button.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (cardNumber.length !== 16) {
        alert('Please make sure that the Card Number has 16 digits')
      } else {
        await window.api.addCardInfo(cardNumber, cardholderName, expiryDate, cvv, user.id)
        alert('Card Information Added Successfully')
        onRequestClose()
    }
    } catch (error) {
      alert('Error adding card info: ', error.message)
      console.error(error)
    }
  }

  return (
    <div className="flex justify-center items-center h-full">
      <form className="relative p-4 border border-gray-300 rounded-lg w-full h-full" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4">Card Information</h2>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="cardNumber">
            Card Number
          </label>
          <input
            id="cardNumber"
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="cardholderName">
            Cardholder Name
          </label>
          <input
            id="cardholderName"
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="John Doe"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="expiryDate">
            Expiry Date
          </label>
          <input
            id="expiryDate"
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="MM/YY"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="cvv">
            CVV
          </label>
          <input
            id="cvv"
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="123"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
