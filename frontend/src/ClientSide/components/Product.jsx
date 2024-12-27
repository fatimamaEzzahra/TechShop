import React from 'react'
import './Product.css'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const Product = (props) => {
 const {product}=props
  return (
    <Link to={`/displayproduct/${product.id}`} className='product'>
      <img src={`http://127.0.0.1:8000/storage/product/image/${product.image_pr}`} alt="" />
      <h1 className='h5'>{product.nom_pr}</h1>
        <h4 > {product.prix_pr} Dhs</h4>
    </Link >
  )
}

export default Product