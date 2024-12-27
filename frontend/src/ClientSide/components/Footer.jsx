import React from 'react'
import './Footer.css'
import footer_logo from '../../icons/TECH_admin-removebg-preview.png'
import { FaFacebook, FaInstagram, FaPinterest, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

 const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
       <img src={footer_logo} alt="" />
      </div>
      <ul className="footer-links">
      <li> Company</li>
      <li>Products</li>
      <li>Offices</li>
      <li>About</li>
      <li> <Link to={"/contact"}> Contact</Link> </li>
      </ul>
      <div className="footer-social-icon">
       <div className="footer-icons-container ">
       {/* <img className='instagram' src={instagram_icon} alt="" /> */}
       <FaInstagram className='instagram pointer icon'/>
       </div>
       <div className="footer-icons-container ">
       {/* <img src={pinterster_icon} alt="" /> */}
       <FaPinterest className='pointer icon'/>
       </div>
       <div className="footer-icons-container">
       {/* <img src={whatsapp_icon} alt="" /> */}
       <FaFacebook className='pointer icon'/>
       </div>
       
      </div>
      <div className="footer-copyright">
       <hr />
       <p>Copyright @ 2023 - All Right Reserved</p>
      </div>
     </div>
  )
}
export default Footer