import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components

import { Swiper, SwiperSlide } from 'swiper/react';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './DisplayProduct.css'
import {Carousel} from './Carousel'
// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard, Parallax } from 'swiper/modules';

import { Link, useParams } from 'react-router-dom'
import { axiosClient } from '../../../axios'
import { FaShoppingCart } from 'react-icons/fa'
import Product from './Product';
import { useDispatch } from 'react-redux';
import { Increment } from "../Reducers/action";

const DisplayProduct = () => {
  const { ID } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [button, setButton] = useState('Add To Cart');
  const [stockValable, setStockValable] = useState(true);
  const [colorButton, setColorButton] = useState('#4699ff');
  const [cursor,setCursor]=useState('')
  const [relatedProducts,setRelatedProducts] = useState([])
  
  const dispatch = useDispatch()
  const fetchProduct = async (productId) => {
    try {
      
      const response = await axiosClient.post('/api/oneProduct', { id: productId });
      setProduct(response.data.product);
      const products = await axiosClient.get('/api/produits')
      
      const filterRelated=products.data.filter((p)=>(p.marque_pr===response.data.product.marque_pr || p.category_pr === response.data.product.category_pr ))
      const related =filterRelated.filter((p)=>(p.id !== parseInt(ID))) 

      setRelatedProducts(related)
      setLoading(false);

      if(response.data.product.stock_pr ===0){
        setStockValable(false)
        setCursor('notAllowed')
        setColorButton('#8c8c8c')
      }
      verifAdded();
    }
     catch (error) {
      console.log(error);
    }
  };
  const verifAdded = async ()=>{
    try{
      const inCart = await axiosClient.post('/api/verifAdded', { product_id: ID});
      if(inCart.data.status ===409  ){
        setButton(inCart.data.message);
        setColorButton('#8c8c8c')
      }
      else if(inCart.data.status ===201){
        setButton(inCart.data.message);
      }
    }
    catch(error){
      setButton('Add To Cart')
      console.log(error)
    }
  }
  const AddToCart = async () => {
    if(stockValable){
    
    try {
      const response = await axiosClient.post('/api/AddToCart', { product_id: product.id, product_qty: 1 });
      console.log('addtocart', response.data.message);
      if (response.data.status === 201) {
        swal('Added!', response.data.message, 'success');
        dispatch(Increment())
        setButton('Already In Cart');


      } else if (response.data.status === 409) {
        swal( response.data.message);
        setButton('Already In Cart');
      }
      
    } catch (error) {
      if(error.request.status===401){
        
      Swal.fire({
        title: "<strong>You are Not Logged In</strong>",
        icon: "error",
        html: `
          <a href="/login"> <u>Click here to log in</u></a>,
        `,
        
      });
      }
      else{
        
        console.log(error)
      }
      
    }
  }};
  
  useEffect(() => {
    fetchProduct(ID);
    
  },[ID]);
 

  if(loading){
    return (
      <div className="loading-container">
      <div className="spinner-border text-secondary loading" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
    )
   }

  return (
    <div className='product-display'>
            <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
    <li class="breadcrumb-item"><Link to="/allproducts">Products</Link></li>
    <li class="breadcrumb-item active" aria-current="page">{product.nom_pr}</li>
  </ol>
</nav>
      <div className="container-product">

        <div className="image-swiper">
        
          <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard, Parallax]}
            className="mySwiper"
          >
            <SwiperSlide ><img src={`http://localhost:8000/storage/product/image/${product.image_pr}`} alt="" className='image-swipe' /></SwiperSlide>
            <SwiperSlide><img src={`http://localhost:8000/storage/product/image/${product.image2}`} alt="" className='image-swipe'/></SwiperSlide>
            <SwiperSlide><img src={`http://localhost:8000/storage/product/image/${product.image3}`} alt="" className='image-swipe'/></SwiperSlide>
            {product.image4 && (<SwiperSlide><img src={`http://localhost:8000/storage/product/image/${product.image4}`} alt="" className='image-swipe' /></SwiperSlide>)}
            {product.image5 && (<SwiperSlide><img src={`http://localhost:8000/storage/product/image/${product.image5}`} alt="" className='image-swipe' /></SwiperSlide>)}
          </Swiper>
          {/* <div id="carouselExampleFade" className="carousel slide carousel-fade">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={`http://localhost:8000/storage/product/image/${product.image_pr}`} className="image-carousel" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={`http://localhost:8000/storage/product/image/${product.image2}`} className="image-carousel" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={`http://localhost:8000/storage/product/image/${product.image3}`} className="image-carousel" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div> */}

  {/* <div id="carouselExampleFade" className="carousel slide carousel-fade">
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img src={`http://localhost:8000/storage/product/image/${product.image_pr}`}  alt="..." />
      </div>
      <div className="carousel-item">
        <img src={`http://localhost:8000/storage/product/image/${product.image2}`}  alt="..." />
      </div>
      <div className="carousel-item">
        <img src={`http://localhost:8000/storage/product/image/${product.image3}`}  alt="..." />
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
      <span className="carousel-control-prev-icon carousel-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
      <span className="carousel-control-next-icon carousel-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div> */}

        </div>
        <div className="info">
          <h1>{product.nom_pr}</h1>
          <div className="description">
            <p>{product.description_pr}</p>
          </div>
          <div className="price">
            <h4>{product.prix_pr} Dhs</h4>
          </div>
          <div className='addcart ' >
            <button onClick={AddToCart} style={{background:colorButton }} className={` ${cursor}`} ><FaShoppingCart className='icon'  /> {stockValable ? button : 'On Stock' } </button>
          </div>
        </div>
        
      </div>
      {
        relatedProducts.length>0 && 
        <div>
          <hr />
        <h1 className='h2 flex justify-center mb-7 mt-6'>Related Products</h1>
        
          <div className="related-products">
          {
            relatedProducts.map((p)=>
                // <div key={p.id} className='related-product-info' >
                //   <img src={`http://localhost:8000/storage/product/image/${p.image_pr}`} alt="" className='related-product-img' />
                //   <h4 className='h6'>{p.nom_pr}</h4>
                // </div>
                <Product product={p} key={p.id}/>
             )
          }
        </div>
        </div>
      }
      
      
        
          
    </div>
  );
}

export default DisplayProduct;
