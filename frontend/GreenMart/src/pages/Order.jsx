import { Button, Stack } from '@chakra-ui/react';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { authorizationToken } from '../utils/Token';
import { deleteProductUrl, fetchAllProductUrl, updateProductUrl } from '../utils/Url';


function Order() {
  const [order, setOrder] = useState();
  const [status, setStatus] = useState("pending");

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(fetchAllProductUrl, authorizationToken)
      setOrder(response.data.allorder);

    } catch (error) {
      console.log(error.msg);

    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])


  const handleChange = async (order, payload) => {

    try {
      const response = await axios.patch(`${updateProductUrl}/${order._id}`, payload, authorizationToken)

      fetchAllOrders();
    } catch (error) {
      console.log(error.message);

    }

  }




  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${deleteProductUrl}/${id}`, authorizationToken)

      fetchAllOrders();
    } catch (error) {
      console.log(error.message);

    }
  }


  //  enum:["pending" , "confirmed", "shipped" , "out for delivery" , "delivered"] , 
  function setBackgroundcolco(status) {

    switch (status) {
      case 'pending':
        return 'yellow'; // Orange
      case 'Confirmed':
        return '#5bc0de'; // Blue
      case 'shipped':
        return '#5cb85c'; // Green
      case 'out for delivery':
        return '#d9534f'; // Red
      case 'delivered':
        return 'blue'; // Red
      default:
        return '#000'; // Default black
    }
  }




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
            {!order ? (
              <tr>
                <td colSpan="8"className="px-6 py-4" >
                  <div className="space-y-4">
                    <Skeleton height="30px" />
                    <Skeleton height="30px" />
                    <Skeleton height="30px" />
                    <Skeleton height="30px" />
                    <Skeleton height="30px" />
                    <Skeleton height="30px" />
                    <Skeleton height="30px" />
                    <Skeleton height="30px" />
                  </div>
                </td>
              </tr>
            ) : (order.map((temp, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{temp.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{temp.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{temp.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{temp.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{temp.mobileNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">

                  <select
                    className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 `}
                    onChange={(e) => handleChange(temp, { status: e.target.value })}
                    value={temp.status}
                    style={{ background: setBackgroundcolco(temp.status), color: "white", fontWeight: "bold" }}
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
                    onClick={() => { handleDelete(temp._id) }}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Order
