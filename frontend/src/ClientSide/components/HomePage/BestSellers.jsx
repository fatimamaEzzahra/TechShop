import React, { useEffect, useState } from 'react';
import { axiosClient } from '../../../../axios';
import Product from '../Product';
import './BestSeller.css'
const BestSellers = () => {
  const [bestProducts, setBestProducts] = useState([]);
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosClient.get('/api/bestSellers');
        setBestProducts(response.data.products);
        setLoading(false)
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='container bestSeller-container'>
      <h2 className='h1 best-seller-title'>Best Sellers</h2>
      <div className=" best-sellers  mt-6 mb-6">
        {
          bestProducts.length > 0 ? bestProducts.map((p) => (
            <div key={p.id}>
              <Product product={p} />
            </div>
          )) :
          <h2></h2> 
        }
      </div>
    </div>
  );
}

export default BestSellers;
