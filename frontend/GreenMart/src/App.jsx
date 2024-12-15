import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, HStack, useToast } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import Allroutes from './Allroutes'
import SignIn from './pages/SignIn'
import Login from './pages/Login'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import Product from './pages/Product'
import AddProduct from './pages/AddProduct'
import TermsModal from './pages/Model'
import { useDispatch } from 'react-redux'
import { addToCartProduct } from './redux/actionCreator'
import axios from 'axios'
import { LOGINFAILURE, LOGINSUCCESS } from './redux/actionType'





function App() {
  const verifyTokenUrl = `http://localhost:4500/verifyToken`
  const token  =  localStorage.getItem("token")  

  const dispatch = useDispatch()
  const toast = useToast()
  useEffect(()=>{
    dispatch(addToCartProduct(toast))
  },[])
   
  const verifyToken = async()=>{
     const user = localStorage.getItem("user")
     const parseUser = JSON.parse(user)

     try {
       const tokenVerify = await axios.post(verifyTokenUrl , {token})
         if(tokenVerify.data.isValid){
           dispatch({ type: LOGINSUCCESS, payload: parseUser })
         }
         else{
           localStorage.removeItem("token")  
            localStorage.removeItem("user")
            dispatch({ type: LOGINFAILURE, payload: 'Invalid token' });
         }
         
     } catch (error) {
      console.log(error.message);
      dispatch({ type: LOGINFAILURE, payload: error.message });
     }

  }
if(token){
  useEffect(()=>{
    verifyToken()
  },[])
  
}
else{
  dispatch({ type: LOGINFAILURE, payload: "Login failed" });
}
  


  return (
    <div className='w-11/12 m-auto'>

      <Navbar />
      <div className='mt-20'>
      <Allroutes />
      </div>
      <Footer/>


    </div>
  )
}

export default App
