import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate,useParams, Link } from 'react-router-dom'
import './Edit.css'
import { axiosClient } from '../../../axios';
import { BsArrowReturnLeft } from 'react-icons/bs';


const Edit = () => {
  const {id}=useParams();
 const navigate= useNavigate();
 const [nom_pr,setNom_pr]=useState('')
 const [marque_pr,setMarque_pr]=useState('')
 const [category_pr,setCategory_pr]=useState('')
 const [image_pr,setImage_pr]=useState(null)
 const [image2,setImage2]=useState(null)
 const [image3,setImage3]=useState(null)
 const [image4,setImage4]=useState(null)
 const [image5,setImage5]=useState(null)
 const [description_pr,setDescription_pr]=useState('')
 const [stock_pr,setStock_pr]=useState('')
 const [bestSeller,setBestSeller]=useState()
 const [prix_pr,setPrix_pr]=useState('')
 

 useEffect(()=>{
  fetchProduct();
 },[])

 const fetchProduct=async()=>{
  await axiosClient.get(`http://127.0.0.1:8000/api/produits/${id}`).
   then(({data})=>{
   const {nom_pr,marque_pr,description_pr,category_pr,prix_pr,stock_pr,bestSeller} = data.produit
   setNom_pr(nom_pr)
   setDescription_pr(description_pr)
   setCategory_pr(category_pr)
   setPrix_pr(prix_pr)
   setMarque_pr(marque_pr)   
   setStock_pr(stock_pr)
   setBestSeller(bestSeller)
  console.log(data.produit)
  }).catch(({response:{data}})=>{
   if(data.status ==442){
    console.log(data.message)
   }
  })
 }

 const changeHandlerIm1 = (e)=>{
  setImage_pr(e.target.files[0])
 }
 const changeHandlerIm2 = (e)=>{
  setImage2(e.target.files[0])
 }
 const changeHandlerIm3 = (e)=>{
  setImage3(e.target.files[0])
 }
 const changeHandlerIm4 = (e)=>{
  setImage4(e.target.files[0])
 }
 const changeHandlerIm5 = (e)=>{
  setImage5(e.target.files[0])
 }
 const updateProduct = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('_method', 'PATCH');
  formData.append('nom_pr', nom_pr);
  formData.append('marque_pr', marque_pr);
  formData.append('category_pr', category_pr);
  formData.append('description_pr', description_pr);
  formData.append('stock_pr', stock_pr);
  formData.append('bestSeller', bestSeller);
  formData.append('prix_pr', prix_pr);

  if (image_pr !== null) {
    formData.append('image_pr', image_pr);
  }
  if (image2 !== null) {
    formData.append('image2', image2); // Change here
  }
  if (image3 !== null) {
    formData.append('image3', image3); // Change here
  }
  if (image4 !== null) {
    formData.append('image4', image4); // Change here
  }
  if (image5 !== null) {
    formData.append('image5', image5); // Change here
  }

  await axiosClient.post('http://127.0.0.1:8000/api/produits/' + id, formData)
    .then(({ data }) => {
      alert(data.message)
      navigate('/admin/products')
    }).catch(({ response }) => {
      if (response.status == 442) {
        console.log(response.data.errors)
      } else {
        console.log(response.data.message)
      }
    })
}

  return (
    <div className='container' >
<div className="row  justify-content-center" >
   <div className="col-7 col-sm-8 col-md-8">
    <div className="card">
      
    <Link to={"/admin/products"}><button className='  back-btn' > <span>Retour</span>  <BsArrowReturnLeft/> </button></Link>
      <h2 style={{display:'flex',justifyContent:'center' , alignItems:'center'}} className='h3'>Modifier votre produit</h2>
     <div className="card-body">
      <hr />
      <div className="form-wrapper mt-6">
       <form onSubmit={updateProduct}>
       <div class="mb-3 ">
           <label  class="form-label">Nom du produit</label>
           <input type="text" class="form-control " placeholder="Produit" defaultValue={nom_pr} onChange={(e)=>{setNom_pr(e.target.value)}}/>
           <div class="valid-feedback">
               Looks good!
           </div>
         </div>
         <div class="mb-3">
           <label  class="form-label">Prix</label>
           <input type="number" class="form-control" placeholder="Prix" value={prix_pr} onChange={(e)=>{setPrix_pr(e.target.value)}}/>
         </div>
         <div class="mb-3">
          <label class="form-label">Catégorie</label>
         <select class="form-select" aria-label="Default select example" value={category_pr} onChange={(e)=>{setCategory_pr(e.target.value)}}>
            <option selected value='telephone'>Téléphone Portable</option>
            <option value="pc">PC Portable</option>
            <option value="ordinateur">Ordinateur bureau</option>
            <option value="tablette">Tablette</option>
            <option value="ecouteurs">Ecouteurs</option>
            <option value="smartwatch">Smartwatch</option>
          </select>
         </div>
         <div class="mb-3">
          <label class="form-label">Marque</label>
         <select class="form-select" aria-label="Default select example" value={marque_pr} onChange={(e)=>{setMarque_pr(e.target.value)}}>
          
            <option  value='samsung'>SAMSUNG</option>
            <option value="apple">APPLE</option>
            <option value="huawei">HUAWEI</option>
            <option value="lenovo">LENOVO</option>
            <option value="hp">HP</option>
            <option value="dell">DELL</option>
            <option value="oppo">OPPO</option>
            <option value="acer">ACER</option>
          </select>
         </div>
         <div class="mb-3">
           <label  class="form-label">Description</label>
           <textarea class="form-control"  rows="4" defaultValue={description_pr} onChange={(e)=>{setDescription_pr(e.target.value)}}></textarea>
         </div>
         <h3 class="mb-3 mt-7" style={{display:'flex',justifyContent:'center'}}>Ajouter des Photos démonstratives</h3>
         <div class="mb-3">
           <input class="form-control" type="file" id="formFile" accept='image/*' onChange={(e)=>{changeHandlerIm1(e)}}/>
         </div>
         <div class="mb-3">
           <input class="form-control" type="file" id="formFile" accept='image/*' onChange={(e)=>{changeHandlerIm2(e)}} />
         </div>
         <div class="mb-3">
           <input class="form-control" type="file" id="formFile" accept='image/*' onChange={(e)=>{changeHandlerIm3(e)}}/>
         </div>
         <div class="mb-3">
           <input class="form-control" type="file" id="formFile" accept='image/*' onChange={(e)=>{changeHandlerIm4(e)}}/>
         </div>
         <div class="mb-3">
           <input class="form-control" type="file" id="formFile" accept='image/*' onChange={(e)=>{changeHandlerIm5(e)}}/>
         </div>
         <div class="mb-3">
           <label  class="form-label">Stock</label>
           <input type="number" class="form-control" placeholder="Stock" value={stock_pr} onChange={(e)=>{setStock_pr(e.target.value)}}/>
         </div>
         <div class="mb-3">
           <label  class="form-label">Afficher Parmi les meilleurs produits</label>
           <input type="checkbox"  checked={bestSeller ==='true' ? true : false} onChange={(e)=>setBestSeller(e.target.checked)}/>
         </div>
         <div class="col-12">
            <button class="btn btn-primary" type="submit">Modifier</button>
          </div>
       </form>
      </div>
     </div>
    </div>
   </div>
</div>
    </div>
  )
}

export default Edit