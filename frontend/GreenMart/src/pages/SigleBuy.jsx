import { Button } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function SingleBuy() {
    const [singleProducts, setSingleProducts] = useState("")
    const [price, setPrice] = useState()
    const [quantity, setQuantity] = useState(1)
    const [initalPrice, setInitialPrice] = useState()
    console.log(singleProducts);

    const { id } = useParams()

    const url = `http://localhost:4500/singleProduct/${id}`


    console.log(price);



    const fetchSingleProducts = async () => {
        const token = localStorage.getItem("token")
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: token
                }
            })
            console.log(response.data);
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

  const token = localStorage.getItem("token")
    // place order
    const orderUrl = `http://localhost:4500/placeorder`
    const handleBuy = async() => {

        const orderdata = {
            name: singleProducts.name,
            image: singleProducts.image,
            quantity: quantity,
            price: price,
            state : singleProducts.state
        }
        try {
         const response = await axios.post(orderUrl , orderdata , {
            headers: {
                Authorization: token
            }
        } )

        

        console.log(response.data);
        

        } catch (error) {
            console.log(error.message);

        }
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

                    {/* <div className="flex justify-between items-center py-4 border-b border-gray-300">
                        <span className="font-medium text-gray-600 text-lg">Discount:</span>
                        <span className="text-xl font-semibold text-green-500">Rs. 0.00</span>
                    </div> */}

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
                            Confirm Order
                        </button>
                    </div>
                </div>
            </div>

        </div>




    )
}

export default SingleBuy
