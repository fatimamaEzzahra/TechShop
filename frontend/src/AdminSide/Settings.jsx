import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../axios'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
 const [user,setUser]=useState([])
 const navigate=useNavigate()
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
  userData();
 },[])

 const logout = async()=>{
  try{
    const response = await axiosClient.post('/api/logout')
    setUser(response.data)
    navigate('/')
   }
    catch(error){
     console.log('error',error) 
    }
 }
  return (
    <div>
      <h1>name: </h1> {user.name} <br /><br />
      <h1>email: </h1> {user.email}<br /><br />
      <button onClick={logout}>Log out</button>
    </div>
  )
}

export default Settings