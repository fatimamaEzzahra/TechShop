import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../../axios'
import MaterialTable from 'material-table'
import DataTable from 'react-data-table-component'
import { FaAccessibleIcon, FaAcquisitionsIncorporated, FaDeaf, FaOptinMonster } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Customers = () => {

  const [customers,setCustomers]=useState([])
  const [loading,setLoading]=useState(true)
  const [records,setRecords]=useState([])
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const fetchOrders = async()=>{
    const response = await axiosClient.get('api/customers-data');
    if (response.data.status === 200){
    setCustomers(response.data.customersData)
    setRecords(response.data.customersData.slice(0,itemsPerPage))
    setLoading(false)
     console.log('costumers',response.data.customersData)
  }
    else {
     console.log(response)
    }
   }
   useEffect(()=>{
    fetchOrders();
   },[])
   const updateRecords = (page , perPage) => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage ;
    setRecords(customers.slice(startIndex , endIndex));
   }
   const handlePageChange = page => {
      setCurrentPage(page);
      const startIndex = (page - 1) *itemsPerPage ;
      const endIndex = startIndex + itemsPerPage ;
      setRecords(customers.slice(startIndex, endIndex));
   }
   const handleItemsPerPageChange = newPerPage =>{
    setItemsPerPage(newPerPage);
    updateRecords(currentPage , newPerPage);
   }
  const columns = [
    {
      name: '#',
      selector : row => row.customer.id,
      sortable:true
    },
    {
    name: 'Nom complet',
    selector : row => row.customer.name,
    
    sortable:true
    },
    {
      name:'Client depuis',
      selector : row => {
        const date = new Date ( row.customer.created_at );
        return date.toLocaleDateString();
      },
      sortable:true
    },
    {
      name:'Email',
      selector : row => row.customer.email ,
    },{
      name:"Nombre d'achats",
      selector : row => row.ordersAmount ,
      sortable:true
      
    }
  ];
  
  const data = customers;
  function handleFilter (e){
    const newData = customers.filter(row => {
      const date = new Date ( row.customer.created_at );
      return (
        row.customer.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.customer.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.customer.id.toString().includes(e.target.value.toString()) ||
        date.toLocaleDateString().includes(e.target.value.toString())
        
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
    <div style={{width:'100%'}}>
     
     <div
     className='container '
     style={{width:'100%',marginLeft:'10px',marginTop:'60px'}}
     >
     <div className='text-start'>
        <input type='text' placeholder='filter here...' className='  border border-black p-1 rounded mb-6' onChange={handleFilter} />
      </div>
     <DataTable
     columns={columns}
     data={records}
     fixedHeader
     className='table-orders'
     pagination
    paginationServer
    paginationTotalRows={customers.length}
    onChangePage={handlePageChange}
    paginationPerPage={itemsPerPage}
    paginationRowsPerPageOptions={[5, 10, 20, 40]}
    onChangeRowsPerPage={handleItemsPerPageChange}
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

export default Customers