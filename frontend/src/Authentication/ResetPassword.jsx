 import React, { useEffect, useState } from "react";
 import { axiosClient } from "../../axios";
 import { Link, useNavigate, useParams } from "react-router-dom";
 import { Email, Lock, Person } from "@mui/icons-material";
 import logo from '../icons/TECH-removebg-preview.png'

 const ResetPassword = () => {
   const {token,email} = useParams()
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [errors, setErrors] = useState();
   const  [isSuccess,setIsSuccess] = useState(false)
   const  [loading,setLoading] = useState(true)
   const navigate = useNavigate();
   
   

   const submit = async (event) => {
     event.preventDefault();

     try {
       const response = await axiosClient.post('/api/reset-password', { token,email,password ,password_confirmation: confirmPassword });
       if(response.data.status===422){
         console.log(response.data.errors)
         setErrors(response.data.message)
         setLoading(false)
       }
       else{
         console.log('Register successful:', response.data);
         setErrors()
         setIsSuccess(true)
         console.log(response.data.message)
         navigate('/login')
       }
       
     } catch (error) {
       setErrors(error.response.data.message)
       console.error('Register failed:', error.response.data);
       setLoading(false)
     }
   };
   useEffect(()=>{
    if(isSuccess){
     navigate('/login')
    }
   })
   return (
     <div className="container login-container" >
       <img src={logo} alt="" className="logo-auth" />
       <h1 className="h1 mt-9">Reset Your password </h1>
       <form onSubmit={submit}  className="login-form">
        
       <div>
         
       <div className={`input-group  `}>
        <Lock  />
        <input className={`input-login `}  type="password" placeholder="new password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />   
      </div>

       </div>
       <div>
         
       <div  className={`input-group   `}>
         <Lock />
       <input className="input-login " type="password" name="confirm new Password" placeholder=" confirm password " value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /><br /><br />
       </div> 
       <div>

        {errors  &&
              <p  style={{ color: 'red',fontSize:'15px',display:'flex',justifyContent:'center' }}>{errors}</p>
            }

        </div>
       </div>
         <input type="submit" value="Reset" id='login-submit' />
       </form>
      
       <p><Link to={"/login"} style={{color:'red',textDecoration:'underline'}}>Go back to the Login Form</Link></p>
     </div>
   );
 };

 export default ResetPassword;
