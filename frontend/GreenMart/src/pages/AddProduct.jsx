import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddProduct() {
    const [name, setProductName] = useState("")
    const [image, setImage] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(0)
    const [discription, setDiscription] = useState("")
   const toast = useToast()
   const navigate = useNavigate()
    const addPoductUrl = `http://localhost:4500/addproduct`

    const addProduct = async (e) => {
        const token = localStorage.getItem("token")
        e.preventDefault();
        const productData = {
            name,
            image,
            quantity,
            price,
            discription
        }

        const productAdd = await axios.post(addPoductUrl, productData, {
            headers: {
                Authorization: token
            }
        })
        if(productAdd.data.msg == "new product added successfully"){
            toast({
                title: 'New product added successfully',
                description: "New product added successfully",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            })
            setProductName("/")
            setImage("")
            setPrice("")
            setDiscription("")
            setQuantity("")
            setTimeout(()=>{
                navigate("/product")
            },2000)
        }
        else {
            toast({
                title: `${productAdd.data.msg}`,
                description: `${productAdd.data.msg}`,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            })
        }
    }



    return (
        <div className=" m-auto min-w-80 mt-10 w-2/4  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
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
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between  gap-5">
                    <div className=" w-full md:w-1/2">
                        <label for="number"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Quantity</label>
                        <input
                            type="number"
                            name={quantity}
                            onChange={(e) => { setQuantity(e.target.value) }}
                            className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Enter product quantity"
                        />
                    </div>

                    <div className=" w-full md:w-1/2">
                        <label for="number"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Price</label>
                        <input
                            type="number"
                            name={price}
                            onChange={(e) => { setPrice(e.target.value) }}
                            className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Enter product quantity"
                        />
                    </div>

                </div>

                <div>
                    <label for="number"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Discription</label>
                    <input
                        type="text"
                        name={discription}
                        onChange={(e) => { setDiscription(e.target.value) }}
                        className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Enter product discription"
                    />
                </div>





                <button
                
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Add Product
                </button>

            </form>
        </div>

    )
}

export default AddProduct
