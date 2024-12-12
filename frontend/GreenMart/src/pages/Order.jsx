import { Button } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'


function Order() {


  const [order, setOrder] = useState();

  const statusColors = {
    pending: 'bg-yellow-200 text-yellow-800',
    confirmed: 'bg-blue-200 text-blue-800',
    shipped: 'bg-purple-200 text-purple-800',
    'out for delivery': 'bg-orange-200 text-orange-800',
    delivered: 'bg-green-200 text-green-800',
  };

  const handleStatusChange = (index, newStatus) => {
    // Logic to update status in backend or state
    console.log(`Status for order ${index + 1} changed to ${newStatus}`);
  };


  const fetchAllOrders = async () => {
    const url = "http://localhost:4500/allorder";
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(url, {
        headers: {
          Authorization: token
        }
      })
      setOrder(response.data.allorder);
      console.log(response.data);

    } catch (error) {
      console.log(error.msg);

    }

  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">This is the Order Page</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Sr.No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Product Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Customer Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Contact No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {order && order.map((temp, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{temp.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{temp.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{temp.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{temp.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{temp.mobileNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <select
                    className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 ${statusColors[temp.status]}`}
                    value={temp.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="out for delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Order
