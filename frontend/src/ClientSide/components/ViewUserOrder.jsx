import React, { useEffect, useState } from 'react'
import { useParams , useNavigate, Link} from 'react-router-dom'
import { axiosClient } from '../../../axios'

import './ViewUserOrder.css'
import { FcHeadset } from 'react-icons/fc'
import { FaPrint } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { BsPrinter } from 'react-icons/bs'
const ViewUserOrder = () => {
 const {ID} = useParams()
 const [order,setOrder] = useState([]) 
 const [orderItems,setOrderItems] = useState([]) 
 const [total,setTotal] = useState() 
 const [DateOrder,setDateOrder] = useState() 
 const [newstatus,setNewStatus] = useState(0);
 const [currentStatus,setCurrentStatus] = useState(1);
 const navigate = useNavigate()
 const fetchOrder = async()=>{
  try{
  const response = await axiosClient.post('api/order',{id:ID}) 
  setOrder(response.data.order)
  setOrderItems(response.data.order.order_items)
  setTotal(response.data.order.order_items.reduce((t,o)=>t + o.price * o.qty,0))
  const date = new Date ( response.data.order.created_at );
  setDateOrder(date.toLocaleDateString())
  setCurrentStatus(response.data.order.status)
  setNewStatus(response.data.order.status)
  console.log(newstatus)
  console.log(response)
 }
  catch(error){
   console.log(error)
  }
 }
 useEffect(()=>{
  fetchOrder();
 },[])
 
 const handleStatusChange = (e) => {
  setNewStatus(e.target.value)
 }
 const handleCheckCancel = (e) => {
  if(e.target.checked){
   setNewStatus(-1)
  }
  else{
  setNewStatus(0)

  }
  console.log(newstatus)
  console.log(e.target.checked)
 }
 const saveChanges= async() =>{
  try{
    if(newstatus===-1){
      try{
        Swal.fire({
          title: "Are you sure?",
          text: "Do you want to cancel your order?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText:"No",
          confirmButtonText: "Yes, cancel it!"
        }).then(async(result) => {
          if (result.isConfirmed) {
            const response = await axiosClient.post('/api/updateStatus',{id:ID,newstatus:newstatus})
            fetchOrder();
            console.log('canceled ')
            Swal.fire({
              title: "Canceled!",
              text: "Your order has been canceled.",
              icon: "success"
            });
          }
        });
        if(response.data.status ===200 ){
  
          navigate('/orders')}
      }
      catch(error){
        console.log(error)
      }
      
    }
 
  else {
      const response = await axiosClient.post('/api/updateStatus',{id:ID,newstatus:newstatus})
      fetchOrder(); 
      if(response.data.status ===200 ){
  
        navigate('/orders')}
  }
 
  }
  catch(error){
    alert(error)
  }
 }

 const handleOptions = (value) => {
   return  value === newstatus ? 'selected' : ''
 }
 const getStatusText = status => {
  if( status === 0 ) return 'En Traitement';
  if ( status === -1) return 'Canceled';
  if(status === 1 )return 'Success';
}
const getStatusColor = status => {
  if( status === 0 ) return 'rgb(255, 251, 126)';
  if ( status === -1) return 'rgb(193, 193, 193)';
  if(status === 1 )return 'rgb(46, 255, 126)';
}
  const downloadOrderReport = async()=>{
    try{
      const response = await axiosClient.get(`/api/generateOrderPDF/${order.id}`,{
        responseType:'blob'
      });

      const blob = new Blob([response.data],{type: 'application/pdf'})

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download',`rapport_commande_de_${order.firstname}_${order.lastname}.pdf`)
      document.body.appendChild(link);
      link.click()

      document.body.removeChild(link);  
      window.URL.revokeObjectURL(url);

    }
    catch(error){
      console.log('Error downloading pdf',error)
    }
  }
  return (
    <div className='commande-container main-container'>
      <div> <button className='btn btn-success mr-6 mt-7 flex float-end print-btn' onClick={downloadOrderReport}><BsPrinter/></button> </div>

    <div  className='border rounded mt-6 mb-5 '>  
      
     
      <div className="cards">
      <div className="card-info card ">
       <h4 className='card-header h4'>Your Informations  </h4>
       <div className="p-4 info-data">
       <p className='felx justify-between'> <strong className='pr-7'>First Name: </strong> {order.lastname}</p>
        <p className='felx justify-between'> <strong className='pr-7'>Last Name: </strong> {order.firstname}</p>
       <p> <strong className='pr-7'> Email: </strong>{order.email} </p>
       <p><strong className='pr-9'>Phone:     </strong> {order.phone} </p>
       <p>  <strong className='pr-7'> City : </strong>{order.city} </p>
       <p> <strong className='pr-7'> ZIP Code :  </strong>  {order.zipcode}</p> 
       <p> <strong className='pr-7'>  Adresse: </strong>{order.fulladdress}  </p> 
       
       </div>
       
      </div>
      <div className="card card-info">
      <h4 className=" card-header h4"> Order Informations  </h4>
      <div className="info-data p-4">
      <p><strong> Amount of products:</strong> {orderItems.length}</p>
      <p><strong>Total:</strong> {total} Dhs</p>
      <p><strong>Date  :</strong> {DateOrder} </p>
      </div>
      </div>
    </div>
      <div className="products-order card mt-6 m-3">
         <h3 className='card-header h4 mb-6  '>Order Elements:</h3>
           <div className="table-responsive"> 
               <table className="list-table table table-hover  table-bordered products-order-table">
                 <thead className='fixed-head'>
                   <tr>
                     <th>Name</th>
                     <th>Image</th>
                     <th>Quantity</th>
                     <th>Price</th>
                     <th>Brand</th>
                     <th>Categorie</th>
                   </tr>
                 </thead>
                 <tbody>
                   {orderItems.map((o) => (
                     <tr key={o.product.id}>
                       <td>{o.product.nom_pr}</td>
                       <td> <img src={`http://127.0.0.1:8000/storage/product/image/${o.product.image_pr}`} style={{width:'50px', height:'50px'}} alt="" /></td>
                       <td>{o.qty}</td>
                       <td>{o.product.prix_pr}</td>
                       <td>{o.product.marque_pr}</td>
                       <td>{o.product.category_pr}</td> 
                     </tr>
                   ))}
                 </tbody>
               </table>
               </div>
          
      </div>
      {
        currentStatus===0 &&
      <h4> Cancel your order : <input type="checkbox" name="status"  onChange={handleCheckCancel}/></h4>

      }

    <Link to={"/orders"}> <button className='btn btn-danger   m-6'>Back</button></Link>
    
    <button className='btn btn-success m-6'onClick={saveChanges}>Save</button>
    </div>
    </div>
  )

}

export default ViewUserOrder