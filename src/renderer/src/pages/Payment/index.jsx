import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'react-toastify'

export default function Payment() {
  const [clients, setClients] = useState([])
  const [payments, setPayments] = useState({})

  useEffect(() => {
    // Fetch clients when the component is mounted.
    loadClients()
  }, [])

  const loadClients = async () => {
    // Empty Params list.
    const paramlist = {}
    // Fetching clients.
    const clients = await window.api.executeFunction('get_client_details', paramlist)
    setClients(clients)
  }

  const handleInputChange = (id, value) => {
    setPayments((prevPayments) => ({
      ...prevPayments,
      [id]: value,
    }))
  }

  const handleSave = async (client) => {
    try {
      const amountPaid = payments[client.id] || 0
      if (amountPaid <= 0) {
        toast.warning('Please enter a valid amount')
        return
      }

      const paramlist = {
				p_client_id: client.id,
				p_amount_due: client.amountDue,
				p_amount_paid: amountPaid
			}
      await window.api.executeFunction('process_payment', paramlist)
      toast.success(`Payment of $${amountPaid} saved for ${client.firstname}`)
    } catch (error) {
      toast.error('Error saving payment')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <h2 className="text-center text-3xl font-extrabold text-white">Process Payments</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Client Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount Due</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount Paid</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{client.firstname} {client.lastname}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">R{client.amountDue}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Input
                    type="number"
                    placeholder="Enter Amount"
                    value={payments[client.id] || ''}
                    onChange={(e) => handleInputChange(client.id, e.target.value)}
                    className="bg-gray-700 text-white"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button onClick={() => handleSave(client)} className="bg-sky-600 text-white">Save</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


// import React, { useState, useEffect } from 'react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { toast } from 'react-toastify'

// export default function UserInsertionForm() {
//   const [clients, setClients] = useState([])
//   const [selectedClient, setSelectedClient] = useState(null)
//   const [amountDue, setAmountDue] = useState('')
//   const [amountPaid, setAmountPaid] = useState('')

//   useEffect(() => {
//     // Fetch clients.
//     loadClients()
//   }, [])

//   const loadClients = async () => {
//     // Empty Params list.
//     const paramlist = {}
//     // Fetching clients.
//     const clients = await window.api.executeFunction('get_client_details', paramlist)
//     setClients(clients)
//   }

//   const handleClientChange = (e) => {
//     const client = clients.find((c) => c.id === parseInt(e.target.value))
//     setSelectedClient(client)
//     setAmountDue(client.amountDue) // Automatically set amount due based on selected client
//   }

//   const handleSave = async () => {
//     try {
//       if (!selectedClient || !amountDue || !amountPaid) {
//         toast.warning('Please fill out all fields')
//         return
//       }

//      const paramlist = {
		// 		p_client_id: client.id,
		// 		p_amount_due: client.amountDue,
		// 		p_amount_paid: amountPaid
		// 	}
    //   await window.api.executeFunction('process_payment', paramlist)
    //   toast.success(`Payment of $${amountPaid} saved for ${client.firstname}`)
    // } catch (error) {
    //   toast.error('Error saving payment')
    // }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <h2 className="text-center text-3xl font-extrabold text-white">Process Payment</h2>
//         <div>
//           <label htmlFor="client" className="block text-sm font-medium text-gray-200">Client</label>
//           <select
//             id="client"
//             name="client"
//             className="bg-gray-700 text-white mt-1 block w-full pl-3 pr-10 py-2 border-gray-600 focus:outline-none sm:text-sm rounded-md"
//             onChange={handleClientChange}
//           >
//             <option value="">Select Client</option>
//             {clients.map((client) => (
//               <option key={client.id} value={client.id}>
//                 {client.firstname} {client.lastname}
//               </option>
//             ))}
//           </select>
//         </div>
//         {selectedClient && (
//           <div className="space-y-6">
//             <div>
//               <label htmlFor="amount-due" className="block text-sm font-medium text-gray-200">Amount Due</label>
//               <Input
//                 id="amount-due"
//                 name="amount-due"
//                 type="number"
//                 placeholder="Amount Due"
//                 className="bg-gray-800 text-white"
//                 value={amountDue}
//                 onChange={(e) => setAmountDue(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="amount-paid" className="block text-sm font-medium text-gray-200">Amount Paid</label>
//               <Input
//                 id="amount-paid"
//                 name="amount-paid"
//                 type="number"
//                 placeholder="Amount Paid"
//                 className="bg-gray-800 text-white"
//                 value={amountPaid}
//                 onChange={(e) => setAmountPaid(e.target.value)}
//               />
//             </div>
//             <Button onClick={handleSave} className="bg-sky-600 text-white">Save</Button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
