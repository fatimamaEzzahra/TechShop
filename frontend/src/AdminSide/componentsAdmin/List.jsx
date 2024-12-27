import React, { useState,useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'

import DataTable from 'react-data-table-component';
import './List.css'
import {  BsPencilSquare, BsTrash } from 'react-icons/bs';
const List = () => {
 const [products, setProducts] = useState([]);
 const [filtredProducts,setFiltredProducts]=useState(products)
 const [loading,setLoading]= useState(true)
  const navigate=useNavigate()
 const { id } = useParams();

 useEffect(() => {
   fetchProduct();
 }, []);

 const fetchProduct = async () => {
   try {
     const response = await axios.get(`http://127.0.0.1:8000/api/produits`);
     setProducts(response.data);
     setFiltredProducts(response.data)
     setLoading(false)
     navigate('/admin/products')

   } catch (error) {
     console.error('Error fetching products:', error);
   }
 };

 const deleteProduct = async (id) => {
   try {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this product from your shop?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(`http://127.0.0.1:8000/api/produits/${id}`);
      navigate('/admin/products')
      fetchProduct();
        Swal.fire({
          title: "Deleted!",
          text: "The product has been deleted.",
          icon: "success"
        });
      }
    });
   } catch (error) {
     console.error('Error deleting product:', error);
   }
 };
 const filter = (e) => {
  const newProducts = filtredProducts.filter ( p =>{
    return (
      p.nom_pr.toLowerCase().includes( e.target.value.toLowerCase())||
      p.description_pr.toLowerCase().includes(e.target.value.toLowerCase())||
      p.id.toString().includes(e.target.value.toString())||
      p.prix_pr.toString().includes(e.target.value)||
      p.stock_pr.toString().includes(e.target.value)||
      p.marque_pr.toLowerCase().includes(e.target.value.toLowerCase())||
      p.category_pr.toLowerCase().includes(e.target.value.toLowerCase())
    )
  }
  )
  setProducts(newProducts)
 }


 const columns = [
  {
    name: '#',
    selector : row => row.id,
    cell:row=>(
      <div className='id-cell'>
      <p>{row.id}</p>
      </div>
    ),
    sortable:true
  },
  {
    name: 'Nom ',
    selector : row => row.nom_pr,
    sortable:true
  },
  {
  name: 'Description',
  selector : row => row.description_pr,
  cell: row => (
    <textarea value={row.description_pr} style={{height:'100px',width:'700px'}} columns={10}/>
  ),
  sortable:true
  },
  {
    name:' Image',
    selector : row => row.image_pr,
    cell : row => (
      <img src={`http://127.0.0.1:8000/storage/product/image/${row.image_pr}`} style={{width:'50px', height:'50px'}}/>
    )
    
  },
  {
    name:' Prix',
    selector : row => row.prix_pr
  },
  {
    name:' Marque',
    selector : row => row.marque_pr
  },
  {
    name:'Catégorie',
    selector : row => row.category_pr
  },
  {
    name:' Stock',
    selector : row => row.stock_pr
  },
  {
    name:"",
    cell: row => (
      <div className='flex gap-7 ' >
        <button className='flex '><Link  className=' mr-2' to={`/admin/Edit/${row.id}`}> <BsPencilSquare style={{color:'green',fontSize:'20px'}}/> </Link></button>
        <button className="flex" onClick={() => deleteProduct(row.id)}><BsTrash style={{color:'red',fontSize:'20px'}}/></button>
                       
      </div>
    )
  }
];

const data = products
if(loading){
  return <div className="loading-container" style={{width:'100%',gridArea:'main'}}>
  <div className="spinner-border text-secondary loading " role="status">
    <span className="visually-hidden">Loading...</span>
  </div>

</div>
}
 return (
     <div className="container list-container">
       <div className="row list-row">
         <div className="col-14">
          {/* <h1 className='h1 m-6 flex items-center justify-center' >Touts Les Produits</h1> */}
            {/* <DataTable
            columns={columns}
            data={data}
            fixedHeader
            pagination
            
            customStyles={{
              headRow: {
                style: {
                  fontSize:'15px',
                  fontWeight:'bold',
                  
                }
              },
              headCells:{
                style:{
                  textOverflow:'ellipsis',
                  
                },
                rows:{
                  style:{
                      width:'100px',
                    fontSize:'20px',
                    
                  }
                },
                
            }
              
              
              
            }}
            >

            </DataTable> */}
           <div >
            <div className="flex items-between heading " >
            <input type="text" placeholder='chercher ici...' className='border p-1 rounded' onChange={filter}/>
             <h1 style={{height:'60px'}}><Link className='btn btn-primary  mt-2 float-end ' to={`/admin/Create`}>Ajouter </Link>
           </h1>
           </div>
             {products.length === 0 ? (
               <p>Aucun produit trouvé</p>
             ) : (
              <div className="table-responsive"> 
               <table className="list-table table table-hover  scrollable table-bordered products-table">
                 <thead className='fixed-head'>
                   <tr>
                     <th>#</th>
                     <th>Nom</th>
                     <th>Description</th>
                     <th>Image</th>
                     <th>Prix</th>
                     <th>Marque</th>
                     <th>Catégorie</th>
                     <th>Stock</th>
                     <th colspan="2" >Opértaions</th>
                   </tr>
                 </thead>
                 <tbody>
                   {products.map((p) => (
                     <tr key={p.id}>
                       <td >{p.id}</td>
                       <td>{p.nom_pr}</td>
                       <td > <textarea name="" id="" cols="30" rows="5" disabled value={p.description_pr}>{p.description_pr}</textarea></td>
                       <td> <img src={`http://127.0.0.1:8000/storage/product/image/${p.image_pr}`} style={{width:'50px', height:'50px'}} alt="" /></td>
                       <td>{p.prix_pr}</td>
                       <td>{p.marque_pr}</td>
                       <td>{p.category_pr}</td> 
                       <td>{p.stock_pr}</td>
                       <td className='flex' style={{gap:'7px'}}>
                         <button className='flex '><Link  className=' mr-2' to={`/admin/Edit/${p.id}`}> <BsPencilSquare style={{color:' rgb(0, 119, 255)',fontSize:'20px'}}/> </Link></button>
                         <button className="flex"><BsTrash style={{color:'red',fontSize:'20px'}}  onClick={() => deleteProduct(p.id)}/></button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
               </div>
             )}
           </div>
         </div>
       </div>
     </div>
 );
};

export default List;
