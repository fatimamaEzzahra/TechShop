import React, { useEffect, useState } from "react";
import { axiosClient } from "../../axios";
import { Link, useNavigate } from "react-router-dom";
import { Email, Lock, Person } from "@mui/icons-material";
import logo from '../icons/TECH-removebg-preview.png'

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const  [logged,setLogged] = useState(true)
  const  [loading,setLoading] = useState(true)
  const navigate = useNavigate();
  const verifNotLogged =async() => {
    try {
      const user = await axiosClient.get('/api/user');
      if(user){
        setLogged(true)
        setLoading(false)
        navigate('/')
      }
      else{
        setLogged(false)
        setLoading(false)
      }
    }
    catch(error){
      console.log(error)
      setLogged(false)
      setLoading(false)
    }
  } 
  
  useEffect(()=>{
    verifNotLogged();
  })
  const submit = async (event) => {
    event.preventDefault();

    // if (password !== confirmPassword) {
    //   console.error('Password and confirm password do not match');
    //   return;
    // }

    try {
      const response = await axiosClient.post('/api/register', { name, email, password ,password_confirmation: confirmPassword , role_id:2});
      if(response.data.status===422){
        console.log(response.data.errors)
        setErrors(response.data.errors)
        setLoading(false)
      }
      else{
        console.log('Register successful:', response.data);
        setErrors({})
        setEmail('');
        setPassword('');
        setName('');
        navigate('/')
        setLoading(false)
      }
      
    } catch (error) {
      console.error('Register failed:', error.response.data);
      setLoading(false)
    }
  };
   if(logged){
    return <h1 className="h1 flex items-center"></h1>
  }
  return (
    <div className="container login-container" >
      <img src={logo} alt="" className="logo-auth" />
      <h1 className="h1 mt-9">Sign Up </h1>
      <form onSubmit={submit}  className="login-form">
        <div>
           <div  className={`input-group  ${errors.name ? "border-danger" : "" } `} >
        <Person  className={`  ${errors.name ? "icon-danger" : "" } `} />
      <input className={`input-login  `}  type="text" placeholder="name" name="name" value={name} onChange={(e) => setName(e.target.value)} /><br /><br />
      </div>
      <small className='text-danger'>{errors.name}</small>
        </div>
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
      </div>
      <div>
        
      <div  className={`input-group  ${errors.password ? "border-danger" : "" } `}>
        <Lock className={`  ${errors.password ? "icon-danger" : "" } `}/>
      <input className="input-login " type="password" name="confirmPassword" placeholder=" confirm password " value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /><br /><br />
      </div>
      </div>
        <input type="submit" value="Sign Up" id='login-submit' />
      </form>
      <p>Already have account? <Link to={"/login"} style={{color:'red',textDecoration:'underline'}}>Login in</Link></p>
    </div>
  );
};

export default Register;
