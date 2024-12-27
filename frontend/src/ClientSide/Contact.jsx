import React from 'react'
import HeroContact from './components/Contact/HeroContact'
import FormContact from './components/Contact/FormContact'
import ContactDetails from './components/Contact/ContactDetails'
import './Contact.css'
const Contact = () => {
  return (
    <div>
     <HeroContact/>
     <div className="contact-info">
      
     <ContactDetails/>
     <FormContact/>
     </div>
    </div>
  )
}

export default Contact