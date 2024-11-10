import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import About from './pages/About'
import Product from './pages/Product'
import SignIn from './pages/SignIn'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Payment from './pages/Payment'
import Cart from './pages/Cart'
import Order from './pages/Order'

function Allroutes() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/product" element={<Product/>}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/payment" element={<Payment/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/order" element={<Order/>}/>

        </Routes>
      
    </div>
  )
}

export default Allroutes
