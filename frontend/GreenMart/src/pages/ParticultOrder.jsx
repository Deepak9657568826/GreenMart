import { Button } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { authorizationToken } from '../utils/Token';
import { particularOrderUrl } from '../utils/Url';
import ProductSkeleton from '../components/ProductSkeleton';

function ParticultOrder() {
  const [order, setAllOrder] = useState([]);
  async function fetchAllProduct() {
    try {
      const response = await axios.get(particularOrderUrl, authorizationToken);
      const order = response.data.orderByUser;
      setAllOrder(order);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchAllProduct();
  }, []);

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

  console.log(order);
  

  return (
    <div className="bg-gradient-to-r mt-10  from-green-50 to-blue-50 min-h-screen py-12">
      <h1 className="text-center text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-orange-500 to-red-600 mb-12">
        Your Previous Orders
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 md:px-16">
        {order.length > 0 ? (
          order.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl relative"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-4">{item.name}</h2>

                <p className="text-gray-700 mb-2 flex items-center gap-2">
                  <span className="font-semibold text-green-500">Price:</span>
                  <span className="text-lg font-bold">₹{item.price}</span>
                </p>

                <p className="text-gray-700 mb-2 flex items-center gap-2">
                  <span className="font-semibold text-blue-500">Quantity:</span>
                  <span className="text-lg font-bold">{item.quantity} kg</span>
                </p>

                <p className="text-gray-700 flex items-center gap-2">
                  <span className="font-semibold text-purple-500">Status:</span>
                  <span
                    style={{ background: setBackgroundcolco(item.status) }}
                    className="px-4 py-2 rounded-xl text-white font-bold text-center min-w-[80px] shadow-lg transform transition-transform hover:scale-105"
                  >
                    <h2 className="text-sm uppercase tracking-wide">{item.status}</h2>
                  </span>
                </p>


                {/* <p className="text-gray-700 mb-4 flex items-center gap-2">
                  <span className="font-semibold text-pink-500">Ordered On:</span>
                  <span className="text-lg font-medium">{new Date(item.createdAt).toLocaleDateString('en-GB')}</span>
                </p> */}

              </div>

        
            </div>
          ))
        ) : (
          <div className="flex justify-between gap-5">
            <ProductSkeleton />
       
  
          </div>
        )}
      </div>
    </div>
  );
}

export default ParticultOrder;
