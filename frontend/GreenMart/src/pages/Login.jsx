import React, { useContext, useState } from 'react';

import { Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom'; // Make sure to use this if you're using React Router for navigation
import "../Styles/SignIn.css";
import { useToast, Button } from '@chakra-ui/react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { loginFunction } from '../redux/actionCreator';
import Toastnotification from '../utils/Toastnotification';
import { orderContext } from '../hook/SocketServer';
import { HStack, PinInput, PinInputField } from "@chakra-ui/react";


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [otp, setOtp] = useState("");

  // forgot password
const [forgotModel , setForgotModel] = useState(true)

  const [enterOtpModel, setEnterOtpModel] = useState(false)
  const [mobileEnterModel, setmobileEnterModel] = useState(true)
  const [mobile, setMobile] = useState()
  const [showNewPasswordModel, setShowNewPasswordModel] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmedNewPassword, setconfirmedNewPassword] = useState("")


  const navigate = useNavigate()
  const toast = useToast()
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  const { showToast } = Toastnotification()

  const { socket, setSocket } = useContext(orderContext)

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const fromData = {
      email,
      password
    }

    dispatch(loginFunction(fromData, toast, navigate, setIsSubmitting, setEmail, setPassword, showToast, socket, setSocket))
  }

  // model for enter mobile number and send otp
  const [openModal, setOpenModal] = useState(false);


  function onCloseModal() {
    setOpenModal(false);
  }

  const otpurl = `https://greenmart-wyyp.onrender.com/otpsend/`

  const sendOpt = async () => {
    setSpinner(true)
    console.log(mobile);
    if(mobile.length > 10 || mobile.length < 10){
      showToast("check mobile number", "Mobile number length should be exact 10 digit" , "error")
      setSpinner(false)
      return
    }
    try {
      const response = await axios.post(otpurl, { mobileNumber: mobile })
      console.log(response.data.user);


      if (response.data.message == `OTP sent successfully`) {
        showToast("opt send successfully", `${response.data.message}`)
        localStorage.setItem("userEmail", response.data.user.email)
        setSpinner(false)
        setEnterOtpModel(true)
        setmobileEnterModel(false)
       
      }
      else {
        showToast(`${response.data.message}`, `${response.data.message}`, `error`)
        setSpinner(false)
        setEnterOtpModel(false)
        setmobileEnterModel(true)
      }
    } catch (error) {
      console.log(error.message);
      showToast(`${error.message}`, `${error.message}`, `error`)
      setSpinner(false)
      setEnterOtpModel(false)
      setmobileEnterModel(true)
    }
  }

  const captureOtp = (value) => {
    setOtp(value); 
  };


  const emailCheck = localStorage.getItem("userEmail")
  const verifyOtpurl = `https://greenmart-wyyp.onrender.com/verifyOtp`

  const verifyOtp = async () => {
    console.log(otp);
    try {
      const response = await axios.post(verifyOtpurl, { emailCheck, otp })
      console.log(response.data);
      if (response.data.message == `User not found , please register first`) {
        showToast("User not register", "Please register first", `error`)
        setShowNewPasswordModel(false)
      }
      else if (response.data.message == `OTP verified, you can reset your password.`) {
        showToast("OTP verified", "OTP verified successfully")
        setShowNewPasswordModel(true)
        setEnterOtpModel(false)
      }
      else if (response.data.message == `Otp invalid, please enter right Otp`) {

        console.log("enter in wrong otp");
        
        showToast("Invalid OTP", "Please enter correct OTP", `error`)
        setShowNewPasswordModel(false)
      }
      else {
        showToast(`${response.data.message}`, `${response.data.message}`, `error`)
        setShowNewPasswordModel(false)

      }

    } catch (error) {
      console.log(error.message);
      setShowNewPasswordModel(false)
      showToast(`${error.message}`, `${error.message}` , `error`)

    }
  }

  const updatePassword = `https://greenmart-wyyp.onrender.com/updatePassword`
  const passwordSet = async () => {
    try {
      if (newPassword != confirmedNewPassword) {
        showToast(`Both fields should be match`, `Both  fields should be match` , `error`)

        // alert("both password should same")
        return
      }
      else {
        const response = await axios.post(updatePassword, { emailCheck, newPassword })
        console.log(response.data.message);
        if(response.data.message == `Password updated successfully`){
          showToast("Password update successfully", "Password update successfully")
          // setEnterOtpModel(false)
          setForgotModel(false)
          setShowNewPasswordModel(false)
          // navigate("/login")
        }
        else {
          showToast(`${response.data.message}`, `${response.data.message}` , `error`)
        }
        
      }
    } catch (error) {
      console.log(error.message);
      showToast(`${error.message}`, `${error.message}` , `error`)
    }
 
  }


  return (
    <div className="h-[85vh] flex flex-col md:flex-row bg-gray-100 mt-8 mb-8">
    {/* Image Section (55%) */}
    <div className="login-background w-full md:w-[55%] h-[400px] md:h-auto bg-cover bg-center" >
    </div>
  
    {/* Form Section (45%) */}
    <div className="md:w-[45%] w-full flex items-center justify-center px-10 ">
      <form onSubmit={handleSubmit} className="w-9/12 max-w-sm">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Log in to GreenMart</h3>
        <p className="text-sm text-gray-600 mb-8">Enter your details below</p>
  
        {/* Email Input */}
        <div className="mb-8">
          <input
            type="email"
            placeholder="Email or Phone Number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pb-2 border-none   focus:border-gray-800 text-sm  bg-transparent "
            required
          />
          <hr className=" border-gray-600"/>
        </div>
  
        {/* Password Input */}
        <div className="mb-8">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pb-2 border-none  focus:border-gray-800 text-sm  bg-transparent "
            required
          />
           <hr className=" border-gray-600"/>
        </div>
  
        {/* Submit Button & Forgot Password */}
        <div className="flex justify-between items-center mt-6 mb-8">

          <button
            type="submit"
            className="px-8 py-3 text-white text-sm font-medium rounded-md bg-green-600 hover:bg-green-700"
          >
            Log In
          </button>
          <Link className="text-base text-red-600 hover:underline" onClick={() => setOpenModal(true)}>
            Forgot Password?
          </Link>
          
          
        </div>
        <Link className="text-sm text-red-600 hover:underline">Do not have account? register first!</Link>

      </form>
    </div>
  </div>
  
  
  
  

  );
}

export default Login;


