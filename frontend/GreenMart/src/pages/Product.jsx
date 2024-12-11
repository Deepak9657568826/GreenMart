import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCartProduct } from '../redux/actionCreator'

function Product() {
  const [allProduct, setAllProduct] = useState([])
  const [isModelOpne, setModelOpen] = useState(false)
  const [updateImage, setUpdateImage] = useState()
  const [updateName, setUpdateName] = useState()
  const [updatePrice, setUpdatePrice] = useState()
  const [updateUrl, setUpdateUrl] = useState("http://localhost:4500/updateproduct")
  const [productDeleteModel, setProductDeleteModel] = useState(false)
  const [deleteUrl, setDeleteUrl] = useState("http://localhost:4500/deleteproduct")


  const toast = useToast()
 const dispatch = useDispatch()
 const state = useSelector(state=>state)
 console.log(state);
 


  const openModel = (product) => {
    console.log(product);
    setUpdateImage(product.image)
    setUpdateName(product.name)
    setUpdatePrice(product.price)
    setUpdateUrl(`http://localhost:4500/updateproduct/${product._id}`)
    setModelOpen(true)
  }

  const closeModel = () => {
    setModelOpen(false)
  }

  const token = localStorage.getItem("token")

  const allDataUrl = "http://localhost:4500/allproduct"




  async function fetchAllProduct() {
    try {
      const product = await axios.get(allDataUrl, {
        headers: {
          Authorization: token
        }
      })
      // console.log(product.data.allProduct);
      setAllProduct(product.data.allProduct)
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchAllProduct()
  }, [])


  const handleProductUPdate = async (e) => {
    console.log("update function");
    e.preventDefault()
    console.log(updateUrl);

    const fromData = {
      name: updateName,
      image: updateImage,
      price: updatePrice
    }

    try {
      const response = await axios.patch(updateUrl, fromData, {
        headers: {
          Authorization: token
        }
      })
      console.log(response.data.msg)

      if (response.data.msg == "product update successfully") {
        fetchAllProduct()
        toast({
          title: 'product update successfully',
          description: "product update successfully",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        })
        closeModel()

      }

    } catch (error) {
      toast({
        title: `${error.message}`,
        description: "Something went wrong",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
      console.log(error.message)
    }

  }

  const delete_Product_Url = "http://localhost:4500/deleteproduct"

  const handleDelete = async () => {
    try {
      const response = await axios.delete(deleteUrl, {
        headers: {
          Authorization: token
        }
      })
      console.log(response.data.msg);
      if (response.data.msg == "product delete successfully") {
        toast({
          title: 'product delete successfully',
          description: "product delete successfully",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        })
        fetchAllProduct()
        setProductDeleteModel(false)
      }

    } catch (error) {
      console.log(error.message);
      toast({
        title: `${error.message}`,
        description: "Something went wrong",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
    }
  }

  const openDeleteModel = (id) => {
    setDeleteUrl(`http://localhost:4500/deleteproduct/${id}`)
    setProductDeleteModel(true)
  }

  const closeDeleteModel = () => {
    setProductDeleteModel(false)
  }

  const handleAddToCart = (product)=>{
   dispatch(addToCartProduct(product))
  }



  return (
    <>
      <h1 className='text-center'>All product</h1>
      <div className='flex flex-wrap gap-5 m-auto w-4/5 mt-5 '>
        {allProduct.map((temp, index) => {
          return (
            <div key={index}>
              <div className=" bg-slate-200 w-72 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img className="p-8 h-52 w-full rounded-lg " src={temp.image} alt="product image" />
                </a>
                <div className="px-5 pb-5">
                  <a href="#">
                    <h5 className="text-xl text-center font-semibold tracking-tight text-gray-900 dark:text-white">{temp.name}</h5>
                  </a>
                  <div>
                    <div className="flex items-center mt-2.5 mb-5  justify-between ">
                      <span className="text-xl  text-gray-900 dark:text-white">Rs: {temp.price}</span>
                    </div>

                  </div>
                  <div className="flex items-center justify-between">
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buy now</button>
                    <button onClick={()=>{handleAddToCart(temp)}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
                  </div>

                  <div >
                    <button onClick={() => { openModel(temp) }} className="text-white w-full mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                    <button onClick={() => { openDeleteModel(temp._id) }} className="text-white w-full  mt-4 bg-red-500 hover:bg-red-7pratin00 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete Product</button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

      </div>

      {/* modal htmlFor update the product */}

      {isModelOpne &&

        <div id="crud-modal" tabIndex="-1" aria-hidden="true" className="flex justify-center items-center fixed inset-0 z-50 bg-black bg-opacity-50">
          <div onClick={(e) => e.stopPropagation()} className="relative p-4 w-full max-w-md max-h-full">

            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Update Product
                </h3>
                <button onClick={closeModel} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <form onSubmit={handleProductUPdate} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                    <input
                      type="text"
                      value={updateImage}
                      onChange={(e) => setUpdateImage(e.target.value)}
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter product url" required="" />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={updateName}
                      onChange={(e) => setUpdateName(e.target.value)}
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter product name" required="" />
                  </div>

                  <div className="col-span-2 ">
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                    <input
                      type="number"
                      value={updatePrice}
                      onChange={(e) => setUpdatePrice(e.target.value)}
                      name="price"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter price" required="" />
                  </div>

                </div>
                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>

      }


      {productDeleteModel &&
        <div id="popup-modal" tabIndex="-1" className="flex justify-center  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button onClick={closeDeleteModel} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                <button  onClick={handleDelete} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                  Yes, I'm sure
                </button>
                <button onClick={closeDeleteModel} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
              </div>
            </div>
          </div>
        </div>
      }







    </>
  )
}

export default Product
