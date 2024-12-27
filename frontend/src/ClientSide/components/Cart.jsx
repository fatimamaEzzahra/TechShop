import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../../axios'
import './Cart.css'
import emptyCart from '../../icons/emptycart.jpeg'
import { useNavigate } from 'react-router-dom'
import { FaTrash, FaXingSquare } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Decrement, Increment } from "../Reducers/action";
import CloseIcon from '@mui/icons-material/Close';
const Cart = () => {
 const [cart,setCart]=useState([])
 const [total,setTotal]=useState(0)
 const [quantity,setQuantity]=useState(1)
 const [loading,setLoading]=useState(true)
 const dispatch=useDispatch()
 const navigate =useNavigate()
 const fetchCart=async()=>{
  try{
  const response = await axiosClient.get('/api/Cart')
  setCart(response.data.cart)
  const T = response.data.cart.reduce((t, c) => t + c.product.prix_pr * c.product_qty, 0)
  setTotal(T)
  setQuantity(response.data.cart.product_qty)
  setLoading(false)
  }
  catch(error){
   if(error.request.status && error.request.status ===401){
    navigate('/')
   }
   else console.log(error)
  }
 }
 const handleRemove = async(id)=>{
  try{
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this product from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        const response = await axiosClient.post('/api/deletePrfromCart',{product_id:id});
        console.log(response.data.message)
        fetchCart();
        dispatch(Decrement())
        Swal.fire({
          title: "Deleted!",
          text: "Product has been deleted.",
          icon: "success"
        });
      }
    });
    
  }
  catch(error){
    console.log(error)
  }
 }
 
 useEffect(()=>{
  fetchCart();
 },[])
 if(loading){
  return (
    <div className="loading-container">  
    <div className="spinner-border text-secondary loading" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
  )
 }
 else if(total ===0 ){
  return(
    <div className='container vide'>
      <h1 >Your Cart is empty </h1>
      <img src={emptyCart} alt="" />
    </div>
   )}
  return (
    <div className='container '>
      <div className="container-cart">

      
    <div className=' table table-sm table-responsive container-table'>
     <table className='border-collapse border border-slate-400' >
      <thead>
      <th>Product</th>
      <th>Price </th>
      <th>Quantity</th>
       <th>Total Price</th>
      </thead>
      <tbody className='table-group-divider'>
  {cart.map((c) => {
    const update =async (id,qty) =>{
      try {
        await axiosClient.post('/api/updateQty', { id, product_qty: qty });
        fetchCart();
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    
    };
    const handleIncrease = () => {
      dispatch(Increment())
      setCart(prevCart => prevCart.map(item => {
        if (item.id === c.id) {
          update(item.id, item.product_qty + 1);
          return { ...item, product_qty: item.product_qty + 1 };
        }
        return item;
      }));
    };

    const handleDecrease = () => {
      dispatch(Decrement())

      setCart(prevCart => prevCart.map(item => {
        if (item.id === c.id && item.product_qty > 1) {
          update(item.id, item.product_qty - 1);
          return { ...item, product_qty: item.product_qty - 1 };
          
        }
        return item;
      }));
    };
    
    return (
      <tr key={c.id}>
        <td className=' product-info'>
         <Link to={`/displayproduct/${c.product.id}`}>
         <img className='image-product' src={`http://localhost:8000/storage/product/image/${c.product.image_pr}`} alt="" />
          {c.product.nom_pr}
         </Link> 
        </td>
        <td>{c.product.prix_pr} Dhs</td>
        <td>
          <button onClick={handleDecrease} className='qty-btn'>-</button>
          {c.product_qty}
          <button onClick={handleIncrease} className='qty-btn'>+</button>
        </td>
        <td>{c.product_qty * c.product.prix_pr} Dhs </td>
        <td  onClick={()=>{handleRemove(c.product_id)}}> <CloseIcon className='trash' color='red'/> </td>
      </tr> 
    );
  })}
</tbody>


      
     </table>
     
    </div>
    <div className='checkout'>
      <div className="total">
      <h3 >TOTAL :</h3> 
      <h3>{total}Dhs</h3>
      </div>
        <button type='button' className='btn btn-primary '> <Link to='/checkout'>Chekout</Link></button>
      </div>
      </div>
    </div>
  )
}

export default Cart