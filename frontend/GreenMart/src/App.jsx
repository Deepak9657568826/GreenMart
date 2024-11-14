import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, HStack } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import Allroutes from './Allroutes'
import SignIn from './pages/SignIn'
import Login from './pages/Login'
import Footer from './components/Footer'




function App() {


  return (
    <div>
      
      <Navbar /> 
      {/* <Allroutes/> */}
      <SignIn/>
      <Login/>
      <Footer/>
    </div>
  )
}

export default App
