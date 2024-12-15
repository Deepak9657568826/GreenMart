import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import About from './pages/About'
import Product from './pages/Product'
import SignIn from './pages/SignIn'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Payment from './pages/Payment'
import Cart from './pages/Cart'
import Order from './pages/Order'
import AddProduct from './pages/AddProduct'
import SigleBuy from './pages/SigleBuy'
import ParticultOrder from './pages/ParticultOrder'
import AdminAddedProduct from './pages/AdminAddedProduct'

function Allroutes() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();  
  
    useEffect(() => {
      window.scrollTo(0, 0);  
    }, [pathname]);
  
    return null;  
  };

  return (
    <div>
      <ScrollToTop/>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            {/* <Route path="/about" element={<About/>}/> */}
            <Route path="/product" element={<Product/>}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/payment" element={<Payment/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/order" element={<Order/>}/>
            <Route path="/addproduct" element={<AddProduct/>}/>
            <Route path="/singleProduct/:id" element={<SigleBuy/>}/>
            <Route path="/particularOrder" element={<ParticultOrder/>}/>
            <Route path="/adminProduct" element={<AdminAddedProduct/>}/>

        </Routes>
      
    </div>
  )
}

export default Allroutes
