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
    <div className="login-background">
      <form onSubmit={handleSubmit} className="logininform bg-white mx-auto p-6  shadow-lg rounded-md">
        <h3 className="text-xl font-extrabold p-6 text-center text-amber-950">Login</h3>
        <div className="space-y-4">
          <div className="flex flex-col items-start">
            <label htmlFor="email" className="text-sm font-medium text-gray-900 mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full p-4 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              required
            />
          </div>

          <div className="flex flex-col items-start">
            <label htmlFor="password" className="text-sm font-medium text-gray-900 mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-4 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              required
            />
          </div>

          <div className='flex justify-between items-center'>
            <button
              type="submit"
              className={`w-1/3 px-5 py-2.5 text-white text-sm font-medium rounded-lg focus:ring-4 focus:outline-none ${isSubmitting ? 'bg-gray-500' : 'bg-blue-700 hover:bg-blue-800'} focus:ring-blue-300`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <span className="loader mr-2 border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin"></span>
                  Submitting...
                </span>
              ) : (
                'Submit'
              )}
            </button>

            <Link
              className="block  text-sm text-blue-600 hover:text-blue-800 hover:underline text-center"
              onClick={() => { setOpenModal(true) }}
            >
              Forgot password ?
            </Link>
          </div>

          {/* Link to Sign-Up Page */}
          <p className="mt-4 text-sm text-gray-600 ">
            Don’t have an account?{' '}
            <Link to="/signin" className="text-blue-600 hover:underline">Sign up first</Link>
          </p>
        </div>
      </form>


      {/*  model for forgot password */}
      {
         
         forgotModel &&

        <Modal
          show={openModal}
          size="md"
          onClose={onCloseModal}
          className="relative bg-slate-950 rounded-lg shadow-lg p-4 z-50"
        >
          <Modal.Header>
            <h2 className="text-lg font-bold text-gray-800">Forgot Password</h2>
          </Modal.Header>

          {mobileEnterModel && (
            <Modal.Body>
              <div className="space-y-6">
                <p className="text-sm text-gray-600">
                  Please enter your mobile number below. We’ll send you an OTP to reset your password.
                </p>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="number" value="Mobile Number" />
                  </div>
                  <TextInput
                    id="number"
                    placeholder="Enter your mobile number"
                    value={mobile}
                    onChange={(event) => setMobile(event.target.value)}
                    required
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                </div>
                <Button
                  colorScheme="blue"
                  onClick={sendOpt}
                  className="text-white bg-blue-600 hover:bg-blue-700 rounded-md py-2"
                >
                  {spinner ? (
                    <div role="status" className="flex justify-center">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    `Send OTP`
                  )}
                </Button>
              </div>

            </Modal.Body>
          )}


          {enterOtpModel && (

            <Modal.Body>
              <div className="space-y-6">
                <h2 className="text-center text-lg font-bold text-gray-800">Enter OTP</h2>
                <p className="text-sm text-gray-600 text-center">
                  Please enter the 6-digit OTP sent to your mobile number {mobile}
                </p>
                <div className="flex justify-center">
                  <HStack>
                    <PinInput otp onChange={captureOtp}>
                      <PinInputField className="border border-gray-300 p-2 text-center rounded-md" />
                      <PinInputField className="border border-gray-300 p-2 text-center rounded-md" />
                      <PinInputField className="border border-gray-300 p-2 text-center rounded-md" />
                      <PinInputField className="border border-gray-300 p-2 text-center rounded-md" />
                      <PinInputField className="border border-gray-300 p-2 text-center rounded-md" />
                      <PinInputField className="border border-gray-300 p-2 text-center rounded-md" />
                    </PinInput>
                  </HStack>
                </div>
                <div className="flex justify-center">
                  <Button
                    colorScheme='blue'
                    onClick={verifyOtp}
                    className="text-white bg-blue-600 hover:bg-blue-700 rounded-md py-2 px-4"
                  >
                    Verify OTP
                  </Button>
                </div>
              </div>
            </Modal.Body>

          )}

          {/* showNewPasswordModel */}
          {showNewPasswordModel &&
            <Modal.Body>
              <div className="space-y-4">
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    Enter New Password
                  </label>
                  <input
                    id="newPassword"
                    type="text"
                    value={newPassword || ""}
                    placeholder="Enter new password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => { setNewPassword(e.target.value) }}
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="text"
                    placeholder="Confirm new password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => { setconfirmedNewPassword(e.target.value) }}
                  />
                </div>
                <button
                  onClick={passwordSet}
                  className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              </div>
            </Modal.Body>
          }
        </Modal>
      }

    </div>
  );
}

export default Login;


