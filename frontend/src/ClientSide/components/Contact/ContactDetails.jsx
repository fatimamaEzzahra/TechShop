import { Email, LocationCity, LocationOffRounded, LocationOn, LocationOnSharp, Phone, PhoneForwarded } from '@mui/icons-material'
import React from 'react'
import { BsPersonStandingDress } from 'react-icons/bs'
import { FaLocationArrow, FaSearchLocation } from 'react-icons/fa'
import './ContactDetails.css'
const ContactDetails = () => {
  return (
    <div className='flex details  '>
    <div className="detail">
     <LocationOnSharp/>
     <h5 className='h5'> Address </h5>
     <p>CasaNershor Rue 8 Casablanca</p>
    </div>
     <div className="detail">
      <Phone/>
      <h5 className='h5'> Phone </h5>
      <p>+212 00 00 00 00 </p>
     </div>
     <div className="detail">
      <Email/>
      <h5 className='h5'> Email </h5>
      <p>f.zehra.elkawkabi@gmail.com</p>
     </div>
    </div>
  )
}

export default ContactDetails