import { Button, Stack, ToastProvider } from '@chakra-ui/react';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { authorizationToken } from '../utils/Token';
import { deleteProductUrl, fetchAllProductUrl, updateProductUrl } from '../utils/Url';
import Toastnotification from '../utils/Toastnotification';
import { Spinner } from "flowbite-react";
import { orderContext } from '../hook/SocketServer';
import sound from "../assets/sound.wav"


function Order() {
  const [spinner, setSpinner] = useState({})
  const { showToast } = Toastnotification()
  const [audioAllowed, setAudioAllowed] = useState(false); // Track if audio is allowed
  console.log(audioAllowed);




  const { allOrder, socket } = useContext(orderContext)
  const handleUserInteraction = () => {
    setAudioAllowed(true); // User interacted with the page, so allow audio
  };

  useEffect(() => {
    // Add event listeners to detect user interaction
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);

    return () => {
      // Clean up event listeners
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  const enableAudio = () => {
    setAudioAllowed(true);
  };
  useEffect(() => {
    console.log(audioAllowed);
    console.log(socket);
    if (audioAllowed && socket) {
      console.log('Come to notifucation');

      socket.on("notificationToAdmin", (payload) => {
        if (payload.status) {
          console.log("audio play");
          const audio = new Audio(sound);
          audio.play().catch(err => console.error("Audio playback failed:", err));
        }
      })
    }
  }, [socket, audioAllowed])


  const handleChange = async (order, payload) => {
    try {
      const response = await axios.patch(`${updateProductUrl}/${order._id}`, payload, authorizationToken)
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleDelete = async (id) => {
    setSpinner(pre => ({ ...pre, [id]: true }))
    try {
      const response = await axios.delete(`${deleteProductUrl}/${id}`, authorizationToken)
      showToast("Order delete successfully", "Order delete successfully")
      setSpinner(pre => ({ ...pre, [id]: false }))
    } catch (error) {
      console.log(error.message);
      showToast(`${error.message}`, `${error.message}`)
      setSpinner(pre => ({ ...pre, [id]: false }))

    }
  }

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
    <div className="p-6 mt-20 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">This is the Order Page</h2>
      <Button colorScheme='blue' onClick={enableAudio}>
        {audioAllowed ? "Audio Enabled" : "Enable Audio"}
      </Button>

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
            {!allOrder ? (
              <tr>
                <td colSpan="8" className="px-6 py-4" >
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
            ) : (allOrder.map((temp, index) => (
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
                    {spinner[temp._id] ? (
                      <div role="status" className="flex justify-center">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                      </div>) : (
                      `Delete`
                    )}
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
