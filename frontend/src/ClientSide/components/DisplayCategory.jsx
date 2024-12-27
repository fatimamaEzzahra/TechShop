import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './DisplayCategory.css'
import Product from './Product'
export const DisplayCategory = () => {
 const {category}=useParams()
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
 const filterdProducts=products.filter((p)=>(p.category_pr===category))
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
    <div className='products'>
     {filterdProducts.map((p)=> 
     <div key={p.id}>
     <Product product={p}/>
     </div>
     )} 
    </div>
  )
}
