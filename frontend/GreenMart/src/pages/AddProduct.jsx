import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authorizationToken } from '../utils/Token'
import { addProductUrl } from '../utils/Url'
import Toastnotification from '../utils/Toastnotification'

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

    const {showToast} = Toastnotification

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
    
        <div style={{ backgroundColor:"lightBlue" }} className=" my-20  m-auto   min-w-80  w-2/4  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form onSubmit={addProduct} className="space-y-6" action="#">
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">Manage Product</h5>
                <div className="flex flex-col md:flex-row justify-between  gap-5">
                    {/* Product Name Section */}
                    <div className=" w-full md:w-1/2">
                        <label
                            htmlFor="productName"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="productName"
                            onChange={(e) => setProductName(e.target.value)}
                            className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Enter product name"
                            required
                        />
                    </div>

                    {/* Product Image Section */}
                    <div className=" w-full md:w-1/2">
                        <label
                            htmlFor="productImage"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Product Image
                        </label>
                        <input
                            type="text"
                            name="productImage"
                            onChange={(e) => setImage(e.target.value)}
                            className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Enter product image URL"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between  gap-5">
                    <div className=" w-full md:w-1/2">
                        <label for="number"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Price</label>
                        <input
                            type="number"
                            name={price}
                            onChange={(e) => { setPrice(e.target.value) }}
                            className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Enter product quantity"
                            required
                        />
                    </div>

                    <div className=" w-full md:w-1/2">
                        <label for="number"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Quantity</label>
                        <input
                            type="number"
                            name={quantity}
                            onChange={(e) => { setQuantity(e.target.value) }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Enter product quantity "
                            required
                        />
                    </div>

                </div>

                <div className="flex flex-col md:flex-row justify-between  gap-5">

                    <div className=" w-full md:w-1/2">
                        <label for="number"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avalailabe Quantity</label>
                        <input
                            type="number"
                            name={availabeQunatity}
                            onChange={(e) => { setAvailableQuantity(e.target.value) }}
                            className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Enter product quantity availabe"
                            required
                        />
                    </div>


                    <div className=" w-full md:w-1/2">
                        <label for="number"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product State</label>
                        <select
                            className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            onChange={(e) => { setState(e.target.value) }} name="" id="">
                            <option value="">Select</option>
                            <option value="solid">Solid</option>
                            <option value="liquid">Liquid</option>
                        </select>
                    </div>

                </div>

                <div className="flex flex-col md:flex-row justify-between  gap-5">

                    <div className=" w-full md:w-1/2">
                        <label for="number"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Category</label>
                        <select
                            className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            onChange={(e) => { setCategory(e.target.value) }} name="" id="">
                            <option value="">Select</option>
                            <option value="vegetable">Vegetable</option>
                            <option value="fruit">Fruit</option>
                            <option value="grocery">Grocery</option>
                        </select>
                    </div>

                    <div className=" w-full md:w-1/2">
                        <label for="number"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Discription</label>
                        <input
                            type="text"
                            name={discription}
                            onChange={(e) => { setDiscription(e.target.value) }}
                            className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Enter product discription"
                            required
                        />
                    </div>
                </div>


                <button

                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {isSpinnerActive ? (
                        <div role="status" className="flex justify-center">
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                    ) : (
                        "Add Product"
                    )}
                </button>

            </form>
        </div>

    )
}

export default AddProduct
