import React, { useContext } from 'react'
import Couresel from '../components/Couresel'
import Product from './Product'
import { orderContext } from '../hook/SocketServer'

function HomePage() {

  
  return (
    <div>
      <Couresel/>
      <Product/>
    </div>
  )
}

export default HomePage
