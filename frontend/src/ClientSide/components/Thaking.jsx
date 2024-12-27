import React from 'react'
import {useLocation,Link} from 'react-router-dom'
import './Thanking.css'
import { BsArrowLeft, BsArrowRight, BsBack } from 'react-icons/bs'
const Thaking = () => {
  const location = useLocation()
  
  return (

    <div className='container  mt-7 thanking-container' style={{height:'300px'}}>
     <h2 className=' m-7 flex content-center thanking'> Thank You For Purchasing with Thec Shop</h2>
     <h5 className='thanking-message'>Your order is going to be delivered after two days </h5>
    <Link to='/' className='backhome'>  <button className='btn  btn-secondary flex items-center '><BsArrowLeft/> Back to home</button></Link>
    </div>
  )
}

export default Thaking