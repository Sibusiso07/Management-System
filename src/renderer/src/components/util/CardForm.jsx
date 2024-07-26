import { Input } from '../ui/input'

export default function CardForm({ paymentInfo, setPaymentInfo }) {
  return (
    <div className="flex justify-center items-center h-full">
      <form className="relative p-4 border border-gray-300 rounded-lg w-full h-full">
        <h2 className="text-2xl font-semibold mb-4">Card Information</h2>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="cardNumber">
            Card Number
          </label>
          <Input
            id="cardNumber"
            type="text"
            value={paymentInfo.cardNumber}
            onChange={(e) =>
              setPaymentInfo({
                ...paymentInfo,
                cardNumber: e.target.value
              })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="cardholderName">
            Cardholder Name
          </label>
          <Input
            id="cardholderName"
            type="text"
            value={paymentInfo.cardholderName}
            onChange={(e) =>
              setPaymentInfo({
                ...paymentInfo,
                cardholderName: e.target.value
              })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="John Doe"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="expiryDate">
            Expiry Date
          </label>
          <Input
            id="expiryDate"
            type="text"
            value={paymentInfo.expiryDate}
            onChange={(e) =>
              setPaymentInfo({
                ...paymentInfo,
                expiryDate: e.target.value
              })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="MM/YY"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="cvv">
            CVV
          </label>
          <Input
            id="cvv"
            type="text"
            value={paymentInfo.cvv}
            onChange={(e) =>
              setPaymentInfo({
                ...paymentInfo,
                cvv: e.target.value
              })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="123"
            required
          />
        </div>
      </form>
    </div>
  )
}
