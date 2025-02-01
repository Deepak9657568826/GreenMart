import React from "react";
import { FaShoppingCart } from "react-icons/fa";

function EmptyCard() {
  return (
    <div

      className="flex items-center justify-center min-h-96  p-6 m-20"
    >
      <div style={{
        //  backgroundImage: `url("https://img.freepik.com/free-vector/supermarket-shopping-cart-concept-illustration_114360-22408.jpg")`,
         backgroundSize: 'cover',
         backgroundPosition: 'center',
         opacity: 1, // Adjust opacity for background image

        
      }} className="bg-white rounded-lg shadow-xl p-10 max-w-md w-full text-center animate-fade-in">
        <FaShoppingCart className="text-indigo-600 text-6xl mx-auto mb-6" />

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Your Cart is Empty
        </h2>

        <p className="text-gray-600 mb-6">
          It looks like you haven’t added anything to your cart yet. Start
          exploring our products and fill it up with your favorite items!
        </p>

        <button
          onClick={() => (window.location.href = "/product")}
          className="bg-indigo-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300"
        >
          Start Shopping
        </button>
      </div>
    </div>
  );
}

export default EmptyCard;
