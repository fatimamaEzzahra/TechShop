import React, { useEffect, useState ,useRef} from 'react'
import { useParams , useNavigate, Link} from 'react-router-dom'
import { axiosClient } from '../../../axios'
import './ViewOrder.css'

import { BsPrinter } from 'react-icons/bs'
const ViewOrder = () => {
  const factureRef = useRef()
 const {ID} = useParams()
 const [order,setOrder] = useState([]) 
 const [orderItems,setOrderItems] = useState([]) 
 const [total,setTotal] = useState() 
 const [DateOrder,setDateOrder] = useState() 

 const navigate = useNavigate()
 const fetchOrder = async()=>{
  try{
  const response = await axiosClient.post('api/order',{id:ID}) 
  setOrder(response.data.order)
  setOrderItems(response.data.order.order_items)
  setTotal(response.data.order.order_items.reduce((t,o)=>t + o.price * o.qty,0))
  const date = new Date ( response.data.order.created_at );
  setDateOrder(date.toLocaleDateString())
  setNewStatus(response.data.order.status)
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
 const saveChanges= async() =>{
  try{
  const response = await axiosClient.post('/api/updateStatus',{id:ID,newstatus:newstatus})
  fetchOrder();
  alert(response.data.message)
  // sweetAlert('the order was updated successfully ')
  if(response.data.status ===200 ){
   navigate('/admin/orders')}
  }
  catch(error){
    alert(error)
  }
 }
 const [newstatus,setNewStatus] = useState(order.status);
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

    <div  className='border rounded mt-6 mb-5 ' ref={factureRef}>  
      <h3 className="h3 card-header commande-header mt-3">Commande de {order.firstname} </h3>
      
      {/* <span style={{background:getStatusColor(order.status)}} className='rounded p-2'> {getStatusText(order.status)} </span>
       */}
      <div className="cards" >
      <div className="card-info card ">
       <h4 className='card-header h4'>Informations sur le client </h4>
       <div className="p-4 info-data">
       <p className='felx justify-between'> <strong className='pr-7'>Nom: </strong> {order.lastname}</p>
        <p className='felx justify-between'> <strong className='pr-7'>Prénom: </strong> {order.firstname}</p>
       <p> <strong className='pr-7'> Email: </strong>{order.email} </p>
       <p><strong className='pr-9'>Tel:     </strong> {order.phone} </p>
       <p>  <strong className='pr-7'> Ville : </strong>{order.city} </p>
       <p> <strong className='pr-7'> Code Postal:  </strong>  {order.zipcode}</p> 
       <p> <strong className='pr-7'>  Adresse: </strong>{order.fulladdress}  </p> 
       
       </div>
       
      </div>
      <div className="card card-info">
      <h4 className=" card-header h4"> Informations sur la acommande </h4>
      <div className="info-data p-4">
      <p><strong> Nombre de produits:</strong> {orderItems.length}</p>
      <p><strong>Total:</strong> {total} Dhs</p>
      <p><strong>Date de la commande :</strong> {DateOrder} </p>
      </div>
      </div>
    </div>
      <div className="products-order card mt-6 m-3">
         <h3 className='card-header h4 mb-6  '>Elements de la commande:</h3>
           <div className="table-responsive"> 
               <table className="list-table table table-hover  table-bordered products-order-table">
                 <thead className='fixed-head'>
                   <tr>
                     <th>Nom</th>
                     <th>Image</th>
                     <th>Quantité</th>
                     <th>Prix</th>
                     <th>Marque</th>
                     <th>Catégorie</th>
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
      <h4 className='mt-8 ml-8 status'>Modifier le status de la commande :
      <select name="" id="" className='form-select  mb-3 select-status' onChange={handleStatusChange} >
      <option value={0} className='rounded p-2 m-5'  selected ={handleOptions(0)}>En Traitement</option>
      <option value={1} className='rounded p-2 m-5' selected ={handleOptions(1)}>Traitée</option>
      <option value={-1} className='rounded p-2 m-5' selected ={handleOptions(-1)}>Annulée</option>
      </select>
      </h4>
    <Link to={"/admin/orders"}> <button className='btn btn-danger   m-6'>Back</button></Link>
    
    <button className='btn btn-success m-6'onClick={saveChanges}>Save</button>
    </div>


    </div>
  )

}

export default ViewOrder