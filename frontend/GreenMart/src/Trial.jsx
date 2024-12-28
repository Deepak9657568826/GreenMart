import { useStatStyles } from '@chakra-ui/react'
import React, { useState } from 'react'

function Trial() {

    const img = [
        "https://cdn-imgix.headout.com/tour/7064/TOUR-IMAGE/b2c74200-8da7-439a-95b6-9cad1aa18742-4445-dubai-img-worlds-of-adventure-tickets-02.jpeg?auto=format&w=900&h=562.5&q=90&fit=crop&ar=16%3A10",
        "https://d2j6dbq0eux0bg.cloudfront.net/images/66610504/2636936256.jpg",
        "https://static.wanderon.in/wp-content/uploads/2024/04/img-worlds-of-adventure.jpg"
    ]
    const [image , setImage] = useState(img[0])
  return (
    <div>
        <div>
            <img className='h-96 w-96' src={image} alt="" />
        </div>
        <div className='flex gap-3 my-20'>
        {img.map((temp)=>(
           
                <img className='h-20 w-20'
                 src={temp} 
                 alt="" 
                 onClick={()=>(setImage(temp))}
                 />
            ))}

            </div>
      
    </div>
  )
}

export default Trial
