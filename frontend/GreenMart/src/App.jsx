import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, HStack } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import Allroutes from './Allroutes'


function App() {


  return (
    <div>
      <Navbar /> 
      <Allroutes/>
    </div>
  )
}

export default App
