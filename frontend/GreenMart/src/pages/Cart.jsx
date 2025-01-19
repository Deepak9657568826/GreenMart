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
    <div className="flex justify-between flex-col  lg:flex-row ">
      <div
        div
        className="flex justify-between  flex-col lg:w-1/2 sm:w-auto gap-2 mt-10 ml-5 mr-5"
      >
        {cartProduct &&
          cartProduct.map((product) => (
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                src={product.image}
                alt="Caffe Latte"
              />

              <Stack>
                <CardBody>
                  <Heading size="md">{product.name}</Heading>

                  <Text py="2">
                    {product.discription}
                  </Text>
                </CardBody>

                <Flex px="4" justifyContent="space-between">
                  <Text > <strong>Price: </strong>{product.price}</Text>
                  <Text ><strong>Quantity: </strong> {product.quantity} {product.state == "solid" ? "kg" : "ml"}</Text>
                </Flex>


                <CardFooter className="flex justify-between ">
                  <Link to={`/singleProduct/${product._id}`}>
                    {" "}
                    <Button variant="solid" colorScheme="blue">
                      Buy
                    </Button>
                  </Link>


                  <Button
                    onClick={() => {
                      handleRemove(product._id);
                    }}
                    variant="solid"
                    colorScheme="red"
                  >
                    {spinner[product._id] ? (
                      <div role="status" className="flex justify-center">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                      </div>
                    ) : (
                      `Remove`
                    )}
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
          ))}
      </div>

      <div
        style={{ position: "sticky", top: "80px" }}
        className=" mt-10 sm:max-w-md lg:w-full  h-min mx-auto bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 p-2 rounded-3xl shadow-xl"
      >
        <div
          className="space-y-6 bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Cart Summary
          </h2>

          <div className="flex justify-between items-center py-4 border-b border-gray-300">
            <span className="font-medium text-gray-600 text-lg">
              Total Items:
            </span>
            <span className="text-xl font-semibold text-gray-800">
              {cart.length}
            </span>
          </div>

          <div className="flex justify-between items-center py-4 border-b border-gray-300">
            <span className="font-medium text-gray-600 text-lg">
              Total Price:
            </span>
            <span className="text-xl font-semibold text-gray-800">
              Rs. {totalPrice.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center py-4 border-b border-gray-300">
            <span className="font-medium text-gray-600 text-lg">Discount:</span>
            <span className="text-xl font-semibold text-green-500">
              Rs. 0.00
            </span>
          </div>

          <div className="flex justify-between items-center py-4">
            <span className="font-medium text-gray-600 text-lg">
              Grand Total:
            </span>
            <span className="text-2xl font-bold text-indigo-600">
              Rs. {totalPrice.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-center mt-6">
            <button className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-2xl transform transition-transform hover:scale-105 hover:bg-blue-700 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300">
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
