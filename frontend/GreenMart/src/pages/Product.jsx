import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Skeleton, Stack, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import SuccessToast from "../utils/SuccessToast";
import { addToCartProduct } from "../redux/actionCreator";
import { Link, useLocation } from "react-router-dom";
import three from "../assets/rich proties sorces greenmart.gif";
import four from "../assets/flavour jar greenmart.gif";
import { authorizationToken } from "../utils/Token";
import { addProductToCartUrl, allOverProductUrl } from "../utils/Url";
import ProductSkeleton from "../components/ProductSkeleton";
import Toastnotification from "../utils/Toastnotification";
import "../Styles/product.css"



function Product() {

  // for filter
  const [filterData, setFilterData] = useState("");
  const [spinner, setSpinner] = useState({})

  const [query, setQuery] = useState("");

  const [allProduct, setAllProduct] = useState([]);
  const [isModelOpne, setModelOpen] = useState(false);
  const [updateImage, setUpdateImage] = useState();
  const [updateName, setUpdateName] = useState();
  const [updatePrice, setUpdatePrice] = useState();
  const [stateForProduct, setState] = useState("solid");
  const [quantity, setQuantity] = useState(0);
  const [availableQuantity, setAvailableQuantity] = useState("");
  const [discription, setDiscription] = useState("");
  const [category, setCategory] = useState("vegetable");

  const [buttonone, seButton] = useState("");

  // count of product base on 
  const [fruit, setFruits] = useState("")
  const [gorcery, setGrocery] = useState("")
  const [vegitable, setVegitable] = useState("")

  const location = useLocation();
  const { showToast } = Toastnotification()

  const [updateUrl, setUpdateUrl] = useState(
   ""
  );
  const [productDeleteModel, setProductDeleteModel] = useState(false);
  const [deleteUrl, setDeleteUrl] = useState(
    ""
  );

  const [checkCart, setCheckCart] = useState("");

  // carousel 

  const [activeIndex, setActiveIndex] = useState(0);

  // Array of image sources for the slides
  const slides = [three, four];

  // Function to handle next button click

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Function to handle previous button click
  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex]);
  // end carousel
  const toast = useToast();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  const role = state.role

  const cart = useSelector((state) => state.cart.cart);

  const openModel = (product) => {
    setUpdateImage(product.image);
    setUpdateName(product.name);
    setUpdatePrice(product.price);
    setState(product.state || "solid");
    setQuantity(product.quantity);
    setDiscription(product.discription);
    setCategory(product.category || "vegetable");
    setAvailableQuantity(product.availableQuantity);
    setUpdateUrl(`https://greenmart-wyyp.onrender.com/updateproduct/${product._id}`);
    setModelOpen(true);
  };

  const closeModel = () => {
    setModelOpen(false);
  };

  async function fetchAllProduct() {
    console.log("After click on the browse all");
   console.log(buttonone);
   
    try {
      const response = await axios.get(allOverProductUrl);
      const product = response.data.allProduct;
      setAllProduct(product);
      console.log(product);
      setFruits(product.filter(temp => temp.category == "fruit"))
      setVegitable(product.filter(temp => temp.category == "vegetable"))
      setGrocery(product.filter(temp => temp.category == "grocery"))

      let filterAndSearchData = buttonone.toLowerCase()
        ? product.filter((temp) => temp.category == buttonone.toLowerCase())
        : product;
      if (query) {
        filterAndSearchData = filterAndSearchData.filter((temp) =>
          temp.name.toLowerCase().includes(query.toLowerCase())
        );
      }
      setFilterData(filterAndSearchData);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchAllProduct();
  }, [query, buttonone]);

  function browerAll() {
    console.log("Enter in all browser");
    seButton("")
    fetchAllProduct();
  }

  const handleProductUPdate = async (e) => {
    e.preventDefault();

    const fromData = {
      name: updateName,
      image: updateImage,
      price: updatePrice,
      state: stateForProduct,
      quantity,
      availableQuantity,
      discription,
      category,
    };

    try {
      const response = await axios.patch(updateUrl, fromData, authorizationToken);

      if (response.data.msg == "product update successfully") {
        fetchAllProduct();
        showToast("product update successfully", "product update successfully")
        closeModel();
      }
    } catch (error) {
      showToast(`${error.message}`, "Something went wrong", "error")
      console.log(error.message);
    }
  };



  const handleDelete = async () => {
    try {
      const response = await axios.delete(deleteUrl, authorizationToken);

      if (response.data.msg == "product delete successfully") {
        showToast("product delete successfully", "product delete successfully")
        fetchAllProduct();
        setProductDeleteModel(false);
      }
    } catch (error) {
      showToast(`${error.message}`, "Something went wrong", "error")
    }
  };

  const openDeleteModel = (id) => {
    setDeleteUrl(`https://greenmart-wyyp.onrender.com/deleteproduct/${id}`);
    setProductDeleteModel(true);
  };

  const closeDeleteModel = () => {
    setProductDeleteModel(false);
  };



  const handleAddToCart = async (product) => {
    setSpinner(pre => ({ ...pre, [product._id]: true }))
    console.log("cart product info", product);

    const existProduct = cart.filter((temp) => {
      return temp.name == product.name;
    });

    console.log("product which is availbe in the cart already", existProduct);
    

    setCheckCart(existProduct.length);
    if (existProduct.length > 0) {
      showToast(`Product already added in cart`, `Product already added in cart`, "error")
      setSpinner(pre => ({ ...pre, [product._id]: false }))
    } else {
      const cartData = {
        _id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: product.quantity,
        discription: product.discription
      };
      try {
        console.log("addtocart url" , addProductToCartUrl);
        
        const response = await axios.post(addProductToCartUrl, cartData, authorizationToken);


        if (response.data.msg == "product added to cart successfully") {
          showToast("Product added to cart", `${response.data.msg}`)
          setSpinner(pre => ({ ...pre, [product._id]: false }))
          dispatch(addToCartProduct(toast));
        }
      } catch (error) {
        showToast(`${error.message}`, "Something went wrong", "error")
        setSpinner(pre => ({ ...pre, [product._id]: false }))
        console.log(error);
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = productDeleteModel || isModelOpne ? "hidden" : "auto";
  }, [productDeleteModel, isModelOpne]);



  return (
    <>
      {/*carousel  */}
      {location.pathname == "/product" &&
        <div className="relative w-full mx-auto mt-3" style={{ width: "100%" }}>
          {/* Carousel wrapper */}
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg">
            {/* Slides */}
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute mt-8 inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === activeIndex ? "opacity-100" : "opacity-0"
                  }`}
              >
                <img
                  src={slide}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 z-30 transform -translate-y-1/2 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white/30 hover:bg-white/50 dark:bg-gray-800/30 dark:hover:bg-gray-800/60 rounded-full focus:outline-none"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-white dark:text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 z-30 transform -translate-y-1/2 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white/30 hover:bg-white/50 dark:bg-gray-800/30 dark:hover:bg-gray-800/60 rounded-full focus:outline-none"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-white dark:text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${index === activeIndex ? "bg-white" : "bg-white/30"
                  }`}
              />
            ))}
          </div>
        </div>
      }
      {/* carousel */}

      <h1
        className="text-xl md:text-2xl pt-14 font-bold text-stone-700 bg-clip-text bg-gradient-to-r from-green-400 via-orange-500 to-red-600 text-center py-6 drop-shadow-md"
      >
        Explore All Products
      </h1>
      <div className="flex justify-start gap-10 ">

        <div className="flex flex-col mx-6 sm:flex-row justify-start gap-4 w-full">
          {/* Search Box */}
          <div className="w-full sm:w-1/2 md:w-1/3">
            <label
              htmlFor="search-products"
              className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-200"
            >
              Search Products
            </label>
            <input
              type="text"
              placeholder="Enter product name..."
              onChange={(e) => setQuery(e.target.value)}
              className="bg-white border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-500 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400 hover:border-gray-400 transition-all duration-200"
            />
          </div>
        </div>

      </div>




      <div className="flex flex-col items-center mt-8">
        <h1 className="text-2xl font-bold mb-6">Top Categories</h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div onClick={browerAll} className="flex cursor-pointer flex-col items-center p-6 bg-white shadow-md rounded-lg transition-transform duration-300 hover:scale-105">
            <div className="text-4xl mb-4">🍎</div>
            <h2 className="text-lg font-semibold">Browse All</h2>
            <p className="text-gray-500">({allProduct.length} item)</p>
          </div>
          <div
            onClick={(e) => seButton('Vegetable')}
            className="flex cursor-pointer flex-col items-center p-6 bg-white shadow-md rounded-lg transition-transform duration-300 hover:scale-105">
            <div className="text-4xl mb-4">🥦</div>
            <h2 className="text-lg font-semibold">Vegetables</h2>
            <p className="text-gray-500">({vegitable.length} item)</p>
          </div>
          <div
            onClick={(e) => seButton('Fruit')}
            className="flex cursor-pointer flex-col items-center p-6 bg-white shadow-md rounded-lg transition-transform duration-300 hover:scale-105">
            <div className="text-4xl mb-4">🛒</div>
            <h2 className="text-lg font-semibold">Fruits</h2>
            <p className="text-gray-500">({fruit.length} item)</p>
          </div>
          <div
            onClick={(e) => seButton(`Grocery`)}
            className="flex cursor-pointer flex-col items-center p-6 bg-white shadow-md rounded-lg transition-transform duration-300 hover:scale-105">
            <div className="text-4xl mb-4">🍇</div>
            <h2 className="text-lg font-semibold">Grocery</h2>
            <p className="text-gray-500">({gorcery.length} item)</p>

          </div>
        </div>
      </div>




      <div>

      </div>
      <div className="flex flex-wrap gap-5  mt-10 justify-center bg-gray-100 ">
        {!filterData ? (
          <div className="flex justify-between">
            <ProductSkeleton />
          </div>
        ) : (

          filterData.map((temp, index) => {
            return (
              <div
                key={index}
                className="my-5 transform transition-transform duration-300 hover:scale-105 shadow-lg rounded-lg"
              >
                <div className=" bg-slate-400 w-72 border border-teal-50 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href="#" className="flex justify-center">
                    <img
                      className="pt-4 h-44 w-44 rounded-lg "
                      src={temp.image}
                      alt="product image"
                    />
                  </a>
                  <div className="px-5 pb-5">
                    <a href="#">
                      <h5 className="text-lg pt-4 text-center font-semibold tracking-tight text-gray-900 dark:text-white">
                        {temp.name}
                      </h5>
                    </a>
                    <div>
                      <div className="flex items-center mt-2.5 mb-5  justify-between ">
                        <span className="text-lg  text-gray-900 dark:text-white">
                          Rs: {temp.price}
                        </span>
                        <span className="text-lg  text-gray-900 dark:text-white">
                          {" "}
                          {temp.quantity >= 1000
                            ? temp.quantity.toString()[0]
                            : temp.quantity}{" "}
                          {temp.state == "solid" ? `kg` : `ltr`}
                        </span>
                      </div>

                    </div>
                    <div className="flex  items-center justify-between">
                      <Link to={`/singleProduct/${temp._id}`}>
                        <button style={{ width: role == "user" ? ("120px") : ("") }} className="text-white min-w-full  bg-lime-600 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Buy now
                        </button>
                      </Link>

                      {role == "admin" &&
                        <button
                          onClick={() => {
                            handleAddToCart(temp);
                          }}
                          className="text-white bg-lime-600 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          {spinner[temp._id] ? (
                            <div role="status" className="flex justify-center">
                              <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                              </svg>
                              <span class="sr-only">Loading...</span>
                            </div>
                          ) : (

                            ` Add to cart`
                          )}
                        </button>
                      }
                    </div>
                    {role == "admin" &&
                      <div>
                        <button
                          onClick={() => {
                            openModel(temp);
                          }}
                          className="text-lime-900 border border-gray-500 w-full mt-4 bg-gradient-to-r from-lime-50 via-lime-100 to-lime-200 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => {
                            openDeleteModel(temp._id);
                          }}
                          className="text-red-700 w-full border border-gray-500  mt-4 bg-gradient-to-r from-rose-50 via-rose-100 to-rose-200 hover:bg-red-7pratin00 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Delete Product
                        </button>
                      </div>
                    }

                  </div>
                </div>
              </div>
            );
          }))}
      </div>

      {/* modal htmlFor update the product */}

      {isModelOpne && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="flex justify-center items-center fixed inset-0 z-50 bg-black bg-opacity-50  "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative p-4 w-full  lg:w-2/4 max-h-full"
          >
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Update Product
                </h3>
                <button
                  onClick={closeModel}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <form onSubmit={handleProductUPdate} className="p-4 md:p-5">
                <div className=" mb-4 ">
                  <div className="flex flex-col md:flex-row justify-between  gap-5">
                    <div className=" w-full    ">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Image
                      </label>
                      <input
                        type="text"
                        value={updateImage}
                        onChange={(e) => setUpdateImage(e.target.value)}
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter product url"
                        required=""
                      />
                    </div>

                    <div className=" w-full ">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={updateName}
                        onChange={(e) => setUpdateName(e.target.value)}
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter product name"
                        required=""
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between  gap-5">
                    <div className="w-full">
                      <label
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Price
                      </label>
                      <input
                        type="number"
                        value={updatePrice}
                        onChange={(e) => setUpdatePrice(e.target.value)}
                        name="price"
                        id="price"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter price"
                        required=""
                      />
                    </div>

                    <div className="w-full ">
                      <label
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Quantity
                      </label>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        name="price"
                        id="price"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter quantity"
                        required="true"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between  gap-5">
                    <div className="w-full ">
                      <label
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Available Quantity
                      </label>
                      <input
                        type="number"
                        value={availableQuantity}
                        onChange={(e) => setAvailableQuantity(e.target.value)}
                        name="price"
                        id="price"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter availabe quantity"
                        required="true"
                      />
                    </div>

                    <div className="w-full ">
                      <label
                        htmlFor="state"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        State
                      </label>
                      <select
                        value={stateForProduct}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        onChange={(e) => {
                          setState(e.target.value);
                        }}
                        name=""
                        id=""
                      >
                        <option value="solid">Solid</option>
                        <option value="liquid">Liquid</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between  gap-5">
                    <div className=" w-full md:w-1/2">
                      <label
                        for="number"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Select Category
                      </label>
                      <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                        name=""
                        id=""
                      >
                        <option value="vegetable">Vegetable</option>
                        <option value="fruit">Fruit</option>
                        <option value="grocery">Grocery</option>
                      </select>
                    </div>

                    <div className="w-full md:w-1/2 ">
                      <label
                        htmlFor="state"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Product Discription
                      </label>
                      <input
                        type="textarea"
                        value={discription}
                        onChange={(e) => {
                          setDiscription(e.target.value);
                        }}
                        name="price"
                        id="price"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter product discription"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-8">
                  <button

                    type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Update
                  </button>
                  <button
                    onClick={closeModel}
                    className="text-white inline-flex items-center bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Cancel
                  </button>

                </div>

              </form>
            </div>
          </div>
        </div>
      )}

      {productDeleteModel && (
        <div
          id="popup-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="flex justify-center items-center h-screen md:inset-0 fixed top-0 right-0 left-0 z-50 bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={closeDeleteModel}
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this product?
                </h3>
                <button
                  onClick={handleDelete}
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={closeDeleteModel}
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Product;
