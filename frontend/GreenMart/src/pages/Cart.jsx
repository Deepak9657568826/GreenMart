import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCartProduct } from "../redux/actionCreator";
import { useToast } from "@chakra-ui/react";
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

function Cart() {
  const toast = useToast();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const totalPrice = cart.reduce((acc, temp) => {
    return acc + temp.price;
  }, 0);

  useEffect(() => {
    dispatch(addToCartProduct(toast));
  }, []);

  const handleRemove = async (id) => {
    try {
      const response = await axios.delete(`${deleteCartProductUrl}/${id}`);
      if (response.data.msg == "Product remove from cart") {
        toast({
          title: `${response.data.msg}`,
          description: `${response.data.msg}`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        dispatch(addToCartProduct(toast));
      } else {
        toast({
          title: `${response.data.msg}`,
          description: `${response.data.msg}`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      toast({
        title: `${error.message}`,
        description: `${error.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  if (cart.length == 0) {
    return (
      <EmptyCard />
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
        {cart &&
          cart.map((product) => (
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
                    Caffè latte is a coffee beverage of Italian origin made with
                    espresso and steamed milk.
                  </Text>
                </CardBody>

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
