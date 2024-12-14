import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import SuccessToast from "../utils/SuccessToast";
import { addToCartProduct } from "../redux/actionCreator";
import { Link } from "react-router-dom";

function Product() {
  // for filter
  const [filterData, setFilterData] = useState([]);

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
  console.log(buttonone);

  const [updateUrl, setUpdateUrl] = useState(
    "http://localhost:4500/updateproduct"
  );
  const [productDeleteModel, setProductDeleteModel] = useState(false);
  const [deleteUrl, setDeleteUrl] = useState(
    "http://localhost:4500/deleteproduct"
  );

  const [checkCart, setCheckCart] = useState("");

  const toast = useToast();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  const role = state.role
  console.log(role);


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
    setUpdateUrl(`http://localhost:4500/updateproduct/${product._id}`);
    setModelOpen(true);
  };

  const closeModel = () => {
    setModelOpen(false);
  };

  const token = localStorage.getItem("token");

  const allDataUrl = "http://localhost:4500/allproduct";

  async function fetchAllProduct() {
    try {
      const response = await axios.get(allDataUrl);
      const product = response.data.allProduct;
      setAllProduct(product);
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
      const response = await axios.patch(updateUrl, fromData, {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.msg == "product update successfully") {
        fetchAllProduct();

        toast({
          title: "product update successfully",
          description: "product update successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });

        closeModel();
      }
    } catch (error) {
      toast({
        title: `${error.message}`,
        description: "Something went wrong",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      console.log(error.message);
    }
  };

  const delete_Product_Url = "http://localhost:4500/deleteproduct";

  const handleDelete = async () => {
    try {
      const response = await axios.delete(deleteUrl, {
        headers: {
          Authorization: token,
        },
      });
      // console.log(response.data.msg);
      if (response.data.msg == "product delete successfully") {
        toast({
          title: "product delete successfully",
          description: "product delete successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        fetchAllProduct();
        setProductDeleteModel(false);
      }
    } catch (error) {
      // console.log(error.message);
      toast({
        title: `${error.message}`,
        description: "Something went wrong",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const openDeleteModel = (id) => {
    setDeleteUrl(`http://localhost:4500/deleteproduct/${id}`);
    setProductDeleteModel(true);
  };

  const closeDeleteModel = () => {
    setProductDeleteModel(false);
  };

  const addtoCartUrl = `http://localhost:4500/addtocart`;

  const handleAddToCart = async (product) => {
    const existProduct = cart.filter((temp) => {
      return temp.name == product.name;
    });
    setCheckCart(existProduct.length);
    if (existProduct.length > 0) {
      toast({
        title: `Product already added in cart`,
        description: "Product already added in cart",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      console.log("existProduct", existProduct);
    } else {
      const cartData = {
        _id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: product.quantity,
        availableQuantity: product.availableQuantity,
        discription: product.discription,
        category: product.category,
      };
      try {
        const response = await axios.post(addtoCartUrl, cartData, {
          headers: {
            Authorization: token,
          },
        });
        console.log(response);

        if (response.data.msg == "product added to cart successfully") {
          toast({
            title: "Product added to cart",
            description: `${response.data.msg}`,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          dispatch(addToCartProduct(toast));
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <h1
        className="text-xl md:text-2xl pt-14 font-bold text-stone-700 bg-clip-text bg-gradient-to-r from-green-400 via-orange-500 to-red-600 text-center py-6 drop-shadow-md"
      >
        Explore All Products
      </h1>
      <div className="flex justify-start gap-10 ">
        <div>
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Search Products
          </label>
          <input
            type="text"
            placeholder="Enter product name..."
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <button 
         
            className={`px-3 py-3  text-lime-600 font-semibold text-sm md:text-base  transition-all duration-300  transform hover:scale-105 active:scale-95`}
            onClick={(e) => seButton(e.target.innerText)}
          >
            Vegetable
          </button>

          <button
            className={`px-3 py-3  text-lime-600 font-semibold text-sm md:text-base   transition-all duration-300  transform hover:scale-105 active:scale-95`}
            onClick={(e) => seButton(e.target.innerText)}
          >
            Fruit
          </button>

          <button
            className={`px-3 py-3  text-lime-600 font-semibold text-sm md:text-base  transition-all duration-300  transform hover:scale-105 active:scale-95`}
            onClick={(e) => seButton(e.target.innerText)}
          >
            Grocery
          </button>

          <button
            className={`px-3 py-3  text-lime-600 font-semibold text-sm md:text-base  transition-all duration-300  transform hover:scale-105 active:scale-95`}
            onClick={(e) => seButton(e.target.innerText)}
          >
            Body Care
          </button>

          <button
            className={`px-3 py-3  text-lime-600 font-semibold text-sm md:text-base  transition-all duration-300  transform hover:scale-105 active:scale-95`}
            onClick={(e) => seButton(e.target.innerText)}
          >
            Baby Care
          </button>

          <button
            className={`px-3 py-3  text-lime-600 font-semibold text-sm md:text-base  transition-all duration-300  transform hover:scale-105 active:scale-95`}
            onClick={(e) => seButton(e.target.innerText)}
          >
            Kitchen experts
          </button>

          <button
            className={`px-3 py-3  text-lime-600 font-semibold text-sm md:text-base  transition-all duration-300  transform hover:scale-105 active:scale-95`}
            onClick={(e) => seButton(e.target.innerText)}
          >
            Cleaning experts
          </button>

          <button
            className={`px-3 py-3  text-lime-600 font-semibold text-sm md:text-base  transition-all duration-300  transform hover:scale-105 active:scale-95`}
            onClick={(e) => seButton(e.target.innerText)}
          >
           Energy Drinks
          </button>
        </div>

      </div>


      <div className="flex flex-wrap gap-20 justify-between mt-5">
        {filterData.map((temp, index) => {
          return (
            <div key={index}>
              <div className=" bg-slate-200 w-64 max-w-sm bg-zinc-50 border border-teal-50 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
                      <button style={{ width: role == "user" ? ("250px") : ("") }} className="text-white min-w-full  bg-lime-600 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
                        Add to cart
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
        })}
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
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Update
                </button>
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
