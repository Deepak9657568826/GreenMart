import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authorizationToken } from '../utils/Token'
import { addProductUrl } from '../utils/Url'
import Toastnotification from '../utils/Toastnotification'
import photo from "../assets/addproductphoto.png"

function AddProduct() {
     const [isSpinnerActive , setSpinnerActive] = useState(false) 
    const [name, setProductName] = useState("")
    const [image, setImage] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(0)
    const [discription, setDiscription] = useState("")
    const [state, setState] = useState("solid")
    const [availabeQunatity, setAvailableQuantity] = useState("")
    const [category, setCategory] = useState("")

    const toast = useToast()
    const navigate = useNavigate()

    const {showToast} = Toastnotification()

    const addProduct = async (e) => {
        setSpinnerActive(true)
        e.preventDefault();
        const productData = {
            name,
            image,
            quantity,
            price,
            discription,
            state,
            availableQuantity: availabeQunatity,
            category
        }

        const productAdd = await axios.post(addProductUrl, productData, authorizationToken)
        if (productAdd.data.msg == "new product added successfully") {
            setSpinnerActive(false)
            showToast('New product added successfully' , 'New product added successfully')

            setProductName("/")
            setImage("")
            setPrice("")
            setDiscription("")
            setQuantity("")
            setState("")
            setAvailableQuantity("")
            setCategory("")
            setTimeout(() => {
                navigate("/product")
            }, 2000)
        }
        else {
            showToast(`${productAdd.data.msg}` , `${productAdd.data.msg}` , "error")
            setSpinnerActive(false)
        }
    }
    
    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100 p-4">
        {/* Left Container - Image */}
        <div className="w-full md:w-1/2 flex justify-start items-center p-">
        <img
  src={photo}
  alt="Product"
className="w-full h-full object-contain rounded-lg "
/>
        </div>
  
        {/* Right Container - Form */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-6">
          <div className="w-full max-w-md p-6 bg-gray-100  ">
            <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
              Manage Product
            </h2>
  
            <form className="w-full">
              {/* Product Name */}
              <input type="text" placeholder="Enter product name" className="w-full bg-transparent border-none p-2 text-gray-900 focus:outline-none" />
              <hr className="mb-4 border-gray-500 p-2" />
  
              {/* Product Image */}
              <input type="text" placeholder="Enter product image URL" className="border-none w-full bg-transparent p-2 text-gray-900 focus:outline-none" />
              <hr className="mb-4 border-gray-500 p-2" />
  
              {/* Product Price */}
              <input type="number" placeholder="Enter product price" className="border-none w-full bg-transparent p-2 text-gray-900 focus:outline-none" />
              <hr className="mb-4 border-gray-500 p-2" />
  
              {/* Product Quantity */}
              <input type="number" placeholder="Enter product quantity" className="border-none w-full bg-transparent p-2 text-gray-900 focus:outline-none" />
              <hr className="mb-4 border-gray-500 p-2" />
  
              {/* Available Quantity */}
              <input type="number" placeholder="Enter available quantity" className="border-none w-full bg-transparent p-2 text-gray-900 focus:outline-none" />
              <hr className="mb-4 border-gray-500 p-2" />
  
              {/* Product State */}
              <select className="w-full bg-transparent p-2 border-none text-gray-900 focus:outline-none">
                <option>Select State</option>
                <option value="solid">Solid</option>
                <option value="liquid">Liquid</option>
              </select>
              <hr className="mb-4 border-gray-500 p-2" />
  
              {/* Category */}
              <select className="w-full bg-transparent p-2 border-none text-gray-900 focus:outline-none">
                <option>Select Category</option>
                <option value="vegetable">Vegetable</option>
                <option value="fruit">Fruit</option>
                <option value="grocery">Grocery</option>
              </select>
              <hr className="mb-4 border-gray-500 p-2" />
  
              {/* Description */}
              <input type="text" placeholder="Enter product description" className="border-none w-full bg-transparent p-2 text-gray-900 focus:outline-none" />
              <hr className="mb-4 border-gray-500 p-2" />
  
              {/* Submit Button */}
              <div className="flex justify-center">
                <button type="submit" className="px-6 py-2 bg-lime-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    )
}

export default AddProduct
