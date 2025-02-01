import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCartProduct } from "../redux/actionCreator";
import { Flex, useToast } from "@chakra-ui/react";
import { FaShoppingCart } from 'react-icons/fa';
import {
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import EmptyCard from "../components/EmptyCard";
import { deleteCartProductUrl } from "../utils/Url";
import { authorizationToken } from "../utils/Token";
import ProductSkeleton from "../components/ProductSkeleton";
import Toastnotification from "../utils/Toastnotification";

function Cart() {
  const [cartProduct, setCartProduct] = useState();
  const [spinner, setSpinner] = useState({})
  const toast = useToast();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  // console.log("cartdata", cart);

  const { showToast } = Toastnotification()

  const totalPrice = cart.reduce((acc, temp) => {
    return acc + temp.price;
  }, 0);

  useEffect(() => {
    dispatch(addToCartProduct(toast));
  }, []);

  const getAllcartProduct = async () => {
    const url = `https://greenmart-wyyp.onrender.com/allcartproduct`
    try {
      const response = await axios.get(url, authorizationToken)
      console.log(response.data.allProduct);
      setCartProduct(response.data.allProduct)
    } catch (error) {

    }
  }
  useEffect(() => {
    getAllcartProduct()
  }, [])

  const handleRemove = async (id) => {
    setSpinner(pre => ({...pre , [id] : true}))
    try {
      const response = await axios.delete(`${deleteCartProductUrl}/${id}`, authorizationToken);
      if (response.data.msg == "Product remove from cart") {

        showToast(`${response.data.msg}`, `${response.data.msg}`)

        getAllcartProduct()
        dispatch(addToCartProduct(toast));
      } else {
        showToast(`${response.data.msg}`, `${response.data.msg}`, "error")
      }
    } catch (error) {
      showToast(`${error.message}`, `${error.message}`, "error")
      setSpinner(pre => ({...pre , [id] : false}))
    }
  };

  if (cart.length == 0) {
    return (
      <EmptyCard />
    )
  }

  if (!cartProduct) {
    return (
      <ProductSkeleton />
    )
  }

  return (
    <div className="container mx-auto px-4 py-10 m-20">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 ">
      {/* Products Section */}
      <div className="lg:col-span-2 space-y-4">
        {cartProduct &&
          cartProduct.map((product) => (
            <div
              key={product._id}
              className="flex flex-col sm:flex-row items-center sm:items-start border-2  rounded-lg p-4 shadow-md w-full max-w-md mx-auto sm:max-w-none"
            >
              {/* Product Image */}
              <img
                className="w-full sm:w-40 h-auto object-cover rounded-md"
                src={product.image}
                alt={product.name}
              />
  
              {/* Product Details */}
              <div className="flex-1 sm:ml-4 mt-4 sm:mt-0">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.discription}</p>
  
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-800 font-semibold">
                    Price: ₹{product.price}
                  </span>
                  <span className="text-gray-800 font-semibold">
                    Quantity: {product.quantity} {product.state === "solid" ? "kg" : "ml"}
                  </span>
                </div>
  
                {/* Buttons */}
                <div className="flex justify-between items-center mt-4">
                  <Link to={`/singleProduct/${product._id}`}>
                    <button className="bg-blue-600 w-24 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                      Buy
                    </button>
                  </Link>
  
                  <button
                    onClick={() => handleRemove(product._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    {spinner[product._id] ? (
                      <div className="flex items-center">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-white animate-spin"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="ml-2">Removing...</span>
                      </div>
                    ) : (
                      "Remove"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
  
      {/* Cart Summary */}
      <div className="lg:col-span-1">
        <div className="sticky top-20 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 p-6 rounded-xl shadow-lg text-white">
          <h2 className="text-2xl font-bold text-center">Cart Summary</h2>
  
          <div className="space-y-4 bg-white p-6 rounded-lg shadow-md text-gray-800">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-lg">Total Items:</span>
              <span className="text-xl font-semibold">{cart.length}</span>
            </div>
  
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-lg">Total Price:</span>
              <span className="text-xl font-semibold">₹{totalPrice.toFixed(2)}</span>
            </div>
  
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-lg">Discount:</span>
              <span className="text-xl font-semibold text-green-500">₹0.00</span>
            </div>
  
            <div className="flex justify-between">
              <span className="font-medium text-lg">Grand Total:</span>
              <span className="text-2xl font-bold text-indigo-600">₹{totalPrice.toFixed(2)}</span>
            </div>
  
            <button className="w-full mt-4 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition">
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Cart;
