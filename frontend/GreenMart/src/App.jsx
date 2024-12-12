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





function App() {
  const dispatch = useDispatch()
  const toast = useToast()
  useEffect(()=>{
    dispatch(addToCartProduct(toast))

  },[])

  return (
    <div>

      <Navbar />
      <div className='mt-20'>
      <Allroutes />

      </div>
      
      {/* <SignIn/> */}
      {/* <Login/> */}
      <Footer/>
      {/* <HomePage/> */}
      {/* <Product />
      <AddProduct/> */}
    {/* <TermsModal/> */}

    </div>
  )
}

export default App
