import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../../axios'
import './UserOrders.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

const UserOrders = () => {
 const [CanceledOrders,setCanceledOrders] = useState([]) 
 const [OldOrders,setOldOrders] = useState([]) 
 const [AllOrders,setAllOrders] = useState([]) 
 const [ProcessingOrders,setProcessingOrders] = useState([]) 
 const [Unothenticated,setUnothenticated] = useState(false) 
 const [loading,setLoading]=useState(true)
 
 const fetchOrders = async()=> {
  try{
  const response = await axiosClient.get(`/api/show-user-orders`);  
  setLoading(false)
  setAllOrders(response.data.orders)
  setCanceledOrders(response.data.orders.filter((o)=>{return o.status === -1 }))
  setProcessingOrders(response.data.orders.filter((o)=>{return o.status === 0 }))
  setOldOrders(response.data.orders.filter((o)=>{return o.status === 1 }))
  console.log(response)
  
}
  catch(error){
   console.log(error)
   if(error.response.data.message === 'Unauthenticated.' ){
    setUnothenticated(true)
 setLoading(false)

  }
  }
 }
 useEffect(()=>{
  fetchOrders();
 },[])
 if(Unothenticated){
  return (
    <div>
     Page Not found 
    </div>
  )
 }
 if(loading){
  return (
    <div className="loading-container">
    <div className="spinner-border text-secondary loading" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>)
 }
 if(AllOrders.length ===0){
  return(
    <div className='container flex items-center justify-center ' style={{height:'400px'}}>
      <h1 className='h1 text-center flex items-center justify-center'> You have no orders yet</h1>
    </div>
  )
 }
  return (
    <div className='user-orders-container container m-6 bordered' >
    <h1 className=' flex items-center justify-center mt-6 mb-6 orders-title'>Your Orders</h1> 
    <div className=''>
    <Tabs
      defaultActiveKey="last orders"
      id="uncontrolled-tab-example"
      className="mb-3"
      fill
    >
      {
         ProcessingOrders.length >0 &&
      <Tab eventKey="last orders" title=" Orders in Process"  >
        
      <div className='orders-list container scrollable-tab' >
      <Table    hover size="sm">
      <thead>
        <tr>
          <th>Order Date </th>
          <th>Products</th>
          <th>Total</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
         { 
    ProcessingOrders.map((o)=>{
      const date = new Date(o.created_at.replace('T',' '))
     let total = 0
     return (
      <tr key={o.id} className='order-tr ' >
      <td >  {date.toLocaleDateString()} </td>
      <td >
        <div className='ordered-products ' >

        {o.order_items.map((item)=>{
          
         total = total + item.price * item.qty
        return(
          <div key={item.id}   >
            <Link to={`/displayproduct/${item.product.id}`}>
          <img src={`http://localhost:8000/storage/product/image/${item.product.image_pr}`} alt=""  className='product-order-image'/>
              <p  > {item.product.nom_pr}  ( {item.qty} ) </p >
          </Link>
          </div>
        )
      })}
      
        </div>
      
      </td>
      <td>{total} Dhs</td>
      <td><button className='btn  h-5 flex items-center ' style={{fontSize:'13px', height:'30px',backgroundColor:'#72beed',color:'white'}}> <Link to={`view-user-order/${o.id}`}>View</Link></button></td>
      </tr>
     )
    }) 
   }
      </tbody>
    </Table>
   </div>
      
      </Tab>
      }
      {
      OldOrders.length >0 && 
      <Tab eventKey="previous orders" title="Delivered Orders" >
                <div className='orders-list container scrollable-tab'>

     <Table   hover size="sm"  className='orders-table' >
      <thead>
        <tr>
          <th>Order Date </th>
          <th>Products</th>
          <th>Total</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
         { 
    OldOrders.map((o)=>{
      const date = new Date(o.created_at.replace('T',' '))
     let total = 0
     return (
      <tr key={o.id} className='order-tr ' >
      <td >  {date.toLocaleDateString()} </td>
      <td >
        <div className='ordered-products ' >

        {o.order_items.map((item)=>{
          
         total = total + item.price * item.qty
        return(
          <div key={item.id}   >
            <Link to={`/displayproduct/${item.product.id}`}>
           <img src={`http://localhost:8000/storage/product/image/${item.product.image_pr}`} alt=""  className='product-order-image'/>  
            <p> {item.product.nom_pr}  ( {item.qty} ) </p>
            </Link>
          </div>
        )
      })}
      
        </div>
      
      </td>
      <td>{total} Dhs</td>
      <td><button className='btn  h-5 flex items-center ' style={{fontSize:'13px', height:'30px',backgroundColor:'#72beed',color:'white'}}> <Link to={`view-user-order/${o.id}`}>View</Link></button></td>
      </tr>
     )
    })
   }
      </tbody>

    </Table>
    </div>
      </Tab>
      }
      {
       CanceledOrders.length >0 && 
        <Tab eventKey="all orders" title="Canceled Orders" >
        <div className='orders-list container scrollable-tab'>
    <Table   hover className='orders-table'>
      <thead>
        <tr>
          <th>Order Date </th>
          <th>Products</th>
          <th>Total</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
      {
    CanceledOrders.map((o)=>{
      const date = new Date(o.created_at.replace('T',' '))
      let total = 0
      return (
      <tr key={o.id} className='order-tr ' >
      <td >  {date.toLocaleDateString()} </td>
      <td >
        <div className='ordered-products ' >

        {o.order_items.map((item)=>{
          
          total = total + item.price * item.qty
        return(
          <div key={item.id}   >
            <Link to={`/displayproduct/${item.product.id}`}>
              
          <img src={`http://localhost:8000/storage/product/image/${item.product.image_pr}`} alt=""  className='product-order-image'/> 
            <p> {item.product.nom_pr}  ( {item.qty} ) </p>
            </Link>
          </div>
        )
      })}
      
        </div>
      
      </td>
      <td>{total} Dhs</td>
      <td><button className='btn  h-5 flex items-center ' style={{fontSize:'13px', height:'30px',backgroundColor:'#72beed',color:'white'}}> <Link to={`view-user-order/${o.id}`}>View</Link></button></td>
      </tr>
      )
    })
    }
      </tbody>
    </Table>


    </div>
      </Tab>
      }
      
    </Tabs>
   
    </div>
    
   
    </div>
  )
}

export default UserOrders