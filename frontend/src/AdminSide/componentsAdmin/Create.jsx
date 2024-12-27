import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { axiosClient } from '../../../axios';
import { Check, CheckBox } from '@mui/icons-material';
import { BsArrowReturnLeft } from 'react-icons/bs';
import './Edit.css'
const Create = () => {
 const navigate= useNavigate();
 const [nom_pr,setNom_pr]=useState('')
 const [marque_pr,setMarque_pr]=useState('')
 const [category_pr,setCategory_pr]=useState('')
 const [image_pr,setImage_pr]=useState('')
 const [image2,setImage2]=useState('')
 const [image3,setImage3]=useState('')
 const [image4,setImage4]=useState(null)
 const [image5,setImage5]=useState(null)
 const [description_pr,setDescription_pr]=useState('')
 const [stock_pr,setStock_pr]=useState('')
 const [bestSeller,setBestSeller]=useState(false)
 const [prix_pr,setPrix_pr]=useState('')
 const [errors,setErrors]=useState([])
 
 const changeHandlerIm1 = (e)=>{
  setImage_pr(e.target.files[0])
 }
 const changeHandlerIm2 = (e)=>{
  setImage2(e.target.files[0])
 }
 const changeHandlerIm3 = (e)=>{
  setImage3(e.target.files[0])
 }
const changeHandlerIm4 = (e) => {
  setImage4(e.target.files[0]);
};

const changeHandlerIm5 = (e) => {
  setImage5(e.target.files[0]);
};
 const createProduct= async(e)=>{
  e.preventDefault();
  const formeData = new FormData();
  formeData.append('nom_pr',nom_pr);
  formeData.append('marque_pr',marque_pr);
  formeData.append('category_pr',category_pr);
  formeData.append('image_pr',image_pr);
  formeData.append('image2',image2);
  formeData.append('image3',image3);
  formeData.append('image4',image4);
  formeData.append('image5',image5);
  formeData.append('description_pr',description_pr);
  formeData.append('stock_pr',stock_pr);
  formeData.append('bestSeller',bestSeller);
  formeData.append('prix_pr',prix_pr);
  await axiosClient.post('/api/produits', formeData).
   then(({data})=>{
    alert(data.message)
    navigate('/admin')
  }).catch(({response})=>{
     setErrors(response.data.message)
   })
  
 }
  return (
    <div className='container' >
<div className="row  justify-content-center "  >
    <Link to={"/admin/products"}>
      <button className='  back-btn' > <span>Retour</span>  <BsArrowReturnLeft/> </button></Link>
   <div className=" card col-6 col-sm-6 col-md-7">
      <h1 style={{ margin:'20px'}} className='h1 flex  justify-center'> <span style={{ marginTop:'80px',}} >Ajouter un produit</span> </h1>

     <div className="card-body">
      <h3 className="card-title"></h3>
      <hr />
      <div className="form-wrapper">
       <form onSubmit={createProduct}>
       <div class="mb-3 ">
           <label  class="form-label">Nom du produit <span style={{ color: 'red' }}>*</span></label>
           <input type="text" class="form-control" placeholder="Produit" value={nom_pr} onChange={(e)=>{setNom_pr(e.target.value)}}/>
           <div class="valid-feedback">
               Looks good!
           </div>
         </div>
         <div class="mb-3">
           <label  class="form-label">Prix <span style={{ color: 'red' }}>*</span></label>
           <input type="number" class="form-control" placeholder="Prix" value={prix_pr} onChange={(e)=>{setPrix_pr(e.target.value)}}/>
         </div>
         <div class="mb-3">
          <label class="form-label">Catégorie <span style={{ color: 'red' }}>*</span></label>
         <select class="form-select" aria-label="Default select example" onChange={(e)=>{setCategory_pr(e.target.value)}}>
            <option selected ></option>
            <option  value='telephone'>Téléphone Portable</option>
            <option value="pc">PC Portable</option>
            <option value="ordinateur">Ordinateur bureau</option>
            <option value="tablette">Tablette</option>
            <option value="ecouteurs">Ecouteurs</option>
            <option value="smartwatch">Smartwatch</option>
          </select>
         </div>
         <div class="mb-3">
          <label class="form-label">Marque <span style={{ color: 'red' }}>*</span></label>
         <select class="form-select" aria-label="Default select example" onChange={(e)=>{setMarque_pr(e.target.value) ; console.log(e.target.value)}}>
         <option selected ></option>
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
           <label  class="form-label">Description <span style={{ color: 'red' }}>*</span></label>
           <textarea class="form-control"  rows="4"  onChange={(e)=>{setDescription_pr(e.target.value)}}></textarea>
         </div>
         <h3 class="mb-3 mt-7" style={{display:'flex',justifyContent:'center'}}>Ajouter des Photos démonstratives</h3>
         <div class="mb-3 d-flex ">
           <input class="form-control" type="file" id="formFile" accept='image/*' onChange={(e)=>{changeHandlerIm1(e)}}/>
           <span style={{ color: 'red' ,marginLeft:'15px'}}>*</span>
         </div>
         <div class="mb-3 d-flex">
           <input class="form-control" type="file" id="formFile" accept='image/*' onChange={(e)=>{changeHandlerIm2(e)}} />
           <span style={{ color: 'red' ,marginLeft:'15px'}}>*</span>
         </div>
         <div class="mb-3 d-flex ">
           <input class="form-control " type="file" id="formFile" accept='image/*' onChange={(e)=>{changeHandlerIm3(e)}}/>
           <span style={{ color: 'red' ,marginLeft:'15px'}}>*</span>
         </div>
         <div class="mb-3">
           <input class="form-control" type="file" id="formFile" accept='image/*' onChange={(e)=>{changeHandlerIm4(e)}}/>
         </div>
         <div class="mb-3">
           <input class="form-control" type="file" id="formFile" accept='image/*' onChange={(e)=>{changeHandlerIm5(e)}}/>
         </div>
         <div class="mb-3">
           <label  class="form-label">Stock <span style={{ color: 'red' }}>*</span></label>
           <input type="number" class="form-control" placeholder="Stock" value={stock_pr} onChange={(e)=>{setStock_pr(e.target.value)}}/>
         </div>
         <div class="mb-3">
           <label  class="form-label mr-6">Afficher parmi les Meilleurs Produits </label>
        
           <input type='checkbox'  className='mt-4' checked={bestSeller==="true" ? true : false} onChange={(e)=>{setBestSeller(e.target.checked.toString())}}/>
         </div>
         <div class="col-12">
            <button class="btn btn-primary" type="submit">Ajouter</button>
          </div>
       </form>
       {/* <ul>
  {errors && 
  errors.map((error, index) => (
    <li key={index} style={{ color: 'red' }}>{error}</li>
  ))
  }
</ul> */}
      {errors && (
        <h4 style={{color:'red'}}>{errors}</h4>
)}
      </div>
     </div>
    </div>
   </div>
</div>
  )
}

export default Create