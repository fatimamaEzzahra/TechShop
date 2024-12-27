import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../../axios'
import MaterialTable from 'material-table'
import DataTable from 'react-data-table-component'
import { FaAccessibleIcon, FaAcquisitionsIncorporated, FaDeaf, FaOptinMonster } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Orders = () => {

  const [orders,setOrders]=useState([])
  const [loading,setLoading]=useState(true)
  const fetchOrders = async()=>{
    const response = await axiosClient.get('api/orders');
    if (response.data.status === 200){
    setOrders(response.data.orders)
    setRecords(response.data.orders)
    setLoading(false)
     console.log('orderitems',orders)
  }
    else {
     console.log(response)
    }
   }
   useEffect(()=>{
    fetchOrders();
   },[])
  const columns = [
    {
      name: '#',
      selector : row => row.id,
      sortable:true
    },
    {
    name: 'Nom complet',
    selector : row => row.firstname + ' ' + row.lastname,
    cell: row => (
      <div style={{width:'200px'}}>
        {row.firstname} {row.lastname}
      </div>
    ),
    sortable:true
    },
    {
      name:'Date',
      selector : row => {
        const date = new Date ( row.created_at );
        return date.toLocaleDateString();
      },
      sortable:true
    },
    {
      name:'Ville',
      selector : row => row.city ,
    },{
      name:'Mode payment',
      selector : row => row.payment_mode ,
      
    },{
      name:'Status',
      selector : row => row.status ,
      cell : row => (
        <div style={{backgroundColor : getStatusColor(row.status) ,padding: '4px', borderRadius: '4px', color:getStatusFontColor(row.status)}}>
          {getStatusText(row.status)}
        </div>
      ),
      sortable:true
    },
    {
      name:'',
      cell : row => (
        <div>
          <button className='btn  h-5 flex items-center ' style={{fontSize:'13px', height:'30px',backgroundColor:'#72beed',color:'white'}}> <Link to={`vieworder/${row.id}`}> Voir </Link> </button>
        </div>
      )
    }
  ];
  const getStatusText = status => {
    if( status === 0 ) return 'En traitement';
    if ( status === -1) return 'Annulée';
    if(status === 1 )return 'Succée';
  }
  const getStatusColor = status => {
    if( status === 0 ) return 'rgb(255, 252, 158)';
    if ( status === -1) return 'rgb(193, 193, 193)';
    if(status === 1 )return '#71ffbd';
  }
  const getStatusFontColor = status => {
    if( status === 0 ) return 'rgb(255, 162, 0)';
    if ( status === -1) return 'rgb(59, 59, 59))';
    if(status === 1 )return '#418a61';
  }
  const data = orders
  const [records,setRecords]=useState(data)
  function handleFilter (e){
    const newData = orders.filter(row => {
      const date = new Date ( row.created_at );
      return (
        row.firstname.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.lastname.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.id.toString().includes(e.target.value.toString()) ||
        row.payment_mode.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.city.toLowerCase().includes(e.target.value.toLowerCase()) ||
        date.toLocaleDateString().includes(e.target.value.toString())||
        getStatusText(row.status).toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setRecords(newData);
  }
  if(loading){
    return <div className="loading-container" style={{width:'100%',gridArea:'main'}}>
    <div className="spinner-border text-secondary loading " role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  
  </div>
  }
  return (
    <div className='  ' style={{marginTop:'50px'}} >
     {/* <h1 className='h1 m-6 flex items-center justify-center ' >Toutes les commandes</h1>  */}
     
     <div
     className='container order-container'
     style={{width:'100%',marginLeft:'10px'}}
     >
     <div className='text-start'>
        <input type='text' placeholder='chercher ici...' style={{color:'black'}} className='   border border-black p-1 rounded mb-6' onChange={handleFilter} />
      </div>
     <DataTable
     columns={columns}
     data={records}
    className='table-orders'
     fixedHeader
     fixedFooter
     pagination
      scroll
     customStyles={{
      headRow: {
        style: {
          fontSize: '16px', 
          fontWeight: 'bold',
          width:'900px',
        }
      },

    }}
    
     >

     </DataTable>

     </div>
    </div>
  )
}

export default Orders