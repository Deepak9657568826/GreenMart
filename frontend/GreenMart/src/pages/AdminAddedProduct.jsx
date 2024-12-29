import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { authorizationToken } from '../utils/Token';
import { adminProductUrl } from '../utils/Url';
import ProductSkeleton from '../components/ProductSkeleton';

function AdminAddedProduct() {
  const [product, setProduct] = useState([]);
  async function fetchAllProduct() {
    try {
      const response = await axios.get(adminProductUrl, authorizationToken);
      const product = response.data.allProduct;
      setProduct(product);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchAllProduct();
  }, []);
 


  return (
    <div className="bg-gradient-to-r mt-16 from-green-50 to-blue-50 min-h-screen py-12">
      <h1 className="text-center text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-orange-500 to-red-600 mb-12">
        Admin Added Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 md:px-16">
        {product.length > 0 ? (
          product.map((item, index) => (
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
                <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
                  {item.name}
                </h2>

                <p className="text-gray-700 mb-2 flex items-center gap-2">
                  <span className="font-semibold text-green-500">Price:</span>
                  <span className="text-lg font-bold">₹{item.price}</span>
                </p>

                <p className="text-gray-700 mb-2 flex items-center gap-2">
                  <span className="font-semibold text-blue-500">Available Quantity:</span>
                  <span className="text-lg font-bold">{item.availableQuantity} kg</span>
                </p>
              </div>


            </div>
          ))
        ) : (
          <div className="grid  gap-5 m-auto">
          <ProductSkeleton />
       
        </div>
        
        )}
      </div>
    </div>
  );
}

export default AdminAddedProduct;
