import React from 'react'
import Logo from '../../../icons/TECH-removebg-preview.png'
import { Link } from 'react-router-dom'
import NavLinks from './NavLinks'
import { Button } from './Button'
import { RiMenuLine } from 'react-icons/ri'
const MainNav = () => {
  return (
    <nav  className='bg-red' style={{background:'red'}}>
     <div className="flex items-center font-medium justify-around">
        <div className="z-50 p-5 md:w-auto w-full flex justify-between"> 
         <Link to='/'><img src={Logo} alt="logo" className='md:cursor-pointer h-12' /></Link>
         <div className='text-3xl'>
          <RiMenuLine/>
          </div> 
        </div>
        <ul className='md:flex hidden uppercase items-center gap-8 '>
        <NavLinks/> 
         <li>
          <Link to='About' className='py-7 px-3 inline-block'>
            À propos
          </Link>
         </li>
         <li>
          <Link to='Contact' className='py-7 px-3 inline-block'>
            Contact
          </Link>
         </li>
        </ul>
        <div className="md:block hidden">
          <Button/>
          </div>
          {/* Mobile nav */}
        <ul className={`
        md:hidden bg-white absolute w-full h-full bottom-0 py-24 pl-4

        `}
        >
          <li>
          <Link to='About' className='py-7 px-3 inline-block'>
            À propos
          </Link>
          </li>
         <li>
          <Link to='Contact' className='py-7 px-3 inline-block'>
            Contact
          </Link>
         </li>
          <NavLinks/>
          <div className="py-5">
            <Button/>
          </div>
        </ul>
     </div>
    </nav>
  )
}

export default MainNav