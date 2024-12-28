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
  const [cartProduct  , setCartProduct]  = useState();
  const toast = useToast();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  console.log("cartdata", cart);

   const {showToast} = Toastnotification() 

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
     showToast(`${error.message}`,`${error.message}`, "error")
    }
  };

  if (cart.length == 0) {
    return (
      <EmptyCard />
    )
  }

  if(!cartProduct){
    return(
      <ProductSkeleton/>
    )
  }

  return (

    // // style={{
    //   backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/016/026/442/non_2x/empty-shopping-cart-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg')`,
    //   backgroundSize: 'cover',
    //   backgroundPosition: 'center',
    //   backgroundRepeat: 'no-repeat',
    // // }}
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
                    Remove
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
