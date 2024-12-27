import React, { useEffect, useState } from "react";
import { axiosClient } from "../../axios";
import { useNavigate , Link } from "react-router-dom";
import logo from '../icons/TECH-removebg-preview.png'
import './Login.css'
import { Lock , Email} from "@mui/icons-material";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const  [logged,setLogged] = useState(true)
  const navigate=useNavigate();
  const verifNotLogged =async() => {
    try {
      const user = await axiosClient.get('/api/user');
      if(user){
        setLogged(true)
        navigate('/')
      }
      else{
        setLogged(false)
      }
    }
    catch(error){
      console.log(error)
      setLogged(false)
    }
  } 
  useEffect(()=>{
    verifNotLogged();
  })
  if(logged){
    navigate('/')
    return <h1 className="h1"></h1>
  }
  const submit = async (event) => {
    event.preventDefault(); 

    try {
      const response = await axiosClient.post('/api/login', { email, password });
      if(response.data.status === 422){
        console.log(response.data.errors)
        setErrors(response.data.errors)
      }
      else{
      const user = await axiosClient.get('/api/user');
      if(user.data.role_id === 1){
        navigate('/admin')
        setErrors({})
      }
      else{
        navigate('/')
        console.log('Login successful:', response.data);
        setEmail('');
        setPassword('');
        setErrors({})
      }
      }
       
    } catch (error) {
      console.error('Login failed:', error.response.data.message); 
      setErrors( error.response.data)
    }
  };
 
  return (
    <div className="container login-container">
      <img src={logo} alt="" className="logo-auth" />
      <h1 className="h1 mt-9">Log in </h1>
      <form onSubmit={submit} className="login-form">
        
      <div>
      <div  className={`input-group  ${errors.email ? "border-danger" : "" } `}>
      <Email className={`  ${errors.email ? "icon-danger" : "" } `} />
      <input className={`input-login   `}  type="email" placeholder="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
    
      </div>
      <small className='text-danger'>{errors.email}</small>
     </div>
     <div>
        <div  className={`input-group  ${errors.password ? "border-danger" : "" } `}>
          <Lock className={`  ${errors.password ? "icon-danger" : "" } `} />
        <input className={`input-login `}  type="password" placeholder="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />   
        </div>
        <small className='text-danger'>{errors.password}</small>
        <small className='text-danger'>{errors.message}</small>
        </div>
         <Link to={'/forgot-password'}> 
          <p className="float-end forgot-para">Forgot  password?</p>
        </Link>
        <input type="submit" value="Log in" id='login-submit' />
      </form>
      <p >Not a member yet? <Link to={'/register'} style={{color:'red',textDecoration:'underline'}}> Sing Up </Link></p>
    </div>
  );
};

export default Login;
