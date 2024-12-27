import React from 'react'
import './HeroContact.css'
import heroImage from '../../../images/heroContact.jpg'
const HeroContact = () => {
  return (
    <div>
      <div className="hero-contact">
       <img src={heroImage} alt="" />
       <h1 >Contact Us </h1>
      </div>
    </div>
  )
}

export default HeroContact