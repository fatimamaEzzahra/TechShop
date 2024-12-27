import React, { useEffect, useState } from 'react'
import {BsFillBellFill,BsFillEnvelopeFill,BsPersonCircle,BsSearch,BsJustify} from 'react-icons/bs'
import { FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../../axios';
function DropDownProfile({ isVisible  }) {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      
      const response = await axiosClient.post('/api/logout');
      
      navigate('/')
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <div className={`flex flex-col dropDownProfileAdmin ${isVisible ? 'visible' : 'hidden'}`}>
      <ul className="flex flex-col gap-2">
        <hr style={{ width: '100%', color: 'black' }} />
        <li onClick={logout}> <FaSignOutAlt/> Log out</li>
        {/* <li><FaCog/> Settings</li> */}
      </ul>
    </div>
  );
}
const Header = ({OpenSideBar}) => {
  const [visibility,setVisibility]=useState(false); 
   const [user,setUser]=useState({})
   const navigate = useNavigate();

   const logout = async () => {
     try {
       
       const response = await axiosClient.post('/api/logout');
       
       navigate('/')
     } catch (error) {
       console.log('error', error);
     }
   }
  const userData = async()=>{
    try{
    const response = await axiosClient.get('/api/user')
    
    setUser(response.data)
   }
    catch(error){
     console.log('error',error)
    }
   }
   useEffect(()=>{
    userData()
   },[])
  const handleVisibility=()=>{
    setVisibility(!visibility);
  }
  return (
    <header className='header'>
      <div className=' header-left-menu'>
      <div className="menu-icon">
          <BsJustify className='icon' onClick={OpenSideBar}/>
          
        </div>
        <div className="header-left">
        < BsPersonCircle className={`icon`} onClick={handleVisibility}/>    
        
        
        <h5>{user.name}</h5>
        </div>
      </div>
        
        
        <div className="header-right">
          
          <hr className='hr-profile' />
        <h5 onClick={logout} className='flex pointer w-6 '> <FaSignOutAlt className='logout-btn'/></h5>

          

        </div>
    </header >
  )
}

export default Header