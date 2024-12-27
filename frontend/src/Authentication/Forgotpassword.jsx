import { Email } from '@mui/icons-material';
import React, { useState } from 'react'
import './Login.css'
import { axiosClient } from '../../axios';
import { BsArrow90DegLeft, BsArrowBarLeft, BsArrowLeftCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Alert } from '@mui/material';

const Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);
  const [visibility, setVisibility] = useState('hidden-alert');
  
  const submit = async(e) => {
   e.preventDefault()
   try{
   const response = await axiosClient.post('/api/forgot-password',{email})
    setErrors([])
   console.log(response)
   setVisibility('visible-alert')
  }
  catch(error){
   console.log(error)
   setErrors(error)
  }

  }
  return (
    <div>

    <Link to={'/login'}><BsArrowLeftCircle className='float-left'  /></Link>
    <Alert variant="filled" severity="success" className={`alert-sent ${visibility}`} >
  Message sent to your email. <br />
  you can check your inbox.
</Alert>
    <div className="container login-container">
      <h1 className="h1 mt-9"> Password Reset</h1>
     <form onSubmit={submit} className="login-form">
     <div  className={`input-group  ${errors.email ? "border-danger" : "" } `}>
      <Email className={`  ${errors.email ? "icon-danger" : "" } `} />
      <input className={`input-login   `}  type="email" placeholder="email" name="email"  onChange={(e) => setEmail(e.target.value)} /><br /><br />
      </div>
      <input type="submit" value="Send" id='login-submit' />

     </form>
     <p>We will send You a link in your email to reset your password </p>

    </div>
    </div>
  )
}

export default Forgotpassword