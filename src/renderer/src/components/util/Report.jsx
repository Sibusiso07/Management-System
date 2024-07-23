import React from 'react'

export default function Report() {
  return (
    <div id="report" className="p-4">
      <h1 className="text-2xl font-bold">Monthly Report</h1>
      <p className="mt-2">This is the content of the monthly report.</p>
      <table className="mt-4 w-full table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">2024-07-01</td>
            <td className="border border-gray-300 px-4 py-2">Sales</td>
            <td className="border border-gray-300 px-4 py-2">$5000</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">2024-07-02</td>
            <td className="border border-gray-300 px-4 py-2">Expenses</td>
            <td className="border border-gray-300 px-4 py-2">$1500</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">2024-07-03</td>
            <td className="border border-gray-300 px-4 py-2">Sales</td>
            <td className="border border-gray-300 px-4 py-2">$3000</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
