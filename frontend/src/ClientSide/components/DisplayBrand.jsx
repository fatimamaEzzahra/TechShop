import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Product from './Product'
import './DisplayBrand.css'
const DisplayBrand = () => {
 const {brand}=useParams()
 const [products,setProducts]=useState([])
 const [loading,setLoading ] = useState(true)
 useEffect(()=>{
  fetchProduct();
 },[]);
 const fetchProduct=async()=>{
  try{
  const response=await axios.get(`http://127.0.0.1:8000/api/produits`);
  setProducts(response.data)
  setLoading(false)

  }
  catch(error){
    console.log('category error ',error)
  }
 }
 const filterdProducts=products.filter((p)=>(p.marque_pr===brand))
 if(loading){
  return (
    <div className="loading-container">
    <div className="spinner-border text-secondary loading" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
  )
 }
  return (
    <div className="products">
      {filterdProducts.map((p)=> 
      <div key={p.id}>
     <Product product={p}/>
     </div>
     )} 
    </div>
  )
}

export default DisplayBrand