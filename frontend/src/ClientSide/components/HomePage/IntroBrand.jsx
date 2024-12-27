import React from 'react'
import { FaAccessibleIcon, FaAffiliatetheme, FaAlignCenter, FaCheckCircle, FaCreditCard, FaGoodreads, FaHeadphones, FaPaypal, FaSdCard, FaSeedling, FaSuperpowers, FaTruck } from 'react-icons/fa'
import './IntroBrand.css'
import { FlashOnOutlined } from '@mui/icons-material'
const IntroBrand = () => {
  return (
    <div className=' intro-container'>
     <div className="intro-part flex gap-6 items-center">
      <FaTruck className='icon-brand-intro'/>
      <div>
      <h4 className='h6'> Free Shipping</h4>
      <p>Free shipping on all orders</p>
     </div>
     </div>
     <div className="intro-part flex gap-6 items-center">
      <FaCheckCircle className='icon-brand-intro'/>
      <div>
      <h4 className='h6'> Money Guarantee</h4>
      <p>30 Day Money Back</p>
     </div>
     </div>
     <div className="intro-part flex gap-6 items-center">
      <FaHeadphones className='icon-brand-intro'/>
      <div>
      <h4 className='h6'> Online Support 24/7</h4>
      <p>Technical Support 24/7</p>
     </div>
     </div>
     <div className="intro-part flex gap-6 items-center">
      <FaCreditCard className='icon-brand-intro'/>
      <div>
      <h4 className='h6'> Secure Payment</h4>
      <p>All Cards Accepted</p>
     </div>
     </div>
    </div>
  )
}

export default IntroBrand