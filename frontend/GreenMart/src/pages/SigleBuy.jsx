import { Button, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import check from "../assets/check.png"
import "../Styles/singleBuy.css"
import { useSelector } from 'react-redux'
import { authorizationToken } from '../utils/Token'
import { orderPlaceUrl, singleProductUrl } from '../utils/Url'

function SingleBuy() {
    const [isSpinnerActive , setSpinnerActive] = useState(false) 
    const [singleProducts, setSingleProducts] = useState("")
    const [price, setPrice] = useState()
    const [quantity, setQuantity] = useState(1)
    const [initalPrice, setInitialPrice] = useState()
    const [orderComfirmModel, setConfirmModel] = useState(false)
    const state = useSelector(state => state.auth)

    const isLogin = state.login
    const navigate = useNavigate()

    const toast = useToast();

    const { id } = useParams()


    const fetchSingleProducts = async () => {

        try {
            const response = await axios.get(`${singleProductUrl}/${id}`)
            let product = response.data.singleProduct
            setSingleProducts(product)
            setPrice(product.price)
            setInitialPrice(product.price)
        } catch (error) {
            console.error("Error fetching products:", error.message)
        }
    }

    useEffect(() => {
        fetchSingleProducts()
    }, [])


    const handleAdd = () => {
        if (quantity < 10) {
            setQuantity(pre => pre + 1) // 1 
            setPrice(initalPrice * (quantity + 1))
        }

    }

    const handleRemove = () => {
        if (quantity > 1) {
            setQuantity(pre => pre - 1) // 1 
            setPrice(initalPrice * (quantity - 1))
        }
    }

    // place order
    const handleBuy = async () => {
        setSpinnerActive(true)
         if(!isLogin){
            toast({
                title: `Login first`,
                description: `You have to login first for place order`,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            });
            setTimeout(()=>{
                navigate('/login')

            },2000)
         }
        const orderdata = {
            name: singleProducts.name,
            image: singleProducts.image,
            quantity: quantity,
            price: price,
            state: singleProducts.state
        }
        try {
            const response = await axios.post(orderPlaceUrl, orderdata, authorizationToken)
            console.log(response.data);
            if (response.data.msg == "new order placed successfully") {
                setTimeout(() => {
                    setSpinnerActive(false)
                    setConfirmModel(true)
                }, 2000)

            }

        } catch (error) {
            console.log(error.message);
            setSpinnerActive(false)
        }
    }

    const isModelClose = () => {
        setConfirmModel(false)
    }


    if (!singleProducts || singleProducts.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <h2 className="text-2xl font-bold text-gray-700">Loading product details...</h2>
            </div>
        )
    }

    return (

        <div className=" flex sm:flex-wrap justify-around m-auto flex-col lg:flex-row bg-slate-400">

            {singleProducts &&
                <div className="min-w-fit  m-10">
                    <div
                        className="max-w-sm  m-auto  bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
                    >
                        <img
                            src={singleProducts.image}
                            alt={singleProducts.name}
                            className="w-full lg:min-w-96 h-64 object-cover"
                        />
                        <div className="p-6">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">{singleProducts.name}</h1>
                            <p className="text-xl font-semibold text-green-600 mb-4">{singleProducts.discription}</p>
                            <div className='flex gap-10'>
                                <Button onClick={handleAdd} className='p-3 ' colorScheme='blue'>+</Button>
                                <strong>{quantity}</strong>
                                <Button onClick={handleRemove} className='p-5 ' colorScheme='blue'>-</Button>
                            </div>
                        </div>
                    </div>
                </div>
            }


            <div className=" sticky top-16 sm:w-96 lg:w-96  m-10  h-min  bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 p-2 rounded-3xl shadow-xl">
                <div className=" space-y-6 bg-white sm:max-w-96  p-8 rounded-3xl shadow-lg">
                    <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
                        Cart Summary
                    </h2>

                    <div className="flex justify-between items-center py-4 border-b border-gray-300">
                        <span className="font-medium text-gray-600 text-lg">Total Price:</span>
                        <span className="text-xl font-semibold text-gray-800">Rs. {price}</span>
                    </div>

                    <div className="flex justify-between items-center py-4 border-b border-gray-300">
                        <span className="font-medium text-gray-600 text-lg">Quantity:</span>
                        <span className="text-xl font-semibold text-green-500">  {quantity} {singleProducts.state == "solid" ? "kg" : "ml"}</span>
                    </div>

                    <div className="flex justify-between items-center py-4">
                        <span className="font-medium text-gray-600 text-lg">Grand Total:</span>
                        <span className="text-2xl font-bold text-indigo-600">Rs. {price}</span>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button onClick={handleBuy}
                            className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-2xl transform transition-transform hover:scale-105 hover:bg-blue-700 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                            {isSpinnerActive ? (

                                <div role="status" className="flex justify-center">
                                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span class="sr-only">Loading...</span>
                                </div>
                            ) : (
                                `Confirm Order`
                            )}
                        </button>
                    </div>
                </div>
            </div>


            {/* modal for  */}
            {orderComfirmModel &&
                <div id="popup-modal" tabIndex="-1" aria-hidden="true"
                    className="flex justify-center items-center h-screen md:inset-0 fixed top-0 right-0 left-0 z-50 bg-black bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-md h-auto">
                        <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
                            <button
                                onClick={isModelClose}
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-6 text-center">
                                <img className='comfirmLogo h-16 w-16 content-center m-auto' src={check} alt="" />
                                <h3 className="mb-5 text-lg font-semibold text-gray-700 dark:text-white">
                                    Your order has been placed successfully!
                                </h3>
                                <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                                    Thank you for shopping with us. We will process your order shortly.
                                </p>
                                <button
                                    onClick={isModelClose}
                                    type="button"
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    OK, Got it!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            }

        </div>

    )
}

export default SingleBuy
