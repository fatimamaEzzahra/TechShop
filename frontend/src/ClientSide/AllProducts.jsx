import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../axios'
import Product from './components/Product';
import './AllProducts.css'
const AllProducts = () => {
 const [products,setProducts]=useState([])

useEffect(()=>{
 
  fetchProduct();
 },[]);
 const fetchProduct=async()=>{
  try{
  const response=await axiosClient.get(`/api/produits`);
  setProducts(response.data)
  }
  catch(error){
    console.log('category error ',error)
  }}
  return (
   <div className=" all-products">
   {products.map((p)=> 
   <div key={p.id}>
  <Product product={p}/>
  </div>
  )} 
 </div>
  )
}

export default AllProducts