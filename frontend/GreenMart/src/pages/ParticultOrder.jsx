import axios from 'axios';
import React, { useEffect, useState } from 'react'

function ParticultOrder() {
    const [order , setAllOrder] = useState([])
    const url = "http://localhost:4500/particularOrder"
      
    
  async function fetchAllProduct() {
    try {
      const response = await axios.get(url);
      const order = response.data.orderByUser;
      setAllOrder(order);
      console.log(order);
      
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchAllProduct();
  }, []);


  return (
    <div>
      
    </div>
  )
}

export default ParticultOrder
