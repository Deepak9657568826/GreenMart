import React from 'react';
import { useSelector } from 'react-redux';

function Cart() {
  // Get cart data from Redux state
  const cart = useSelector((state) => state.cart);

  // Calculate total price of all items in the cart
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty 😔</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Side: Cart Items */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {cart.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between transition-transform transform hover:scale-105"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="rounded-md h-40 w-full object-cover"
                  />
                  <h3 className="mt-4 text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="mt-2 text-lg font-medium text-green-600">₹{item.price}</p>
                  
                  <button 
                    className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-800 transition-all"
                  >
                    Remove from Cart
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Price Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Price Details</h3>

            <div className="flex justify-between mb-4">
              <span className="text-lg text-gray-700">Total Items:</span>
              <span className="text-lg font-semibold">{cart.length}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span className="text-lg text-gray-700">Total Price:</span>
              <span className="text-lg font-semibold text-green-600">₹{totalPrice}</span>
            </div>

            <button 
              className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-800 transition-all"
            >
              Proceed to Checkout
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default Cart;
