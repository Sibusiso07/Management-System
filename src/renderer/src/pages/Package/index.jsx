import { useNavigate, useLocation } from 'react-router-dom'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'

// Components
import Dependents from '@/components/util/Dependents'
import CardForm from '@/components/util/CardForm'

// UI Components.
import { Button } from '@/components/ui/button'

// Auth Context.
import { AuthContext } from '@/context/AuthContext'

// Utils.
import { cleanErrorMessage } from '@/lib/utils'

function Package() {
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: ''
  })

  // Hook navigation.
  const navigate = useNavigate()
  // Hook auth context.
  const { user } = useContext(AuthContext)

  // Hook location.
  const location = useLocation()
  const { details, items } = location.state.data

  const handleBackClick = () => {
    navigate('/Packages')
  }

  // Handle save all.
  const handleSaveAll = async (e) => {
    e.preventDefault()
    try {
      if (paymentInfo.cardNumber.length === 16) {
        // Desttructure values from state.
        const { cardNumber, cardholderName, expiryDate, cvv } = paymentInfo

        // Build payment paramlist.
        const paymentParamlist = {
          p_card_number: cardNumber,
          p_card_holder: cardholderName,
          p_expiry_date: expiryDate,
          p_cvv: cvv,
          p_user_id: user.id
        }

        // Attempt to save the payment information.
        await window.api.executeFunction('insert_payment_information', paymentParamlist)

        // Build package paramlist.
        const paramlist = {
          p_client_id: user.id,
          p_package_id: details.id
        }
        // Attempt to execute stored procedure.
        await window.api.executeFunction('link_user_to_package', paramlist)

        // Notify the user of successful sign up.
        toast.success('Successfully linked client to package')
      } else {
        toast.warning('Please make sure that the Card Number has 16 digits')
      }
    } catch (err) {
      toast.error(`Error saving: ${cleanErrorMessage(err)}`)
    }
  }

  return (
    <div className="text-white m-4 relative min-h-screen">
      <div style={{ display: 'grid' }} className="h-[90%] gap-4">
        <div
          className="grid-item p-4 border border-gray-300 rounded-lg mx-2 mt-2"
          style={{ gridRow: '1', gridColumn: '1' }}
        >
          <div className="text-center my-8">
            <h1 className="text-2xl">{details.package_name}</h1>
          </div>
          <div className="flex">
            <div className="w-1/2 p-4">
              <h2 className="text-xl mb-2">Package Details</h2>
              <p className="text-sm mb-4">{details.details}</p>
              <p className="text-xl mb-2">{details.price}</p>
            </div>
            <div className="w-1/2 p-4">
              <h2 className="text-xl mb-2">Package Items</h2>
              {items.map((item, index) => (
                <div key={index} className="mb-2">
                  {item.item_name}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Button
              onClick={handleBackClick}
              className="bg-blue-500 text-white px-4 py-2 rounded mx-2"
            >
              Back
            </Button>
          </div>
        </div>
        <div className="flex gap-4 mb-2">
          <div className="grid-item w-[50%] ml-2" style={{ gridRow: '2', gridColumn: '1' }}>
            <Dependents />
          </div>
          <div className="grid-item w-[50%] mr-2" style={{ gridRow: '2', gridColumn: '2' }}>
            <CardForm paymentInfo={paymentInfo} setPaymentInfo={setPaymentInfo} />
          </div>
        </div>
      </div>
      <Button
        onClick={handleSaveAll}
        className="justify-center py-2 mx-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save all
      </Button>
    </div>
  )
}

export default Package
